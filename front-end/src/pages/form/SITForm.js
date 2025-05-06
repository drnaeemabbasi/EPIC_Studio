import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import infoIcon from "../../assets/infoIcon.svg";

import RunExepop from "../../service/run.exe";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SITForm = () => {
  const [formData, setFormData] = useState([]); // Data rows
  const [descriptions, setDescriptions] = useState({}); // Field descriptions
  const [expandedField, setExpandedField] = useState(null); // For tooltip expansion
  const [isLoading, setIsLoading] = useState(true);

  // Fetch form data
  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/fetchSITFormData`
      );
      setFormData(response.data.data || []);
      setDescriptions(response.data.descriptions || {});
      // toast.success("Data fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch form data");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (event, rowIndex, fieldName) => {
    const updatedData = [...formData];
    updatedData[rowIndex][fieldName] = event.target.value;
    setFormData(updatedData);
  };

  // Toggle description display
  const toggleDescription = (fieldName) => {
    setExpandedField(expandedField === fieldName ? null : fieldName);
  };

  // Submit updated data
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateSITFormData`,
        { formData }
      );
      toast.success("Data updated successfully");
    } catch (error) {
      toast.error("Failed to update data");
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className=" flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          <div className="w-full px-6 flex justify-end mt-4">
            <RunExepop />
          </div>

          <div className="p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl ">
              <h2 className="text-xl font-bold text-gray-700 mb-4">SIT Form</h2>

              {isLoading ? (
                // <p>Loading...</p>
                <div className="flex ">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formData.map((row, rowIndex) => (
                    <div key={rowIndex} className="mb-4">
                      <h2 className="text-lg font-semibold text-gray-600 mb-4">
                        Row {rowIndex + 1}
                      </h2>
                      <div className="grid grid-cols-8 gap-2">
                        {Object.entries(row).map(
                          ([fieldName, value], colIndex) => (
                            <div key={colIndex} className="relative">
                              {/* <div className="relative w-full flex items-center border border-blue-500 rounded-lg mb-6"> */}
                              <label
                                htmlFor={`field-${rowIndex}-${colIndex}`}
                                // className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"
                                className="block  font-bold mb-2 flex items-center"

                                // className="block text-gray-700 font-medium mb-2 flex items-center"
                              >
                                {fieldName}
                                {descriptions[fieldName] && (
                                  <span
                                    className="ml-2 text-blue-500 cursor-pointer"
                                    onClick={() => toggleDescription(fieldName)}
                                  >
                                    {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                                    <img src={infoIcon} alt="info Icon" />
                                  </span>
                                )}
                              </label>
                              <input
                                id={`field-${rowIndex}-${colIndex}`}
                                type="text"
                                value={value || ""}
                                onChange={(event) =>
                                  handleInputChange(event, rowIndex, fieldName)
                                }
                                // className="w-full p-2 pl-4 text-sm text-black focus:outline-none focus:ring focus:ring-blue-500 rounded-lg"
                                className="w-full  px-3 py-2 border-[1px] border-gray-300 rounded-[6px] focus:outline-none focus:ring focus:border-blue-500"

                                // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                              />
                              {expandedField === fieldName && (
                                <div
                                  id={`desc-${fieldName}`}
                                  className="absolute bg-white shadow-lg transition-all duration-300 ease-in-out rounded-lg mt-2 z-20 overflow-auto resize"
                                  style={{
                                    top: "100%", // Position it directly below the input field
                                    left: "0",
                                    transform: "translateY(10px)", // Slight offset to avoid clipping
                                    width: "240px", // Initial width
                                    height: "150px", // Initial height
                                    minWidth: "150px", // Minimum width
                                    minHeight: "100px", // Minimum height
                                  }}
                                >
                                  <div className="relative p-4">
                                    <header className="absolute top-0 right-0">
                                      <button
                                        type="button"
                                        className="p-1 text-red-500 hover:text-red-700"
                                        onClick={() =>
                                          toggleDescription(fieldName)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faWindowClose} />
                                      </button>
                                    </header>
                                    <p className="text-sm text-gray-700 top-10">
                                      {descriptions[fieldName]}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end mt-6 space-x-4">
                    <button
                      type="button"
                      onClick={fetchFormData}
                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-red-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"

                      // className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    >
                      Read
                    </button>
                    <button
                      type="submit"
                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <Bottom />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SITForm;
