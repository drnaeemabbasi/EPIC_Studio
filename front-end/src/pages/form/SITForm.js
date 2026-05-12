import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoButton from "../../components/InfoButton";
import ValidatedInput from "../../components/ValidatedInput";
import useModelDefinition from "../../hooks/useModelDefinition";

const SITForm = () => {
  const { model, isLoading: isModelLoading } = useModelDefinition("filename.SIT");
  const [formData, setFormData] = useState([]);
  const [siteInfo1, setSiteInfo1] = useState("");
  const [siteInfo2, setSiteInfo2] = useState("");
  const [siteInfo3, setSiteInfo3] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const activeSite = localStorage.getItem("activeSite") || "umstead";

  const fetchFormDataRaw = async () => {
    setUpdateError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/databaseFiles/fetchSITFormData?siteName=${activeSite}`
      );
      setFormData(response.data.data || []);
      setSiteInfo1(response.data.siteInfo1 || "");
      setSiteInfo2(response.data.siteInfo2 || "");
      setSiteInfo3(response.data.siteInfo3 || "");
    } catch (error) {
      console.error("Error fetching data:", error);
      setUpdateError("Failed to read file data. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (model) {
        fetchFormDataRaw();
    }
  }, [model, activeSite]);

  const handleReadClick = async () => {
    setIsReading(true);
    await Promise.all([
      fetchFormDataRaw(),
      new Promise((resolve) => setTimeout(resolve, 600)),
    ]);
    setIsReading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databaseFiles/updateSITFormData`,
        { formData, siteInfo1, siteInfo2, siteInfo3, siteName: activeSite }
      );
      await new Promise((resolve) => setTimeout(resolve, 600));
      fetchFormDataRaw();
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
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-8 w-full max-w-6xl mx-auto"
        >
          {/* Form Header */}
          <div className="border-b border-slate-100 pb-5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight text-center md:text-left">SIT Form</h2>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Site:</span>
                <span className="text-sm font-bold uppercase italic tracking-wide">{activeSite}</span>
              </div>
            </div>
          </div>

          {/* Site Information Headers */}
          <div className="mb-10 space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Site Information</h3>
            <div className="space-y-4">
               <div className="relative">
                 <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1 flex items-center gap-1">
                    Site Details Line 1
                    <InfoButton description="Site Identification: Line 1 of the SIT file." />
                 </label>
                 <input
                   type="text"
                   value={siteInfo1}
                   onChange={(e) => setSiteInfo1(e.target.value)}
                   className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700 bg-white"
                 />
               </div>
               <div className="relative">
                 <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1 flex items-center gap-1">
                    Site Details Line 2
                    <InfoButton description="Standard site description: Line 2 of the SIT file." />
                 </label>
                 <input
                   type="text"
                   value={siteInfo2}
                   onChange={(e) => setSiteInfo2(e.target.value)}
                   className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700 bg-white"
                 />
               </div>
               <div className="relative">
                 <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1 flex items-center gap-1">
                    Site Details Line 3
                    <InfoButton description="Extended site information: Line 3 of the SIT file." />
                 </label>
                 <input
                   type="text"
                   value={siteInfo3}
                   onChange={(e) => setSiteInfo3(e.target.value)}
                   className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700 bg-white"
                 />
               </div>
            </div>
          </div>

          {/* Parameters Grid */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Site Parameters</h3>
            {formData.map((row, rowIndex) => (
              <div key={rowIndex} className="mb-10 last:mb-0 p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 transition-all shadow-sm relative group hover:shadow-md hover:z-50">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center border-b-2 border-slate-50 pb-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 text-xs border border-indigo-100 font-bold">
                    {rowIndex + 1}
                  </span>
                  Line {row.id} Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-6">
                  {Object.keys(row).map((fieldName) => (
                    fieldName !== "id" && (
                      <div key={fieldName} className="relative w-full group/field hover:z-30">
                        <label className="block text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center">
                          {fieldName}
                          <span className="relative">
                            <InfoButton fieldKey={fieldName} />
                          </span>
                        </label>
                        <ValidatedInput
                          fieldKey={fieldName}
                          name={`row-${rowIndex}-${fieldName}`}
                          value={row[fieldName] ?? ""}
                          onChange={(event) => handleInputChange(event, rowIndex, fieldName)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800 font-medium"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col items-end gap-6">
            {updateError && (
              <div className="w-full p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-pulse rounded-r-xl">
                ⚠️ {updateError}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleReadClick}
                disabled={isReading || isUpdating}
                className="bg-slate-100 text-slate-600 font-bold py-2.5 px-6 rounded-xl hover:bg-slate-200 transition-all text-sm min-w-[120px] disabled:opacity-70 border border-slate-200"
              >
                {isReading ? (
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Read Data"
                )}
              </button>
              <button
                type="submit"
                disabled={isReading || isUpdating}
                className="bg-indigo-600 text-white font-bold py-2.5 px-10 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-sm min-w-[150px] disabled:opacity-70"
              >
                {isUpdating ? (
                  <div className="w-5 h-5 border-2 border-indigo-200 border-t-transparent rounded-full animate-spin mx-auto"></div>
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

export default SITForm;
