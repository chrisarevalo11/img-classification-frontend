"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { agbalumo } from "@/ui/fonts";
import { useDropzone } from "react-dropzone";
import Modal, { showModal } from "./Modal";

interface FileWithPreview extends File {
  preview: string;
}

const PredictImage = () => {
  const [base64Image, setBase64Image] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>("");
  const [file, setFile] = useState<FileWithPreview>({} as FileWithPreview);

  const serverTestURL = process.env.NEXT_PUBLIC_ENDPOINT_URL + "/";
  const serverURL = process.env.NEXT_PUBLIC_ENDPOINT_URL + "/predict";

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();

      reader.onload = () => {
        setBase64Image(reader.result as string);
        setFile(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          })
        );
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const formik = useFormik({
    initialValues: {
      upload: null,
    },
    onSubmit: () => {
      handlePredictClick();
    },
  });

  useEffect(() => {
    fetch(serverTestURL)
      .then((data) => data.json())
      .then((data) => console.log(data));
  }, []);

  const handlePredictClick = () => {
    const message = {
      image: base64Image.replace("data:image/jpeg;base64,", ""),
    };
    console.log(message);

    setIsLoading(true);
    fetch(serverURL, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction);
        showModal();
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setPrediction("Error");
        showModal();
      });
  };

  useEffect(() => {
    console.log(prediction);
  }, [prediction]);

  return (
    <div id="model" className="w-screen max-w-[1200px] mt-5 mb-16">
      <h1
        className={`text-[2rem] md:text-[4rem] ${agbalumo.className} uppercase text-center text-orange-500`}
      >
        Test ML model
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        {file.name && (
          <p className="mt-4">
            📁 {file.name}
            <button
              className="ml-2"
              onClick={() => {
                setFile({} as FileWithPreview);
                setBase64Image("");
              }}
            >
              ✖️
            </button>
          </p>
        )}
        <div
          style={
            file.name
              ? {
                  backgroundImage: `url(${file.preview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
          {...getRootProps({
            className:
              `dropzone w-[90%] md:w-[50%] mx-auto h-[300px] rounded-3xl flex flex-col` +
              ` justify-center items-center mb-8 cursor-pointer border-4 border-gray-500 border-dashed`,
          })}
        >
          <input id="upload" name="upload" {...getInputProps()} />
          {/* {formik.errors.upload && (
            <div className="text-red-500">{formik.errors.upload}</div>
          )} */}
          <p>{!file.name && "Drop some files here or click to select files"}</p>
        </div>

        <button
          type="submit"
          id="predict-button"
          className={`mx-auto bg-green-600 py-4 md:py-5 px-8 md:px-10 text-xl rounded-full text-white font-bold ${
            isLoading
              ? "pointer-events-none cursor-not-allowed"
              : "cursor-pointer"
          } ${!file.name && "opacity-80 pointer-events-none"}`}
          disabled={file.name ? false : true}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Predict"
          )}
        </button>
      </form>
      <Modal prediction={prediction} />
    </div>
  );
};

export default PredictImage;
