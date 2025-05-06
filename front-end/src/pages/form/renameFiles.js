import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { useNavigate } from "react-router-dom";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import RunExepop from "../../service/run.exe";

const RenameFiles = () => {
  const navigate = useNavigate();
  const [oldFileName, setOldFileName] = useState(""); // Store current OPC name
  const [newName, setNewName] = useState(""); // Store the new name for update
  const [loading, setLoading] = useState(true);

  // Fetch the current OPC name when the component loads
  const fetchFileName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/basicRoutes/fetchFileNames`
      );
      setOldFileName(response.data.oldFileNames); // Set the current OPC name
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch OPC name");
      setLoading(false);
    }
  };

  // Use effect to fetch file names when component loads
  useEffect(() => {
    fetchFileName();
  }, []);

  // Handle name change
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // Handle the update action
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newName) {
      toast.error("New name is required");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/basicRoutes/reNameFile`,
        {
          oldFileName,
          newName,
        }
      );
      if (response.data.success) {
        fetchFileName(); // Call the function to re-fetch the updated file name
        toast.success("OPC Name updated successfully");
      } else {
        toast.error("Failed to update OPC name");
      }
    } catch (err) {
      toast.error("Error updating OPC name");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className=" flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          <div className="w-full px-6 flex justify-end mt-4">
            <RunExepop />
          </div>
          <div className="p-5 w-full">
            <form
              onSubmit={handleUpdate}
              className="bg-white p-8 rounded-lg shadow-sm  w-full"
            >
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Rename OPC
              </h2>

              {/* <div className="mb-4"> */}
              <div className="relative w-full flex items-center border border-blue-500 rounded-lg mb-6">
                <label
                  htmlFor="oldFileName"
                  className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"

                  // className="block text-gray-700 font-semibold mb-2"
                >
                  Current File Name
                </label>
                <input
                  type="text"
                  id="oldFileName"
                  value={oldFileName}
                  readOnly
                  className="w-full p-2 pl-4 text-sm text-black focus:outline-none focus:ring focus:ring-blue-500 rounded-lg"

                  // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>

              <div className="relative w-full flex items-center border border-blue-500 rounded-lg mb-6">
                <label
                  htmlFor="newName"
                  className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"

                  // className="block text-gray-700 font-semibold mb-2"
                >
                  New File Name
                </label>
                <input
                  type="text"
                  id="newName"
                  value={newName}
                  onChange={handleNameChange}
                  placeholder="Enter new OPC name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"
                  // className="w-full bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                  // className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                  // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"

                  // className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <Bottom />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default RenameFiles;
