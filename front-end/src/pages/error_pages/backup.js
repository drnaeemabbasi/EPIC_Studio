import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const SOLForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]); // Initialize with an empty array
  const [formMainData, setFormMainData] = useState([]); // Initialize with an empty array

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
      console.log(response.data.data.mainData);

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
      console.log(formData);
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateSOLFormData`,
        {
          formData,
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

  // Toggle description display
  const toggleDescription = (fieldName) => {
    setExpandedField(expandedField === fieldName ? null : fieldName);
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          <form
            onSubmit={updateFormData}
            className="bg-white p-8 rounded-lg shadow-lg mt-8 w-full max-w-6xl"
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
                      rowIndex === 0 ? "grid-cols-2" : "grid-cols-10"
                    } gap-4 mb-4`}
                  >
                    {element &&
                      Object.entries(element).map(
                        ([fieldName, value], index) => (
                          <div key={index} className="relative w-full">
                            <label
                              htmlFor={`field-${rowIndex}-${index}`}
                              className="block text-gray-700 font-semibold mb-2 flex items-center"
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
                              id={`field-${rowIndex}-${index}`}
                              type="text"
                              value={value || ""}
                              onChange={(event) =>
                                handleInputChange(event, rowIndex, fieldName)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            />
                            {expandedField === fieldName && (
                              <div
                                id={`desc-${fieldName}`}
                                className="absolute bg-gray-100 transition-all duration-400 rounded-md shadow-lg p-4 mt-2 z-10 w-full"
                              >
                                <p>{descriptions[fieldName]}</p>
                                <button
                                  type="button"
                                  className="absolute top-0 right-0 text-red-500 cursor-pointer"
                                  onClick={() => toggleDescription(fieldName)}
                                >
                                  <FontAwesomeIcon icon={faWindowClose} />
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      )}
                  </div>
                </>
              ))
            )}
            {Object.entries(formMainData).map(
              ([columnName, columnData], columnIndex) => (
                <div key={columnIndex}>
                  <h2 className="text-xl font-bold text-gray-700 mb-4 mt-5">
                    {`Column ${columnIndex + 1} (${columnName})`}
                  </h2>

                  <div className="grid grid-cols-12 gap-4 mb-4">
                    {columnData &&
                      Object.entries(columnData).map(
                        ([fieldName, value], fieldIndex) => (
                          <div key={fieldIndex} className="relative w-full">
                            <label
                              htmlFor={`field-${columnIndex}-${fieldIndex}`}
                              className="block text-gray-700 font-semibold mb-2 flex items-center"
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
                              id={`field-${columnIndex}-${fieldIndex}`}
                              type="text"
                              value={value || ""}
                              onChange={(event) =>
                                handleInputChange(event, columnIndex, fieldName)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            />
                            {expandedField === fieldName && (
                              <div
                                id={`desc-${fieldName}`}
                                className="absolute bg-gray-100 transition-all duration-400 rounded-md shadow-lg p-4 mt-2 z-10 w-full"
                              >
                                <p>{descriptions[fieldName]}</p>
                                <button
                                  type="button"
                                  className="absolute top-0 right-0 text-red-500 cursor-pointer"
                                  onClick={() => toggleDescription(fieldName)}
                                >
                                  <FontAwesomeIcon icon={faWindowClose} />
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      )}
                  </div>
                </div>
              )
            )}

            <div className="flex justify-end space-x-4 mt-5">
              <button
                type="button"
                onClick={fetchFormData}
                className="bg-red-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
              >
                Read
              </button>
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
          <Bottom />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SOLForm;
