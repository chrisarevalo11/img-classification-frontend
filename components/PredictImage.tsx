"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { agbalumo } from "@/ui/fonts";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface FileWithPreview extends File {
  preview: string;
}

const PredictImage = () => {
  const [base64Image, setBase64Image] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>("");
  const [file, setFile] = useState<FileWithPreview>({} as FileWithPreview);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      const reader = new FileReader();
      if (file.preview) {
        setBase64Image(file.preview);
      }
      reader.readAsDataURL(acceptedFiles[0]);
      console.log(acceptedFiles);
    },
  });

  const validationSchema = Yup.object().shape({
    upload: Yup.mixed().required("Please upload an image"),
  });

  const thumb = (
    <div>
      <div>
        <Image
          alt="Your image"
          src={file.preview}
          className="block w-auto h-full"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          width={100}
          height={100}
        />
      </div>
    </div>
  );

  const formik = useFormik({
    initialValues: {
      upload: null,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      console.log(file);
      handlePredictClick();
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(file);

    if (!file.preview) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (
        event.target &&
        event.target.result &&
        typeof event.target.result === "string"
      ) {
        const dataURL = event.target.result;
        setBase64Image(dataURL.replace("data:image/jpeg;base64,", ""));
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(file.preview);
  }, []);

  const handlePredictClick = () => {
    setBase64Image(base64Image.replace("data:image/jpeg;base64,", ""));
    const message = { image: base64Image };

    const serverURL = "https://image-classifier-kdd0.onrender.com/predict";

    setIsLoading(true);
    fetch(serverURL, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPrediction(data?.prediction);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div id="model" className="w-screen max-w-[1200px] my-5">
      <h1
        className={`text-[4rem] ${agbalumo.className} uppercase text-center text-orange-500`}
      >
        Test ML model
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <p className="mt-8">{file.name && "📁 " + file.name}</p>
        <div
          style={{
            backgroundImage: `url(${file.preview})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          {...getRootProps({
            className:
              `dropzone w-[90%] md:w-[50%] ${
                !file.preview && "border-gray-500"
              } mx-auto h-[300px] rounded-3xl flex flex-col` +
              ` justify-center items-center mb-8 cursor-pointer border-4 border-gray-500 ${
                formik.errors.upload && "border-red-500"
              }  border-dashed`,
          })}
        >
          <input
            id="upload"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
            {...getInputProps()}
          />
          {formik.errors.upload && (
            <div className="text-red-500">{formik.errors.upload}</div>
          )}
          <p>{!file.name && "Drop some files here or click to select files"}</p>
        </div>

        <input
          type="submit"
          value={isLoading ? "Predicting..." : "Predict"}
          id="predict-button"
          className={`mx-auto bg-green-600 py-4 md:py-5 px-8 md:px-10 text-xl rounded-full text-white font-bold ${
            isLoading
              ? "pointer-events-none cursor-not-allowed"
              : "cursor-pointer"
          }`}
        />
        <div>{prediction}</div>
      </form>
    </div>
  );
};

export default PredictImage;
