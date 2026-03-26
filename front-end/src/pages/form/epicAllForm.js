import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
import { useNavigate, useParams } from "react-router-dom";
import { parseRangeFromDescription, validateValue } from "../../utils/validation";

const EpicAllForms = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("");

  const [formData, setFormData] = useState([]);
  const [descriptions, setDescriptions] = useState({}); // Store descriptions
  const [expandedField, setExpandedField] = useState(null); // Track which description is expanded
  const [errors, setErrors] = useState({}); // Track validation errors
  // const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [searchField, setSearchField] = useState(""); // For select box
  const [searchTerm, setSearchTerm] = useState(""); // For input box
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [disabledField, setDisabledField] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formName, startingPoint, endingPoint]);

  const handleReadClick = async () => {
    setIsReading(true);
    // Execute the fetch while forcing a minimum 600ms load time for a smooth button animation
    await Promise.all([
      fetchFormData(),
      new Promise(resolve => setTimeout(resolve, 600))
    ]);
    setIsReading(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (expandedField && !e.target.closest(`.field-container-${CSS.escape(expandedField)}`)) {
        setExpandedField(null);
      }
    };

    if (expandedField) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedField]);

  const handleInputChange = (event, rowIndex, fieldName) => {
    const newFormData = [...formData];
    const value = event.target.value;
    newFormData[rowIndex][fieldName] = value;
    setFormData(newFormData);

    const desc = descriptions[fieldName];
    const range = parseRangeFromDescription(desc);
    const validResult = validateValue(value, range);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: validResult === true ? null : validResult
    }));
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

    // Validation is now treated explicitly as UI-level warnings based on user requests,
    // so we deliberately omit the early-return block that used to block updates.

    setIsUpdating(true);
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
      // Wait a moment for a nice smooth animation
      await new Promise(resolve => setTimeout(resolve, 600));
      // Success toast removed to match the Read button animation cleanly
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data"); // Show toast notification
    } finally {
      setIsUpdating(false);
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
    return (
      <div className="w-full flex-1 max-w-[100vw] min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
           <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
           <p className="mt-4 text-slate-500 font-medium">Loading form data...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      <div className="w-full flex-1 max-w-[100vw] overflow-y-auto w-full min-h-screen pb-12">
          {formName === "EPICRUN" ? (
            <></>
          ) : (
            <>
              {/* Search functionality */}
              <div className="relative flex items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mt-8 space-x-4 w-full max-w-6xl mx-auto">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="px-4 py-2.5 border border-slate-300 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
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
                    placeholder="Search records..."
                    className="w-64 px-4 py-2.5 border border-slate-300 text-sm text-slate-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
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

                <div className="flex-1"></div>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-white border border-slate-300 text-slate-700 font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-sm text-sm"
                >
                  Search
                </button>

                <button
                  type="button"
                  onClick={addRecord}
                  className="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-sm text-sm"
                >
                  Add Record
                </button>
              </div>
            </>
          )}

          <div className=" p-5 w-full ">
            <form
              onSubmit={updateFormData}
              className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-8 w-full max-w-6xl mx-auto"
            >
              <div className="border-b border-slate-100 pb-5 mb-8 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {formName} Form
                </h2>
              </div>

              {/* Render form only if data exists */}
              {formData.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                    {Object.entries(formData[0]).map(
                      ([fieldName, value], fieldIndex) => (
                        <div key={fieldIndex} className={`relative w-full field-container-${fieldName}`}>
                          <label
                            htmlFor={`${fieldName}`}
                            className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center"
                          >
                            {fieldName}
                            {/* Info Icon with click to toggle full description */}
                            {descriptions[fieldName] && (
                              <span
                                className="ml-2 text-indigo-400 hover:text-indigo-600 cursor-help transition-colors"
                                onMouseOver={(e) => {
                                  e.target.title = expandedField
                                    ? ""
                                    : descriptions[fieldName].substring(0, 40) + "...";
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
                            className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm ${errors[fieldName] ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30 text-red-900' : 'border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800'}`}
                            disabled={
                              fieldName === disabledField &&
                              mode === "addRecord"
                            }
                            placeholder={`Enter ${fieldName}`}
                          />
                          {errors[fieldName] && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                              {errors[fieldName]}
                            </p>
                          )}

                          <div
                            className={`absolute transition-all duration-300 ease-in-out overflow-hidden bg-slate-800 text-slate-100 rounded-lg shadow-xl border border-slate-700 w-full ${
                              expandedField === fieldName
                                ? "max-h-96 opacity-100 z-50 p-4 mt-2"
                                : "max-h-0 opacity-0 p-0 m-0 border-transparent"
                            }`}
                            style={{ top: "100%", left: "0" }}
                          >
                            <p className="text-sm leading-relaxed">{descriptions[fieldName]}</p>
                            <span
                              className="absolute top-2 right-2 text-slate-400 hover:text-white cursor-pointer p-1 transition-colors"
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
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={fetchFormData}
                    className="bg-white border border-slate-300 text-slate-700 font-medium py-2.5 px-6 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-sm text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={addNewRow}
                    className="bg-indigo-600 text-white font-medium py-2.5 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-sm text-sm"
                  >
                    Add
                  </button>
                </div>
              )}
              {mode !== "addRecord" && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex space-x-3">
                    {formName !== "EPICRUN" && (
                      <>
                        <button
                          type="button"
                          onClick={handlePreviousClick}
                          className="bg-white border border-slate-300 text-slate-600 font-medium py-2 px-5 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-sm text-sm"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={handleNextClick}
                          className="bg-white border border-slate-300 text-slate-600 font-medium py-2 px-5 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-sm text-sm"
                        >
                          Next
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleReadClick}
                      disabled={isReading || isUpdating}
                      className="flex items-center justify-center bg-slate-100 text-slate-700 font-medium py-2.5 px-6 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200/50 transition-all text-sm min-w-[100px] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isReading ? (
                        <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Read"
                      )}
                    </button>

                    <button
                      type="submit"
                      disabled={isReading || isUpdating}
                      className="flex items-center justify-center bg-indigo-600 text-white font-medium py-2.5 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-sm text-sm min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? (
                        <div className="w-5 h-5 border-2 border-indigo-200 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
    </>
  );
};

export default EpicAllForms;
