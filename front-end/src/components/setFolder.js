import React, { useEffect, useState } from "react";
import axios from "axios";

function FolderPicker() {
  const [folderPath, setFolderPath] = useState("");

  const handleFolderSelect = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const path = files[0].webkitRelativePath.split("/")[0];
      setFolderPath(path);
    }
  };

  const sendFolderPath = async (folderPath) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/pickFolder`,
        {
          folderPath,
        }
      );
      if(response){

        alert("Folder path sent successfully!");
      }
    } catch (error) {
      console.error("Error sending folder path:", error);
    }
  };

  useEffect(() => {
    // sendFolderPath();
    if(folderPath){

      localStorage.setItem("FOLDER_PATH", folderPath);
      console.log('folderPath',folderPath)
      sendFolderPath(folderPath)
    }

  }, [folderPath]);

  return (
    <div>
      {/* <input
        type="file"
        className="px-4 py-2 w-full border border-tc-blue h-full rounded-e-[8px] focus:outline-none  focus:border-blue-500"
        webkitdirectory="true"
        directory=""
        onChange={handleFolderSelect}
      /> */}

      {/* <input
        type="file"
        webkitdirectory="true"
        directory=""
        onChange={handleFolderSelect}
        id="folderInput"
        className="hidden" // Hides the default file input
      />
      <label
        htmlFor="folderInput"
        className="border-[2.5px] font-semibold border-tc-dark-blue px-4 py-2 cursor-pointer text-black rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"

        // className="font-semibold cursor-pointer text-white rounded-md px-4 py-2 bg-blue-600 hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:ring focus:ring-tc-blue"
      >
        Choose Folder
      </label> */}
    </div>
  );
}

export default FolderPicker;
