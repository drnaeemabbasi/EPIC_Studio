import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import InfoButton from "../../components/InfoButton";
import ValidatedInput from "../../components/ValidatedInput";
import useModelDefinition from "../../hooks/useModelDefinition";

const Parm1102Form = () => {
  const { model, isLoading: isModelLoading } = useModelDefinition("PARM1102.DAT");
  const [isLoading, setIsLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
  });

  const fetchInitialValues = async () => {
    setUpdateError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/getParm1102Data`,
        {
          params: { formName: "PARM1102" },
          headers: { "Content-Type": "application/json" },
        }
      );
      const fetchedData = res.data.data;
      const newRows = {};
      fetchedData.forEach((row, index) => {
        if (row) newRows[`newRow${index + 1}`] = row;
      });
      formik.setValues(newRows);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUpdateError("Failed to read file data. Please ensure the backend is running.");
    }
  };

  useEffect(() => {
    if (model) {
        fetchInitialValues();
    }
  }, [model]);

  const handleReadClick = async () => {
    setIsReading(true);
    await Promise.all([
      fetchInitialValues(),
      new Promise(resolve => setTimeout(resolve, 600))
    ]);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsReading(false);
  };

  const handleUpdateClick = async () => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/updatePARM1102`,
        formik.values,
        { headers: { "Content-Type": "application/json" } }
      );
      await new Promise(resolve => setTimeout(resolve, 600));
      fetchInitialValues();
    } catch (error) {
      console.error("Error updating data:", error);
      setUpdateError("Failed to update file. Technical detail: " + (error.response?.data?.error || error.message));
    } finally {
      setIsUpdating(false);
    }
  };

  if (isModelLoading || isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="w-full flex-1 max-w-[100vw] overflow-y-auto min-h-screen pb-12 bg-slate-50">
      <div className="p-4 w-full flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-4 w-full max-w-6xl"
        >
          <div className="border-b border-slate-100 pb-5 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              PARM1102 Form
            </h2>
          </div>

          {Object.keys(model.lines).map((lineNumStr) => {
            const lineNum = parseInt(lineNumStr, 10);
            const rowKey = `newRow${lineNum}`;
            const rowValues = formik.values[rowKey] || {};
            
            return (
              <div key={rowKey} className="mb-10 last:mb-0">
                {lineNum === 1 && (
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 mt-10">
                    The S-curve parameters
                  </h4>
                )}
                {lineNum === 31 && (
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 mt-16 pt-8 border-t border-slate-100">
                    General parameters
                  </h4>
                )}
                
                <h3 className="text-lg font-semibold text-slate-700 mb-5 mt-8 border-b border-slate-50 pb-2 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 text-xs border border-indigo-100">
                    {lineNum}
                  </span>
                  Line {lineNum}
                </h3>
                <div className="flex flex-wrap -mx-2 gap-y-6">
                  {Object.keys(rowValues).map((fieldKey) => (
                    <div className="w-full md:w-1/6 px-2" key={fieldKey}>
                      <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center">
                        {fieldKey}
                        <InfoButton fieldKey={fieldKey} />
                      </label>
                      <ValidatedInput
                        fieldKey={fieldKey}
                        name={`${rowKey}.${fieldKey}`}
                        id={fieldKey}
                        value={rowValues[fieldKey] ?? ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-10 pt-6 border-t border-slate-100">
            {updateError && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-pulse">
                ⚠️ {updateError}
              </div>
            )}
            
            <div className="flex justify-end items-center space-x-4">
              <button
                type="button"
                onClick={handleReadClick}
                disabled={isReading || isUpdating}
                className="flex items-center justify-center bg-slate-100 text-slate-700 font-semibold py-2.5 px-6 rounded-xl hover:bg-slate-200 transition-all text-sm min-w-[100px] disabled:opacity-70"
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
                className="flex items-center justify-center bg-indigo-600 text-white font-semibold py-2.5 px-8 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-sm min-w-[120px] disabled:opacity-70"
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
  );
};

export default Parm1102Form;
