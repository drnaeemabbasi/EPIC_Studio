import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { epicContSchemas } from "../../schemas/epicCont.schemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
import axios from "axios";
import { toast } from "react-toastify";
import infoIcon from "../../assets/infoIcon.svg";
import { parseRangeFromDescription, validateValue } from "../../utils/validation";

const EpicCont = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [descriptions, setDescriptions] = useState({}); // Store descriptions
  const [expandedField, setExpandedField] = useState(null); // Track which description is expanded
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // Fetch data to populate form
  const fetchInitialValues = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/epicCount`,
        {
          params: {
            formName: "EPICCONT",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedData = res.data;
      console.log(fetchedData.row7 || {});
      // Set fetched data into formik values
      formik.setValues({
        row1: fetchedData.row1 || {},
        row2: fetchedData.row2 || {},
        row3: fetchedData.row3 || {},
        row4: fetchedData.row4 || {},
        row5: fetchedData.row5 || {},
        row6: fetchedData.row6 || {},
        row7: fetchedData.row7 || {},
      });
      setDescriptions(fetchedData.descriptions); // Store the descriptions

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

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      row1: {},
      row2: {},
      row3: {},
      row4: {},
      row5: {},
      row6: {},
      row7: {},
    },
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
    // validationSchema: epicContSchemas,
    enableReinitialize: true,
  });

  const handleUpdateClick = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/updateData/epicCont`,
        formik.values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data updated successfully:", response.data);
      await new Promise(resolve => setTimeout(resolve, 600));

      // Removed toast.success to rely strictly on button spinner
      fetchInitialValues(); // Refresh form with updated values if necessary
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

  // Render form fields dynamically
  const renderFields = (rowKey, row) => {
    return Object.keys(row).map((fieldKey) => (
      <div className={`w-full md:w-1/4 px-2 field-container-${fieldKey}`} key={fieldKey}>
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
              // <span
              //   className="ml-2 text-tc-dark-blue cursor-pointer"
              //   // onClick={() => toggleDescription(fieldName)}
              //   onMouseOver={(e) => {
              //     e.target.title = expandedField
              //       ? ""
              //       : descriptions[fieldKey].substring(0, 30) + "..."; // Show preview on hover if not expanded
              //   }}
              // >
              //   <img src={infoIcon} alt="info Icon" />
              // </span>
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
        </div>

        {formik.errors[rowKey]?.[fieldKey] &&
        formik.touched[rowKey]?.[fieldKey] ? (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {formik.errors[rowKey][fieldKey]}
          </p>
        ) : null}
      </div>
    ));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full flex-1 max-w-[100vw] overflow-y-auto">
          <div className="p-4 w-full flex justify-center">
            <div className="relative flex space-x-4 w-full justify-center">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-4 w-full max-w-6xl"
              >
                <div className="border-b border-slate-100 pb-5 mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    EPICCONT Form
                  </h2>
                </div>
                {/* Line One */}
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                  Line One
                </h3>
                <div className="flex flex-wrap -mx-2 mb-6 gap-y-6">
                  {renderFields("row1", formik.values.row1)}
                </div>

                {/* Line Two */}
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                  Line Two
                </h3>
                <div className="flex flex-wrap -mx-2 mb-6 gap-y-6">
                  {renderFields("row2", formik.values.row2)}
                </div>

                {/* Line Three */}
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                  Line Three
                </h3>
                <div className="flex flex-wrap -mx-2 mb-6 gap-y-6">
                  {renderFields("row3", formik.values.row3)}
                </div>

                {/* Line Four */}
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                  Line Four
                </h3>
                <div className="flex flex-wrap -mx-2 mb-6 gap-y-6">
                  {renderFields("row4", formik.values.row4)}
                </div>

                {/* Line Five */}
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                  Line Five
                </h3>
                <div className="flex flex-wrap -mx-2 mb-6 gap-y-6">
                  {renderFields("row5", formik.values.row5)}
                </div>

                {/* Line Six */}
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                  Line Six
                </h3>
                <div className="flex flex-wrap -mx-2 mb-6 gap-y-6">
                  {renderFields("row6", formik.values.row6)}
                </div>

                {/* Line Seven */}
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-6 border-b border-slate-100 pb-2">
                  Line Seven
                </h3>
                <div className="flex flex-wrap -mx-2 mb-6 gap-y-6">
                  {renderFields("row7", formik.values.row7)}
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex space-x-3">
                    {/* Placeholder for left-aligned buttons if needed */}
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

export default EpicCont;
