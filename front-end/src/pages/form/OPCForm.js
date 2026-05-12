import React, { useEffect, useState } from "react";
import InfoButton from "../../components/InfoButton";
import ValidatedInput from "../../components/ValidatedInput";
import axios from "axios";
import useModelDefinition from "../../hooks/useModelDefinition";

const OPCForm = () => {
  const { model, isLoading: isModelLoading } = useModelDefinition("filename.OPC");
  const [formData, setFormData] = useState([]);
  const [siteInfo1, setSiteInfo1] = useState("");
  const [siteInfo2, setSiteInfo2] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTabularViewOpen, setIsTabularViewOpen] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const activeSite = localStorage.getItem("activeSite") || "umstead";

  const fetchFormData = async () => {
    setUpdateError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/databaseFiles/fetchOPCFormData?siteName=${activeSite}`
      );
      setFormData(response.data.data || []);
      setSiteInfo1(response.data.siteInfo1 || "");
      setSiteInfo2(response.data.siteInfo2 || "");
    } catch (error) {
      console.error("Error fetching data:", error);
      setUpdateError("Failed to read file data. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (model) {
        fetchFormData();
    }
  }, [model, activeSite]);

  const handleReadClick = async () => {
    setIsReading(true);
    await Promise.all([
      fetchFormData(),
      new Promise((resolve) => setTimeout(resolve, 600)),
    ]);
    setIsReading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFormData = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databaseFiles/updateOPCFormData`,
        { formData, siteInfo1, siteInfo2, siteName: activeSite }
      );
      await new Promise((resolve) => setTimeout(resolve, 600));
      fetchFormData();
    } catch (error) {
      console.error("Error updating data:", error);
      setUpdateError("Failed to update file. Technical detail: " + (error.response?.data?.error || error.message));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (event, rowIndex, fieldName) => {
    const updatedData = [...formData];
    updatedData[rowIndex][fieldName] = event.target.value;
    setFormData(updatedData);
  };

  const deleteRow = (rowIndex) => {
    if (window.confirm("Are you sure you want to delete this operation row?")) {
      const updatedData = formData.filter((_, index) => index !== rowIndex);
      setFormData(updatedData);
    }
  };

  const addRow = () => {
    const newRow = {};
    const lineNums = Object.keys(model.lines).map(Number).sort((a,b) => a-b);
    const firstLineNum = lineNums[0];
    
    if (model && firstLineNum && model.lines[firstLineNum]) {
        model.lines[firstLineNum].forEach(varDef => {
            newRow[varDef.Variable_Code] = "";
        });
    }
    setFormData([...formData, newRow]);
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
      <div className="p-5 w-full">
        <form
          onSubmit={updateFormData}
          className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-8 w-full max-w-6xl mx-auto"
        >
          {/* Form Header */}
          <div className="border-b border-slate-100 pb-5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight text-center md:text-left">OPC Form</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsTabularViewOpen(true)}
                className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-200 transition-all text-xs font-bold"
              >
                View Table
              </button>
              <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Site:</span>
                <span className="text-sm font-bold uppercase italic tracking-wide">{activeSite}</span>
              </div>
            </div>
          </div>

          {/* Site Information Headers (Line 1 & 2) */}
          <div className="mb-10 space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Site Information</h3>
            <div className="space-y-4">
               <div className="relative">
                 <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Site Details Line 1</label>
                 <input
                   type="text"
                   value={siteInfo1}
                   onChange={(e) => setSiteInfo1(e.target.value)}
                   className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700 bg-white"
                   placeholder="Enter site name/details..."
                 />
               </div>
               <div className="relative">
                 <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Site Details Line 2</label>
                 <input
                   type="text"
                   value={siteInfo2}
                   onChange={(e) => setSiteInfo2(e.target.value)}
                   className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700 bg-white"
                   placeholder="Enter additional site information..."
                 />
               </div>
            </div>
          </div>

          {/* Row By Row Operations List */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Operational Details</h3>
            {formData.map((row, rowIndex) => (
              <div key={rowIndex} className="mb-10 last:mb-0 p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 transition-all shadow-sm relative group hover:shadow-md hover:z-50">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between border-b-2 border-slate-50 pb-3">
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 text-xs border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {rowIndex + 1}
                    </span>
                    Operation Row
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteRow(rowIndex)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    title="Delete Row"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-6">
                  {model && model.lines && Object.keys(model.lines).length > 0 &&
                    model.lines[Object.keys(model.lines).map(Number).sort((a,b) => a-b)[0]].map((varDef) => (
                    <div key={varDef.Variable_Code} className="relative w-full group/field hover:z-30">
                      <label className="block text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center">
                        {varDef.Variable_Code}
                        <span className="relative">
                          <InfoButton fieldKey={varDef.Variable_Code} description={varDef.Description} />
                        </span>
                      </label>
                      <ValidatedInput
                        fieldKey={varDef.Variable_Code}
                        name={`row-${rowIndex}-${varDef.Variable_Code}`}
                        value={row[varDef.Variable_Code] ?? ""}
                        onChange={(event) => handleInputChange(event, rowIndex, varDef.Variable_Code)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800 font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="mt-10 pt-6 border-t border-slate-100">
            {updateError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-pulse rounded-r-lg">
                ⚠️ {updateError}
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <button
                type="button"
                onClick={addRow}
                className="w-full md:w-auto bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold py-3 px-10 rounded-xl hover:bg-indigo-100 transition-all text-sm shadow-sm flex items-center justify-center gap-2"
              >
                <span className="text-xl leading-none">+</span> Add Operation Row
              </button>
              
              <div className="flex space-x-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleReadClick}
                  disabled={isReading || isUpdating}
                  className="flex-1 md:flex-none flex items-center justify-center bg-slate-100 text-slate-700 font-semibold py-3 px-8 rounded-xl hover:bg-slate-200 transition-all text-sm min-w-[120px] disabled:opacity-70 shadow-sm"
                >
                  {isReading ? (
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Read File"
                  )}
                </button>

                <button
                  type="submit"
                  disabled={isReading || isUpdating}
                  className="flex-1 md:flex-none flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-12 rounded-xl hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-100 text-sm min-w-[160px] disabled:opacity-70"
                >
                  {isUpdating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Tabular View Modal */}
      {isTabularViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-7xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Operational Overview</h2>
                <p className="text-xs text-slate-500 font-medium">Site: {activeSite}.opc | {formData.length} total operations</p>
              </div>
              <button 
                onClick={() => setIsTabularViewOpen(false)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-0">
              <table className="w-full text-left border-collapse min-w-[1500px]">
                <thead className="sticky top-0 bg-white border-b-2 border-slate-100 z-10">
                  <tr>
                    <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400 bg-slate-50/50 w-12 text-center">Row</th>
                    {formData.length > 0 && Object.keys(formData[0]).map(header => (
                      <th key={header} className="px-4 py-4 text-[10px] font-black uppercase text-slate-500 bg-slate-50/50 min-w-[100px]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {formData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-4 py-3 text-xs font-bold text-slate-400 bg-slate-50/30 text-center">{idx + 1}</td>
                      {Object.values(row).map((val, vIdx) => (
                        <td key={vIdx} className="px-4 py-3 text-sm text-slate-600 font-medium">
                          {val === "" || val === null ? <span className="opacity-20">—</span> : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
               <button 
                 onClick={() => setIsTabularViewOpen(false)}
                 className="bg-indigo-600 text-white px-8 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
               >
                 Close Preview
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OPCForm;
