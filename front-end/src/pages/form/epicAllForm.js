import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoButton from "../../components/InfoButton";
import ValidatedInput from "../../components/ValidatedInput";
import { useNavigate, useParams } from "react-router-dom";

const EpicAllForms = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("");

  const [formData, setFormData] = useState([]);
  const [descriptions, setDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalLines, setTotalLines] = useState(0);
  const [dataOffset, setDataOffset] = useState(0);
  const [updateError, setUpdateError] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [disabledField, setDisabledField] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { formName } = useParams("EPICRUN");
  let { startingPoint, endingPoint } = useParams();

  const fetchFormData = async () => {
    setMode("");
    setUpdateError(null);
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
      setFormData(response.data.data);
      setDescriptions(response.data.descriptions);
      setTotalLines(response.data.totalLines || 0);
      setDataOffset(response.data.offset || 0);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setUpdateError("Failed to fetch form data. Please ensure the backend is running.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formName, startingPoint, endingPoint]);

  const handleReadClick = async () => {
    setIsReading(true);
    await Promise.all([
      fetchFormData(),
      new Promise(resolve => setTimeout(resolve, 600))
    ]);
    setIsReading(false);
  };

  const handleInputChange = (event, rowIndex, fieldName) => {
    const newFormData = [...formData];
    const value = event.target.value;
    newFormData[rowIndex][fieldName] = value;
    setFormData(newFormData);
  };

  const handleSearch = async () => {
    if (searchField && searchTerm) {
      setLoading(true);
      setUpdateError(null);
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
        setFormData([response.data.data]);
        setLoading(false);
      } catch (err) {
        console.error("Search error:", err);
        setUpdateError("No records found matching your search.");
        setLoading(false);
      }
    }
  };

  const addRecord = async () => {
    setMode("addRecord");
    setUpdateError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/fetchLastId`,
        {
          params: { formName },
        }
      );
      setFormData([response.data.newRow]);
      setDisabledField(response.data.disabledField);
      setLoading(false);
    } catch (err) {
      setUpdateError("Failed to prepare new record.");
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
        setSuggestions(response.data.suggestions);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Suggestion error:", err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handlePageClick = (lineIndex) => {
    // Navigate to a specific line (1 row per page)
    navigate(`/epicAllForms/${formName}/${lineIndex}/${lineIndex + 1}`);
  };

  const handleNextClick = () => {
    if (formData.length > 0 && parseInt(endingPoint) < totalLines) {
      const nextStart = parseInt(startingPoint) + 1;
      const nextEnd = parseInt(endingPoint) + 1;
      navigate(`/epicAllForms/${formName}/${nextStart}/${nextEnd}`);
    }
  };

  const handlePreviousClick = () => {
    const currentStart = parseInt(startingPoint);
    if (currentStart > dataOffset) {
      const prevStart = currentStart - 1;
      const prevEnd = parseInt(endingPoint) - 1;
      navigate(`/epicAllForms/${formName}/${prevStart}/${prevEnd}`);
    }
  };

  const updateFormData = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/updateEpicFile`,
        {
          fileName: formName,
          startingPoint,
          endingPoint,
          ...formData.reduce((acc, row, index) => {
            acc[`row${index + 1}`] = row;
            return acc;
          }, {}),
        }
      );
      await new Promise(resolve => setTimeout(resolve, 600));
    } catch (error) {
      console.error("Error updating data:", error);
      setUpdateError("Failed to update file. Technical detail: " + (error.response?.data?.error || error.message));
    } finally {
      setIsUpdating(false);
    }
  };

  const addNewRow = async (event) => {
    event.preventDefault();
    setUpdateError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/epicAllFilesRouters/addData`,
        {
          formName,
          formData,
        }
      );
      if (response.data.error) {
        setUpdateError(response.data.error);
      } else {
        await fetchFormData();
      }
    } catch (error) {
      console.error("Error adding row:", error);
      setUpdateError("Failed to add new record.");
    }
  };

  const getPaginationItems = () => {
    const totalPages = totalLines - dataOffset;
    if (totalPages <= 1) return [];

    const current = parseInt(startingPoint) - dataOffset; // 0-indexed relative to data
    const pages = [];
    const delta = 2;

    // Always show first data page
    pages.push(dataOffset);

    let start = Math.max(dataOffset + 1, parseInt(startingPoint) - delta);
    let end = Math.min(totalLines - 2, parseInt(startingPoint) + delta);

    if (start > dataOffset + 1) pages.push("...");

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalLines - 2) pages.push("...");

    // Always show last data page
    if (totalLines > dataOffset + 1) {
      pages.push(totalLines - 1);
    }

    return pages;
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

  const currentAbsoluteLine = parseInt(startingPoint) + 1;
  const totalNavigablePages = totalLines - dataOffset;
  const currentNavigablePage = (parseInt(startingPoint) - dataOffset) + 1;

  return (
    <div className="w-full flex-1 max-w-[100vw] overflow-y-auto min-h-screen pb-12 bg-slate-50">
      <div className="p-4 w-full">
        {formName !== "EPICRUN" && (
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
                  fetchSuggestions(searchField, e.target.value);
                }}
                placeholder="Search records..."
                className="w-64 px-4 py-2.5 border border-slate-300 text-sm text-slate-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute border bg-white w-full max-h-48 overflow-y-auto mt-1 rounded-lg shadow-lg z-20">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm text-slate-700"
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
        )}

        <div className="p-4 w-full">
          <form
            onSubmit={updateFormData}
            className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-8 w-full max-w-6xl mx-auto"
          >
            <div className="border-b border-slate-100 pb-5 mb-8 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 -mx-10 -mt-10 p-10 rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {formName} Form
                </h2>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="bg-indigo-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Absolute Line: {currentAbsoluteLine}
                  </span>
                  <span className="bg-slate-200 text-slate-700 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Data Page: {currentNavigablePage} of {totalNavigablePages}
                  </span>
                  <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">
                    Total Lines: {totalLines}
                  </span>
                </div>
              </div>
            </div>

            {formData.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                  {Object.entries(formData[0]).map(([fieldName, value], fieldIndex) => (
                    <div key={fieldIndex} className={`relative w-full field-container-${fieldName}`}>
                      <label
                        htmlFor={`${fieldName}`}
                        className="block text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center"
                      >
                        {fieldName}
                        <InfoButton fieldKey={fieldName} />
                      </label>
                      <ValidatedInput
                        fieldKey={fieldName}
                        name={fieldName}
                        id={`${fieldName}`}
                        value={value || ""}
                        onChange={(event) => handleInputChange(event, 0, fieldName)}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800"
                        disabled={fieldName === disabledField && mode === "addRecord"}
                        placeholder={`Enter ${fieldName}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-slate-100">
              {updateError && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-pulse">
                  ⚠️ {updateError}
                </div>
              )}

              {/* Pagination Bar */}
              {formName !== "EPICRUN" && mode !== "addRecord" && totalNavigablePages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-1 mb-8">
                  <button
                    type="button"
                    onClick={handlePreviousClick}
                    disabled={parseInt(startingPoint) <= dataOffset}
                    className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Previous Page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {getPaginationItems().map((page, idx) => (
                    page === "..." ? (
                      <span key={`dots-${idx}`} className="px-3 text-slate-300 font-bold select-none">...</span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageClick(page)}
                        className={`w-10 h-10 rounded-lg text-xs font-bold transition-all border ${
                          parseInt(startingPoint) === page
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                            : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                        }`}
                      >
                        {(page - dataOffset) + 1}
                      </button>
                    )
                  ))}

                  <button
                    type="button"
                    onClick={handleNextClick}
                    disabled={parseInt(startingPoint) >= totalLines - 1}
                    className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Next Page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex space-x-3 w-full md:w-auto"></div>

                <div className="flex space-x-4 w-full md:w-auto">
                {mode === "addRecord" ? (
                  <>
                    <button
                        type="button"
                        onClick={fetchFormData}
                        className="flex-1 md:flex-none bg-slate-100 text-slate-700 font-semibold py-2.5 px-8 rounded-xl hover:bg-slate-200 transition-all text-sm shadow-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={addNewRow}
                        className="flex-1 md:flex-none bg-indigo-600 text-white font-semibold py-2.5 px-8 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-sm"
                      >
                        Add Record
                      </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleReadClick}
                      disabled={isReading || isUpdating}
                      className="flex-1 md:flex-none flex items-center justify-center bg-slate-100 text-slate-700 font-semibold py-2.5 px-8 rounded-xl hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200/50 transition-all text-sm min-w-[100px] disabled:opacity-70 shadow-sm"
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
                      className="flex-1 md:flex-none flex items-center justify-center bg-indigo-600 text-white font-semibold py-2.5 px-10 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-lg shadow-indigo-200 text-sm min-w-[140px] disabled:opacity-70"
                    >
                      {isUpdating ? (
                        <div className="w-5 h-5 border-2 border-indigo-200 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </>
                )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EpicAllForms;
