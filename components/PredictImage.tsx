"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const PredictImage = () => {
  const [base64Image, setBase64Image] = useState<string>("");
  const [prediction, setPrediction] = useState<string>("");

  const validationSchema = Yup.object().shape({
    upload: Yup.mixed().required("Please upload an image"),
  });

  const formik = useFormik({
    initialValues: {
      upload: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handlePredictClick();
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const handlePredictClick = () => {
    setBase64Image(base64Image.replace("data:image/jpeg;base64,", ""));
    const message = { image: base64Image };
    console.log(base64Image);

    // Replace the URL with your Flask server URL
    const serverURL = "https://image-classifier-kdd0.onrender.com/predict";

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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="upload">Upload Image:</label>
        <input
          type="file"
          id="upload"
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.upload && formik.errors.upload && (
          <div>{formik.errors.upload}</div>
        )}
      </div>
      <img id="selected-image" src="" alt="Selected" />
      <button type="button" id="predict-button" onClick={handlePredictClick}>
        Predict
      </button>
      <div>{prediction}</div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PredictImage;
