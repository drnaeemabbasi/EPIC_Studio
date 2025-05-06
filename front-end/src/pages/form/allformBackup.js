import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import { useNavigate, useParams } from "react-router-dom";
const EpicAllForms = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("");

  const [formData, setFormData] = useState([]);
  const [descriptions, setDescriptions] = useState({}); // Store descriptions
  const [expandedField, setExpandedField] = useState(null); // Track which description is expanded
  // const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [searchField, setSearchField] = useState(""); // For select box
  const [searchTerm, setSearchTerm] = useState(""); // For input box
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [disabledField, setDisabledField] = useState("");

  const { formName } = useParams("EPICRUN");
  let { startingPoint, endingPoint } = useParams();

  // Function to fetch form data
  const fetchFormData = async () => {
    setMode("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/`,
        {
          params: {
            startingPoint,
            formName,
            endingPoint,
          },
        }
      );
      setFormData(response.data.data); // Store the form data received
      setDescriptions(response.data.descriptions); // Store the descriptions
      // setFilteredData(response.data.data); // Initialize the filtered data
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch form data"); // Show toast notification
      navigate("/epicAllForms/EPICRUN/0/1");
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchFormData();
  // }, [formName, startingPoint, endingPoint]);
  useEffect(() => {
    fetchFormData();
  }, [formName, startingPoint, endingPoint, fetchFormData]);

  const handleInputChange = (event, rowIndex, fieldName) => {
    const newFormData = [...formData];
    newFormData[rowIndex][fieldName] = event.target.value;
    setFormData(newFormData);
  };

  const toggleDescription = (fieldName) => {
    console.log("fieldName", expandedField);

    if (expandedField === fieldName) {
      setExpandedField(null); // Collapse the description
    } else {
      setExpandedField(fieldName); // Expand the clicked description
    }
  };

  const handleSearch = async () => {
    if (searchField && searchTerm) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/bySearch`,
          {
            params: {
              searchField,
              searchTerm,
              formName,
            },
          }
        );
        setFormData([response.data.data]); // Set form data with the one row received
        setLoading(false);
      } catch (err) {
        // setError("Failed to fetch form data");
        toast.error("Failed to fetch form data"); // Show toast notification
        setLoading(false);
      }
    } else {
      // setFilteredData(formData); // Reset if no search term or field is selected
    }
  };

  const addRecord = async () => {
    setMode("addRecord");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/fetchLastId`,
        {
          params: {
            formName,
          },
        }
      );

      // setFormData(response.data.newRow);
      setFormData([response.data.newRow]); // Set form data with the one row received
      setDisabledField(response.data.disabledField);
      // console.log(
      //   response.data.newID,
      //   response.data.newRow,
      //   formData.length,
      //   formData[0]
      // );
      setLoading(false);
    } catch (err) {
      // setError("Failed to fetch form data");
      toast.error("Failed to fetch form data"); // Show toast notification
      setLoading(false);
    }
  };

  const fetchSuggestions = async (searchField, searchTerm) => {
    if (searchField && searchTerm) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/suggestions`,
          {
            params: {
              searchField,
              searchTerm,
              formName,
            },
          }
        );
        setSuggestions(response.data.suggestions); // Store the suggestions
        setShowSuggestions(true); // Show the suggestions dropdown
      } catch (err) {
        // setError("Failed to fetch suggestions");
        toast.error("Failed to fetch suggestions"); // Show toast notification
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
      setShowSuggestions(false);
    }
  };

  const handleNextClick = () => {
    if (formData.length > 0) {
      startingPoint = parseInt(startingPoint) + 1;
      endingPoint = parseInt(endingPoint) + 1;

      navigate(`/epicAllForms/${formName}/${startingPoint}/${endingPoint}`);
    }
  };

  const handlePreviousClick = () => {
    if (startingPoint > 0) {
      if (
        formName === "CROPCOM" ||
        formName === "FERT2012" ||
        formName === "PESTCOM" ||
        formName === "TILLCOM"
      ) {
        if (startingPoint > 2) {
          startingPoint = parseInt(startingPoint) - 1;
          endingPoint = parseInt(endingPoint) - 1;
          navigate(`/epicAllForms/${formName}/${startingPoint}/${endingPoint}`);
        }
      } else {
        startingPoint = parseInt(startingPoint) - 1;
        endingPoint = parseInt(endingPoint) - 1;
        navigate(`/epicAllForms/${formName}/${startingPoint}/${endingPoint}`);
      }
    }
  };

  const updateFormData = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/updateEpicFile`,
        {
          fileName: formName, // Specify the file name for updating
          startingPoint,
          endingPoint,

          ...formData.reduce((acc, row, index) => {
            acc[`row${index + 1}`] = row; // Prepare the row data
            return acc;
          }, {}),
        }
      );
      alert("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data"); // Show toast notification
    }
  };

  const addNewRow = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/addData`,
        {
          formName, // Specify the file name for updating
          formData,
        }
      );
      if (response.data.error) {
        toast.error(response.data.error); // Show toast notification
      }

      // alert("Data add successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data"); // Show toast notification
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="ml-64 flex flex-col justify-center items-center w-full ">
          <Header />
          {formName === "EPICRUN" ? (
            <></>
          ) : (
            <>
              {/* Search functionality */}
              <div className="relative flex bg-black space-x-4 mt-8">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="">Select Field</option>
                  {formData.length > 0 &&
                    Object.keys(formData[0]).map((field, index) => (
                      <option key={index} value={field}>
                        {field}
                      </option>
                    ))}
                </select>

                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      fetchSuggestions(searchField, e.target.value); // Fetch suggestions on input change
                    }}
                    placeholder="Enter search term"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute border bg-white w-full max-h-48 overflow-y-auto mt-1 rounded-lg shadow-lg z-10">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setShowSuggestions(false); // Hide suggestions after selecting one
                          }}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
                >
                  Search
                </button>

                <button
                  type="button"
                  onClick={addRecord}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 cursor-pointer"
                >
                  Add Record
                </button>
              </div>
            </>
          )}

          <div className=" p-5 w-full ">
            <form
              onSubmit={updateFormData}
              className="bg-white p-8 rounded-lg shadow-sm mt-8 w-full "
            >
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                {formName} Form
              </h2>

              {/* Render form only if data exists */}
              {formData.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(formData[0]).map(
                      ([fieldName, value], fieldIndex) => (
                        <div key={fieldIndex} className="relative w-full">
                          <label
                            htmlFor={`${fieldName}`}
                            className="block text-gray-700 font-semibold mb-2 flex items-center"
                          >
                            {fieldName}
                            {/* Info Icon with click to toggle full description */}
                            {descriptions[fieldName] && (
                              <span
                                className="ml-2 text-blue-500 cursor-pointer"
                                // onClick={() => toggleDescription(fieldName)}
                                onMouseOver={(e) => {
                                  e.target.title = expandedField
                                    ? ""
                                    : descriptions[fieldName].substring(0, 30) +
                                      "..."; // Show preview on hover if not expanded
                                }}
                              >
                                <FontAwesomeIcon icon={faInfoCircle} />
                              </span>
                            )}
                          </label>
                          <input
                            id={`${fieldName}`}
                            type="text"
                            value={value || ""}
                            onFocus={() => toggleDescription(fieldName)}
                            onChange={(event) =>
                              handleInputChange(event, 0, fieldName)
                            }
                            className={
                              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            }
                            disabled={
                              fieldName === disabledField &&
                              mode === "addRecord"
                            }
                            placeholder={`Enter ${fieldName}`}
                          />

                          {/* Expanded description box */}
                          <div
                            className={`absolute  transition-all duration-400 ease-in-out overflow-auto bg-gray-100 rounded-md shadow-lg  w-full ${
                              expandedField === fieldName
                                ? "max-h-96 opacity-100 z-50"
                                : "max-h-0 opacity-0"
                            } mt-2 p-4`} // Use absolute, shadow, and z-index
                            style={{ top: "100%", left: "0" }} // Position right below the input
                          >
                            <p className="">{descriptions[fieldName]}</p>
                            <span
                              className="absolute top-0 right-0 text-sm text-red-500 cursor-pointer p-1"
                              onClick={() => toggleDescription(fieldName)}
                            >
                              <FontAwesomeIcon icon={faWindowClose} />{" "}
                              {/* Window Close icon */}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {mode === "addRecord" && (
                <>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={fetchFormData}
                      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={addNewRow}
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </>
              )}
              {mode !== "addRecord" && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handlePreviousClick}
                    className="bg-gray-300 cursor-pointer text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="bg-gray-300 cursor-pointer text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  >
                    Next
                  </button>

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

export default EpicAllForms;
