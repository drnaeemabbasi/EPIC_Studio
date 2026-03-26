import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import infoIcon from "../../assets/infoIcon.svg";
import { parseRangeFromDescription, validateValue } from "../../utils/validation";

import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
const Parm1102Form = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState({}); // To store the initial data
  const [descriptions, setDescriptions] = useState({}); // Store descriptions
  const [expandedField, setExpandedField] = useState(null); // Track which description is expanded
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch data to populate form
  const fetchInitialValues = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/getParm1102Data`,
        {
          params: {
            formName: "PARM1102",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedData = res.data;
      const rows = fetchedData.data;
      setDescriptions(fetchedData.descriptions); // Store the descriptions

      console.log(fetchedData.descriptions);
      const newRows = {};
      for (let i = 0; i < 42; i++) {
        newRows[`newRow${i + 1}`] = rows[i] || {}; // Handle 0 to 39 (newRow1 to newRow42)
      }
      setInitialData(newRows); // Set the fetched data in state
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, []);

  const handleReadClick = async () => {
    setIsReading(true);
    await Promise.all([
      fetchInitialValues(),
      new Promise(resolve => setTimeout(resolve, 600))
    ]);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedField]);

  // Initialize Formik
  const formik = useFormik({
    initialValues: initialData, // Set initial values dynamically
    enableReinitialize: true, // Reinitialize form values when `initialValues` changes
    validate: (values) => {
      const errors = {};
      Object.keys(values).forEach((rowKey) => {
        const row = values[rowKey];
        if (!row) return;
        const rowErrors = {};
        Object.keys(row).forEach((fieldKey) => {
          const value = row[fieldKey];
          const desc = descriptions[fieldKey];
          const range = parseRangeFromDescription(desc);
          const result = validateValue(value, range);
          if (result !== true) {
            rowErrors[fieldKey] = result;
          }
        });
        if (Object.keys(rowErrors).length > 0) {
          errors[rowKey] = rowErrors;
        }
      });
      return errors;
    },
  });

  const handleUpdateClick = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/updatePARM1102`,
        formik.values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data updated successfully:", response.data);
      await new Promise(resolve => setTimeout(resolve, 600));

      fetchInitialValues(); // Read the data after submitting
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleDescription = (fieldKey) => {
    if (expandedField === fieldKey) {
      setExpandedField(null); // Collapse the description
    } else {
      console.log(fieldKey);
      setExpandedField(fieldKey); // Expand the clicked description
    }
  };

  // Render form fields dynamically for each row
  const renderFields = (rowKey, row) => {
    return Object.keys(row).map((fieldKey) => {
      // if (row[fieldKey] == null) return null; // Skip null or undefined fields

      return (
        <>
          <div className={`w-full md:w-1/6 px-2 field-container-${fieldKey}`} key={fieldKey}>
            <div key={fieldKey} className="relative w-full">
              {/* <div className="relative w-full flex items-center border border-blue-500 rounded-lg mb-6"> */}
              <label
                htmlFor={fieldKey}
                className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center"
              >
                {fieldKey}
                {descriptions[fieldKey] && (
                  <span
                    className="ml-2 text-indigo-400 hover:text-indigo-600 cursor-help transition-colors"
                    onMouseOver={(e) => {
                      e.target.title = expandedField
                        ? ""
                        : descriptions[fieldKey].substring(0, 40) + "...";
                    }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>
                )}
              </label>
              <input
                type="text"
                id={fieldKey}
                name={`${rowKey}.${fieldKey}`}
                className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm ${
                  formik.errors[rowKey]?.[fieldKey] && formik.touched[rowKey]?.[fieldKey]
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30 text-red-900"
                    : "border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800"
                }`}
                placeholder={`Enter ${fieldKey}`}
                value={formik.values[rowKey][fieldKey] || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => toggleDescription(fieldKey)}
              />

              {expandedField === fieldKey && (
                <div
                  id={`desc-${fieldKey}`}
                  className="absolute bg-slate-800 text-slate-100 shadow-xl border border-slate-700 transition-all duration-300 ease-in-out rounded-lg mt-2 z-50 overflow-hidden"
                  style={{
                    top: "100%",
                    left: "0",
                    transform: "translateY(10px)",
                    width: "240px",
                    minWidth: "150px",
                  }}
                >
                  <div className="relative p-5">
                    <header className="absolute top-2 right-2">
                      <button
                        type="button"
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                        onClick={() => toggleDescription(fieldKey)}
                      >
                        <FontAwesomeIcon icon={faWindowClose} />
                      </button>
                    </header>
                    <p className="text-sm leading-relaxed mt-1">
                      {descriptions[fieldKey]}
                    </p>
                  </div>
                </div>
              )}

              {/* Expanded description box */}
            </div>

            {formik.errors[rowKey]?.[fieldKey] &&
            formik.touched[rowKey]?.[fieldKey] ? (
              <p className="text-red-500 text-xs mt-1 font-medium bg-white px-1 rounded">
                {formik.errors[rowKey][fieldKey]}
              </p>
            ) : null}
          </div>
          <hr className="h-1 bg-gray-700 from-gray-700 via-white to-gray-700 my-6" />
        </>
      );
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full flex-1 w-full max-w-[100vw] overflow-y-auto">
          <div className="p-4 w-full flex justify-center">
            <div className="relative flex space-x-4 w-full justify-center">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-4 w-full max-w-6xl"
              >
                <div className="border-b border-slate-100 pb-5 mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    PARM1102 Form
                  </h2>
                </div>
                {/* Dynamically render sections for each newRow */}
                {[...Array(42)].map((_, index) => {
                  const rowKey = `newRow${index + 1}`;
                  return (
                    <div key={rowKey}>
                      <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                        Section {index + 1}
                      </h3>
                      <div className="flex flex-wrap -mx-2 mb-6 gap-y-4">
                        {renderFields(rowKey, formik.values[rowKey] || {})}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex space-x-3">
                    {/* Empty placeholder to push the Action cluster right */}
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
                      type="button"
                      onClick={handleUpdateClick}
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
              </form>
            </div>
          </div>
      </div>
    </>
  );
};

export default Parm1102Form;
