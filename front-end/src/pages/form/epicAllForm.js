import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import infoIcon from "../../assets/infoIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import RunExepop from "../../service/run.exe";
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
  }, [formName, startingPoint, endingPoint]);

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
      console.log(response.data.newRow);
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
  useEffect(() => {
    console.log(mode);
  }, [mode]);

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
      console.log(formData.length);
      startingPoint = parseInt(startingPoint) + 1;
      endingPoint = parseInt(endingPoint) + 1;

      navigate(`/epicAllForms/${formName}/${startingPoint}/${endingPoint}`);
    } else {
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
      toast.success("Data updated successfully");
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
      toast.success("Row added successfully");
      setMode("");

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

        <div className="flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          {/* <RunExepop /> */}

          {/* {formName === "EPICRUN" ? (
            <></>
          ) : (
            <> */}
          {/* Search functionality */}
          <div className="w-full px-6 flex justify-start mt-8 ">
            {formName === "EPICRUN" ? (
              <></>
            ) : (
              <>
                <div className="flex justify-start w-full  space-x-4">
                  <div className="flex w-full">
                    <select
                      value={searchField}
                      onChange={(e) => setSearchField(e.target.value)}
                      className="px-4 py-2 border border-tc-blue rounded-s-[8px] focus:outline-none  focus:border-blue-500"
                    >
                      <option value="">Select Field</option>
                      {formData.length > 0 &&
                        Object.keys(formData[0]).map((field, index) => (
                          <option key={index} value={field}>
                            {field}
                          </option>
                        ))}
                    </select>

                    <div className="w-full">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          fetchSuggestions(searchField, e.target.value); // Fetch suggestions on input change
                        }}
                        placeholder="Enter search term"
                        className="px-4 py-2 w-full border border-tc-blue h-full rounded-e-[8px] focus:outline-none  focus:border-blue-500"

                        // className="px-6 py-2 w-full border border-gray-300 rounded-e-[8px] focus:outline-none focus:ring focus:border-tc-blue"
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
                  </div>
                  <button
                    type="button"
                    onClick={handleSearch}
                    // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
                    className="font-semibold cursor-pointer text-white rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
                  >
                    <img
                      src={searchIcon}
                      alt="Search "
                      // className="h-5 w-5" // Adjust the size of the image

                      // className={`h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      //   expandedCategory === "controlForms"
                      //     ? "opacity-100"
                      //     : ""
                      // }`}
                    />
                  </button>
                </div>
              </>
            )}
            <div className="flex justify-end w-full space-x-4">
              {formName === "EPICRUN" ? (
                <></>
              ) : (
                <button
                  type="button"
                  onClick={addRecord}
                  // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
                  // className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"
                  className="font-semibold  bg-tc-dark-blue  py-2 px-5 cursor-pointer text-white rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                  // className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 cursor-pointer"
                >
                  Add Record
                </button>
              )}

              <RunExepop />
            </div>
          </div>
          {/* </>
          )} */}

          <div className=" p-5 w-full ">
            <form
              onSubmit={updateFormData}
              className="bg-white p-8 rounded-lg shadow-sm  w-full "
            >
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                {formName} Form
              </h2>

              {/* Render form only if data exists */}
              {formData.length > 0 ? (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(formData[0]).map(
                      ([fieldName, value], fieldIndex) => (
                        <div key={fieldIndex} className="relative w-full">
                          <label
                            htmlFor={`${fieldName}`}
                            className="block  font-bold mb-2 flex items-center"
                            // className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"
                          >
                            {fieldName}
                            {/* Info Icon with click to toggle full description */}
                            {descriptions[fieldName] && (
                              <span
                                className="ml-2 text-tc-dark-blue cursor-pointer"
                                // onClick={() => toggleDescription(fieldName)}
                                onMouseOver={(e) => {
                                  e.target.title = expandedField
                                    ? ""
                                    : descriptions[fieldName].substring(0, 30) +
                                      "..."; // Show preview on hover if not expanded
                                }}
                              >
                                <img
                                  src={infoIcon}
                                  alt="info Icon"
                                  // className={`h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                  //   expandedCategory === "controlForms"
                                  //     ? "opacity-100"
                                  //     : ""
                                  // }`}
                                />
                                {/* <><img/> */}
                                {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
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
                            className="w-full  px-3 py-2 border-[1px] border-gray-300 rounded-[6px] focus:outline-none focus:ring focus:border-blue-500"
                            // className="w-full p-2 pl-4 text-sm text-black focus:outline-none focus:ring focus:ring-blue-500 rounded-lg"
                            disabled={
                              fieldName === disabledField &&
                              mode === "addRecord"
                            }
                            placeholder={`Enter ${fieldName}`}
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
                                    onClick={() => toggleDescription(fieldName)}
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
              ) : (
                <>
                  <h1>Not Found</h1>
                </>
              )}
            </form>

            <div className="mt-5">
              {mode === "addRecord" && (
                <>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={fetchFormData}
                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={addNewRow}
                      // className="bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
                      className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                      // className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </>
              )}
              {mode !== "addRecord" && (
                <div className="flex justify-center  items-center space-x-4 text-center">
                  {formName === "EPICRUN" ? (
                    <></>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handlePreviousClick}
                        // className="bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
                        className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                        // className="bg-gray-300 cursor-pointer text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        onClick={handleNextClick}
                        // className="bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
                        className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                        // className="bg-gray-300 cursor-pointer text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                      >
                        Next
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    // onClick={fetchFormData}
                    onClick={() => {
                      toast.success("Data Read successfully");
                      fetchFormData(); // Ensure fetchFormData is a function
                    }}
                    // className="bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-red-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                  >
                    Read
                  </button>

                  <button
                    type="submit"
                    className="bg-tc-dark-blue font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

                    // className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
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

export default EpicAllForms;
