import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoButton from "../../components/InfoButton";
import ValidatedInput from "../../components/ValidatedInput";
import useModelDefinition from "../../hooks/useModelDefinition";

const SOLForm = () => {
  const { model, isLoading: isModelLoading } = useModelDefinition("filename.SOL");
  const [formMainData, setFormMainData] = useState({}); // Layer data
  const [universalParams, setUniversalParams] = useState({}); // Line 1, 2 & 3
  const [siteInfo1, setSiteInfo1] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const activeSite = localStorage.getItem("activeSite") || "umstead";

  const fetchFormDataRaw = async () => {
    setUpdateError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/databaseFiles/fetchSOLFormData?siteName=${activeSite}`
      );
      console.log("SOL API Response:", response.data);
      setFormMainData(response.data.mainData || {});
      setUniversalParams(response.data.universalParams || {});
      setSiteInfo1(response.data.siteInfo1 || "");
    } catch (err) {
      console.error("Error fetching data:", err);
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

  const updateFormData = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/databaseFiles/updateSOLFormData`,
        { formMainData, universalParams, siteInfo1, siteName: activeSite }
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

  const handleUniversalParamChange = (event, fieldName) => {
    setUniversalParams((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  };

  const handleMainDataChange = (event, columnName, fieldName) => {
    setFormMainData((prevState) => ({
      ...prevState,
      [columnName]: {
        ...prevState[columnName],
        [fieldName]: event.target.value,
      },
    }));
  };

  if (isModelLoading || isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  // Sort columns numerically: column1, column2, etc.
  const columnNames = Object.keys(formMainData).sort((a, b) => {
    const numA = parseInt(a.replace('column', ''));
    const numB = parseInt(b.replace('column', ''));
    return numA - numB;
  });

  // Identify parameters by line from model - handle both string and numeric keys
  const getLineParams = (num) => {
    if (!model || !model.lines) return [];
    const lineData = model.lines[num] || model.lines[String(num)];
    return lineData ? lineData.map(v => v.Variable_Code) : [];
  };

  const line1Params = getLineParams(1);
  const line2Params = getLineParams(2);
  const line3Params = getLineParams(3);

  return (
    <div className="w-full flex-1 max-w-[100vw] overflow-y-auto min-h-screen pb-12 bg-slate-50">
      <div className="p-5 w-full">
        <form
          onSubmit={updateFormData}
          className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 mt-8 w-full max-w-6xl mx-auto"
        >
          {/* Form Header */}
          <div className="border-b border-slate-100 pb-5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight text-center md:text-left">SOL Form</h2>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Site:</span>
                <span className="text-sm font-bold uppercase italic tracking-wide">{activeSite}</span>
              </div>
            </div>
          </div>

          {/* Site Identification Section (Line 1) */}
          <div className="mb-10 space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Site Identification</h3>
            
            {/* If Line 1 has specific fields in the model, show them as structured inputs */}
            {line1Params.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {line1Params.map((fieldName) => (
                        <div key={fieldName} className="relative w-full group/field">
                            <label className="block text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center">
                                {fieldName}
                                <span className="relative">
                                    <InfoButton fieldKey={fieldName} />
                                </span>
                            </label>
                            <ValidatedInput
                                fieldKey={fieldName}
                                name={`universal-${fieldName}`}
                                value={universalParams[fieldName] ?? ""}
                                onChange={(event) => handleUniversalParamChange(event, fieldName)}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800 font-medium"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1 flex items-center gap-1">
                        Soil Description (Line 1)
                        <InfoButton description="Soil Series / Order: Line 1 of the SOL file." />
                    </label>
                    <input
                        type="text"
                        value={siteInfo1}
                        onChange={(e) => setSiteInfo1(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700 bg-white"
                    />
                </div>
            )}
          </div>

          {/* Universal Parameters Section (Line 2 & 3) */}
          <div className="space-y-10 mb-12">
            {/* Line 2 Parameters */}
            {line2Params.length > 0 && (
                <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/20 shadow-sm transition-all hover:bg-slate-50/40">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 px-1">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                        General Soil Profile (Line 2)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-x-4 gap-y-6">
                        {line2Params.map((fieldName) => (
                            <div key={fieldName} className="relative w-full group/field hover:z-30">
                                <label className="block text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center">
                                    {fieldName}
                                    <span className="relative">
                                        <InfoButton fieldKey={fieldName} />
                                    </span>
                                </label>
                                <ValidatedInput
                                    fieldKey={fieldName}
                                    name={`universal-${fieldName}`}
                                    value={universalParams[fieldName] ?? ""}
                                    onChange={(event) => handleUniversalParamChange(event, fieldName)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800 font-medium"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Line 3 Parameters */}
            {line3Params.length > 0 && (
                <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/20 shadow-sm transition-all hover:bg-slate-50/40">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 px-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Chemical/Biological Baselines (Line 3)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-x-4 gap-y-6">
                        {line3Params.map((fieldName) => (
                            <div key={fieldName} className="relative w-full group/field hover:z-30">
                                <label className="block text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center">
                                    {fieldName}
                                    <span className="relative">
                                        <InfoButton fieldKey={fieldName} />
                                    </span>
                                </label>
                                <ValidatedInput
                                    fieldKey={fieldName}
                                    name={`universal-${fieldName}`}
                                    value={universalParams[fieldName] ?? ""}
                                    onChange={(event) => handleUniversalParamChange(event, fieldName)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800 font-medium"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Soil Horizons (Layer Cards) */}
          <div className="space-y-12">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Soil Horizons (Layer-wise Data)</h3>
            
            {columnNames.map((colName, colIdx) => (
              <div key={colName} className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 transition-all shadow-sm relative group hover:shadow-md hover:z-50">
                <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center border-b-2 border-slate-50 pb-4">
                  <span className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-4 text-sm font-bold shadow-lg shadow-indigo-200">
                    {colIdx + 1}
                  </span>
                  Layer {colIdx + 1} Parameters
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-6">
                  {Object.keys(formMainData[colName] || {}).map((fieldName) => (
                    <div key={fieldName} className="relative w-full group/field hover:z-30">
                      <label className="block text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center">
                        {fieldName}
                        <span className="relative">
                          <InfoButton fieldKey={fieldName} />
                        </span>
                      </label>
                      <ValidatedInput
                        fieldKey={fieldName}
                        name={`${colName}-${fieldName}`}
                        value={formMainData[colName][fieldName] ?? ""}
                        onChange={(event) => handleMainDataChange(event, colName, fieldName)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 transition-all shadow-sm text-sm border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white text-slate-800 font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col items-end gap-6">
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
                  "Read"
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

export default SOLForm;
