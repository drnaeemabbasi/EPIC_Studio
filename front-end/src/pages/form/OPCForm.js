import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import infoIcon from "../../assets/infoIcon.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import RunExepop from "../../service/run.exe";
const OPCForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]); // Initialize with an empty array
  const [descriptions, setDescriptions] = useState({});
  const [expandedField, setExpandedField] = useState(null);
  const [mode, setMode] = useState("");

  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Template for a new row
  const templateRow = {
    LUN: "",

    IAUI: "",
    "JX(1)": "",
    "JX(2)": "",
    "JX(3)": "",
    "JX(4)": "",
    "JX(5)": "",
    "JX(6)": "",
    "JX(7)": "",
    OPV1: "",
    OPV2: "",
    OPV3: "",
    OPV4: "",
    OPV5: "",
    OPV6: "",
    OPV7: "",
    OPV8: "",
    OPV9: "",
  };

  // Fetch form data
  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/fetchOPCFormData`,
        {
          params: { formName: "OPCForm" },
        }
      );
      setFormData(response.data.data);
      setDescriptions(response.data.descriptions);
    } catch (err) {
      toast.error("Failed to fetch form data");
      navigate("/epicAllForms/EPICRUN/0/1");
    } finally {
      setIsLoading(false);
    }
  };

  // Update form data
  const updateFormData = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateOPCFormData`,
        {
          formData,
        }
      );
      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    }
  };

  // Handle input changes
  const handleInputChange = (event, rowIndex, fieldName) => {
    const updatedData = [...formData];
    updatedData[rowIndex][fieldName] = event.target.value;
    setFormData(updatedData);
  };

  // Toggle description display
  const toggleDescription = (fieldName, rowIndex) => {
    setExpandedField(
      expandedField === fieldName + rowIndex ? null : fieldName + rowIndex
    );
  };

  // Add a new row
  const addRow = () => {
    setMode("addRow");
    console.log(formData);
    setFormData([...formData, { ...templateRow }]);
  };

  const cancelAddRow = () => {
    fetchFormData();
    setMode("");
  };

  const addNewRow = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateOPCFileWithNewRows`,
        {
          formData,
        }
      );
      toast.success("Data updated successfully");
      setMode("");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    console.log(expandedField);
  }, [expandedField]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          <div className="w-full px-6 flex justify-end mt-4">
            <RunExepop />
          </div>
          <div className="p-4">
            <form
              onSubmit={updateFormData}
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl "
            >
              <h2 className="text-xl font-bold text-gray-700 mb-4">OPC Form</h2>
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                formData.map((element, rowIndex) => (
                  <div key={rowIndex} className="mb-2">
                    <h2 className="text-xl font-bold text-gray-700 mb-4 ">
                      Line {rowIndex + 1}
                    </h2>
                    <div className="grid grid-cols-8 gap-4">
                      {element &&
                        Object.entries(element).map(
                          ([fieldName, value], index) => (
                            <div key={index} className="relative w-full">
                              {/* <div className="relative w-full flex items-center border border-blue-500 rounded-lg mb-6"> */}
                              <label
                                htmlFor={`field-${rowIndex}-${index}`}
                                // className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"
                                className="block  font-bold mb-2 flex items-center"

                                // className="block text-gray-700 font-semibold mb-2 flex items-center"
                              >
                                {fieldName}
                                {descriptions[fieldName] && (
                                  <span
                                    className="ml-2 text-blue-500 cursor-pointer"
                                    onClick={() =>
                                      toggleDescription(fieldName, rowIndex)
                                    }
                                  >
                                    {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                                    <img src={infoIcon} alt="info Icon" />
                                  </span>
                                )}
                              </label>
                              <input
                                id={`field-${rowIndex}-${index}`}
                                type="text"
                                value={value || ""}
                                onChange={(event) =>
                                  handleInputChange(event, rowIndex, fieldName)
                                }
                                // className="w-full p-2 pl-4 text-sm text-black focus:outline-none focus:ring focus:ring-blue-500 rounded-lg"
                                className="w-full  px-3 py-2 border-[1px] border-gray-300 rounded-[6px] focus:outline-none focus:ring focus:border-tc-blue"

                                // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                              />
                              {expandedField === fieldName + rowIndex && (
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
                ))
              )}

              {mode === "addRow" ? (
                <div className="flex justify-between items-center mt-5">
                  <button
                    type="button"
                    onClick={addRow}
                    // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Add Row
                  </button>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={cancelAddRow}
                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addNewRow}
                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center mt-5">
                  <button
                    type="button"
                    onClick={addRow}
                    // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Add Row
                  </button>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        toast.success("Data Read successfully");
                        fetchFormData(); // Ensure fetchFormData is a function
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth", // Smooth scrolling
                        });
                      }}
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                    >
                      Read
                    </button>

                    <button
                      type="submit"
                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <Bottom />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default OPCForm;
