import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Upload = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
// ---------------------------for upload file in local state--------------
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    // console.log(file);
  };
  // console.log(file);

  // ---------------handle submit for sending data /file to be uploaded-----------------
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);

    fetch("https://nine1mobile-satyam.onrender.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("File uploaded successfully");
        setTimeout(() => {
          setLoader(false);
          navigate("/user/dashboard");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  return (
    <div className="upload_room">
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={handleFileInputChange}
          accept=".pdf, .excel, .csv"
          type="file"
        />
        <Button colorScheme={"blue"} type="submit">
          Upload
        </Button>
      </form>

      {loader ? (
        <img
          src="https://i.pinimg.com/originals/f6/06/cb/f606cbf26c0a18898b96ef6857953a75.gif"
          alt=""
        />
      ) : null}
    </div>
  );
};

export default Upload;
