import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../Components/Table/Table";

const UserDashboard = () => {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loader, setLoader] = useState(false);


// --------------------------------getting pdf path------------------------
  const getPdf = async (filename) => {
    try {
      const response = await fetch(`https://nine1mobile-satyam.onrender.com/pdf/${filename}`);
      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------------------------

  useEffect(() => {
    getFiles();
  }, []);

 
// -----------getting files from backend--------------------------------
const getFiles = () => {
  axios
  .get("https://nine1mobile-satyam.onrender.com/dashboard")
  .then((res) => {
    // console.log(res)
    setFiles(res.data);
  })
  .catch((err) => console.log(err));
};

// -------------------------------------------------------------------------



//   -----delete files-----------------

const Delete = async (filename, index) => {
   setLoader(true)
  
    try {
     await axios.delete(`https://nine1mobile-satyam.onrender.com/delete/${filename}`)
    .then((res)=>{
      
        setLoader(false)
        alert(res.data.msg)
        window.location.reload()
    })
      
    
    } catch (err) {
        console.log(err)
        alert("Something went wrong");
    }

}


// ------------------------------------------------

  return (
    <div className="dashboard">
      <div className="dashboard_left">

      <Table Delete={Delete} getPdf={getPdf} data={files}/>
       {loader?<img src="https://media.tenor.com/8ZhQShCQe9UAAAAC/loader.gif" alt="loader"></img>:""

       }
      </div>
      <div className="file_box">
      {pdfUrl && (
          <iframe className="iframe" src={pdfUrl} title="PDF preview" />
          )}
          </div>
    </div>
  );
};

export default UserDashboard;
