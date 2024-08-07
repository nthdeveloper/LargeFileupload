import { useState } from 'react'
import './App.css'
import FileUploader from './FileUploader';

function App() {

  const uploadUrl = "https://localhost:7289/api/files/savepart";

  function uploadFile() {
    const fileInput = document.getElementById("myFile");

    const fileUploader = new FileUploader(uploadUrl, (fileInput as HTMLInputElement)?.files?.item(0)!, "735C38B5-E81C-44AB-BB66-A1B4322C5EF1");

    fileUploader.onProgress = (uploader, progress)=> {
        console.log("File upload progress: "+progress);
    }   

    fileUploader.onCompleted = (uploader)=> {
        console.log("Upload completed.");
    }                     

    fileUploader.onFailed = (uploader, error)=> {
        console.log("Upload failed. Error: "+ error);
    }

    fileUploader.upload();    
  }

  return (
    <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{backgroundColor: "rgb(214, 204, 204)", display: "inline-block"}}>       
            <input type='file' id='myFile'/>
            <button onClick={uploadFile}>Upload File</button>
        </div>
    </div>
  )
}

export default App
