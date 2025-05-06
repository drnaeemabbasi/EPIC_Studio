import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import axios from "axios";
import RunExepop from "../../service/run.exe";
import { headers as headersConfig } from "../../service/main.model.js";
import infoIcon from "../../assets/infoIcon.svg";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const SOLForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]); // Initialize with an empty array
  const [formMainData, setFormMainData] = useState([]); // Initialize with an empty array
  const [formbackupMainData, setFormBackupMainData] = useState({});
  const [mode, setMode] = useState("");

  let formConfig = headersConfig["SOLForm"];
  const { headers } = formConfig;

  const templateRow = Object.fromEntries(headers[4].map((key) => [key, "1"]));

  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);

  // const [formData, setFormData] = useState([]); // Initialize with an empty array

  const [descriptions, setDescriptions] = useState({
    LUN: "Logical Unit Number.",
    IAUI: "Initial adjustment for unit input.",
    "JX(1)": "First JX parameter description.",
    "JX(2)": "Second JX parameter description.",
  });
  const [expandedField, setExpandedField] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch form data
  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/fetchSOLFormData`,
        {
          params: { formName: "SOLForm" },
        }
      );

      setFormData(response.data.data.rows); // Ensure there's always a valid structure
      setFormMainData(response.data.data.mainData); // Ensure there's always a valid structure
      setFormBackupMainData(response.data.data.mainData); // Ensure there's always a valid structure

      setDescriptions(response.data.descriptions); // Store the descriptions
    } catch (err) {
      toast.error("Failed to fetch form data"); // Show toast notification
      navigate("/epicAllForms/EPICRUN/0/1");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  // Update form data
  const updateFormData = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      console.log(formData, formMainData);
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateSOLFormData`,
        {
          formData,
          formMainData,
        }
      );
      toast.success("Data updated successfully"); // Show toast notification
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data"); // Show toast notification
    }
  };

  // Handle input changes
  const handleInputChange = (event, rowIndex, fieldName) => {
    const updatedData = [...formData];
    updatedData[rowIndex][fieldName] = event.target.value; // Update the specific row and field
    setFormData(updatedData); // Update state with new formData
  };

  const handleMainDataChange = (event, columnName, fieldName) => {
    setFormMainData((prevState) => {
      const updatedMainData = { ...prevState };

      // Ensure column exists
      if (!updatedMainData[columnName]) {
        updatedMainData[columnName] = {};
      }

      // Update the specific field
      updatedMainData[columnName][fieldName] = event.target.value;

      return updatedMainData;
    });
  };

  const handlePreviousClick = () => {
    if (currentColumnIndex > 0) {
      setCurrentColumnIndex(currentColumnIndex - 1);
    }
    // setFormMainData(formbackupMainData); // Update formMainData to empty values
  };
  const handleNextClick = () => {
    console.log(currentColumnIndex);

    if (currentColumnIndex + 1 < Object.keys(formMainData).length) {
      setCurrentColumnIndex(currentColumnIndex + 1);
    }
    // else {
    //   setMode("addRow");

    //   // const columnName = "column" + (currentColumnIndex + 1);
    //   formMainData.newColumn = { ...templateRow };
    //   setCurrentColumnIndex(currentColumnIndex + 1);
    //   console.log(formMainData);

    //   // setFormMainData([...formMainData, { colums1z: { ...templateRow } }]);
    // }
  };

  // Toggle description display
  const toggleDescription = (fieldName) => {
    setExpandedField(expandedField === fieldName ? null : fieldName);
  };

  const addRow = () => {
    setMode("addRow");
    // setFormMainData([...formData, { ...templateRow }]);
  };

  const cancelAddRow = () => {
    fetchFormData();
    setMode("");
  };

  const addNewRow = async (event) => {
    event.preventDefault();
    try {
      console.log(formMainData);

      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateSOLFormData`,
        {
          formData,
          formMainData,
        }
      );

      // await axios.put(
      //   `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateOPCFileWithNewRows`,
      //   {
      //     formData,
      //   }
      // );
      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
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
            <form
              onSubmit={updateFormData}
              className="bg-white p-8 rounded-lg shadow-lg  w-full max-w-6xl"
            >
              <h2 className="text-xl font-bold text-gray-700 mb-4">SOL Form</h2>
              {isLoading ? (
                // <p>Loading...</p>
                <div className="flex ">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                formData.map((element, rowIndex) => (
                  <>
                    <h2 className="text-xl font-bold text-gray-700 mb-4 mt-5">
                      Line {rowIndex + 1}
                    </h2>

                    <div
                      ey={rowIndex}
                      className={`grid ${
                        rowIndex === 0 ? "grid-cols-2" : "grid-cols-5"
                      } gap-4 mb-4`}
                    >
                      {element &&
                        Object.entries(element).map(
                          ([fieldName, value], index) => (
                            <div key={index} className="relative w-full">
                              {/* <div className="relative w-full flex items-center border border-blue-500 rounded-lg"> */}
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
                                    onClick={() => toggleDescription(fieldName)}
                                  >
                                    <img src={infoIcon} alt="info Icon" />

                                    {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
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
                                // className="px-3 py-2 w-full border border-tc-blue h-full rounded-e-[8px] focus:outline-none  focus:border-blue-500"

                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                  </>
                ))
              )}
              {Object.entries(formMainData || {}).map(
                ([columnName, columnData], columnIndex) => (
                  <div
                    key={columnIndex}
                    className={`mb-6 border-b pb-4 ${
                      columnIndex === currentColumnIndex ? "block" : "hidden"
                    }`} // Only show current column
                  >
                    <h2 className="text-xl font-bold text-gray-700 mb-4 mt-5">
                      {`Column ${columnIndex + 1} (${columnName})`}
                    </h2>
                    <div className="grid grid-cols-8 gap-4 mb-4">
                      {Object.entries(columnData || {}).map(
                        ([fieldName, value], fieldIndex) => (
                          // <div key={fieldIndex} className="relative w-full">
                          <div className="relative w-full flex items-center border border-blue-500 rounded-lg mt-4">
                            <label
                              htmlFor={`field-${fieldName}-${fieldIndex}`}
                              className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"

                              // className="block text-gray-700 font-semibold mb-2 flex items-center"
                            >
                              {fieldName}
                              {descriptions[fieldName] && (
                                <span
                                  className="ml-2 text-blue-500 cursor-pointer"
                                  onClick={() => toggleDescription(fieldName)}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </span>
                              )}
                            </label>
                            <input
                              id={`field-${fieldName}-${fieldIndex}`}
                              type="text"
                              value={value || ""}
                              onChange={(event) =>
                                handleMainDataChange(
                                  event,
                                  columnName,
                                  fieldName
                                )
                              }
                              className="w-full p-2 pl-4 text-sm text-black focus:outline-none focus:ring focus:ring-blue-500 rounded-lg"

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
                )
              )}
              {mode === "addRow" ? (
                <div className="flex justify-between items-center mt-5">
                  <button
                    type="button"
                    onClick={addRow}
                    className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"

                    // className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Add Row
                  </button>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={cancelAddRow}
                      className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"

                      // className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addNewRow}
                      className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"

                      // className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                // <div className="flex justify-between items-center mt-5">
                <div className="flex justify-end mt-6 space-x-4">
                  {/* <button
                    type="button"
                    onClick={addRow}
                    className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"

                    // className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Add Row
                  </button> */}

                  {/* <div className="flex space-x-4"> */}
                  <button
                    type="button"
                    onClick={handlePreviousClick}
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                  >
                    Next
                  </button>

                  <button
                    type="button"
                    onClick={fetchFormData}
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                  >
                    Read
                  </button>
                  <button
                    type="submit"
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                  >
                    Update
                  </button>
                  {/* </div> */}
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

export default SOLForm;
