import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCheckCircle, FaPlus, FaGlobeAmericas } from "react-icons/fa";

const SelectSite = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [activeSite, setActiveSite] = useState(localStorage.getItem("activeSite") || "umstead");
  const [newSiteName, setNewSiteName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchSites = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/basicRoutes/fetchSites`);
      setSites(response.data.sites || []);
      
      // If activeSite is not in the list (e.g. folder changed), default back to umstead
      const exists = response.data.sites.includes(activeSite);
      if (!exists && response.data.sites.length > 0) {
        handleSelectSite("umstead");
      }
      
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch sites. Ensure backend is running.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleSelectSite = (site) => {
    setActiveSite(site);
    localStorage.setItem("activeSite", site);
    toast.success(`Active site set to: ${site}`);
  };

  const handleCreateSite = async (e) => {
    e.preventDefault();
    if (!newSiteName) return toast.error("Please enter a site name");
    
    setIsProcessing(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/basicRoutes/createSite`, { newName: newSiteName });
      toast.success(`Site '${newSiteName}' created from umstead template`);
      setNewSiteName("");
      fetchSites();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create site");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteSite = async (site) => {
    if (site.toLowerCase() === "umstead") return;
    if (!window.confirm(`Are you sure you want to delete all files for site '${site}'?`)) return;

    setIsProcessing(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/basicRoutes/deleteSite`, { data: { siteName: site } });
      toast.info(`Site '${site}' deleted`);
      if (activeSite === site) {
        handleSelectSite("umstead");
      }
      fetchSites();
    } catch (err) {
      toast.error("Failed to delete site");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Select Site</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage your site file sets (.OPC, .SIT, .SOL)</p>
          </div>
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            <FaGlobeAmericas className="animate-pulse" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Currently Active</p>
              <p className="text-lg font-bold leading-tight uppercase italic">{activeSite}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Create New Site */}
          <div className="md:col-span-1">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 px-2">Create New Site</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
              <form onSubmit={handleCreateSite} className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 absolute left-3 -top-2 bg-white px-1 uppercase leading-none">New Site Name</label>
                  <input
                    type="text"
                    value={newSiteName}
                    onChange={(e) => setNewSiteName(e.target.value.replace(/\s+/g, "_"))}
                    placeholder="Enter site name..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <FaPlus size={12} />
                  <span>Clone from Umstead</span>
                </button>
                <p className="text-[10px] text-slate-400 px-1 italic">
                  Note: creates .OPC, .SIT, and .SOL files by duplicating umstead template.
                </p>
              </form>
            </div>
          </div>

          {/* Site List */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-2">Available Site Sets</h2>
            <div className="grid grid-cols-1 gap-3">
              {sites.map((site) => (
                <div 
                  key={site}
                  onClick={() => handleSelectSite(site)}
                  className={`group relative flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeSite === site 
                      ? "bg-white border-indigo-500 shadow-indigo-100/50 shadow-lg ring-1 ring-indigo-500/20" 
                      : "bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                      activeSite === site ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {activeSite === site ? <FaCheckCircle /> : site.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg uppercase ${activeSite === site ? "text-indigo-900" : "text-slate-800"}`}>
                        {site}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-slate-50 text-[9px] font-bold text-slate-400 border border-slate-100">.OPC</span>
                        <span className="px-2 py-0.5 rounded bg-slate-50 text-[9px] font-bold text-slate-400 border border-slate-100">.SIT</span>
                        <span className="px-2 py-0.5 rounded bg-slate-50 text-[9px] font-bold text-slate-400 border border-slate-100">.SOL</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 px-2">
                    {activeSite === site && (
                      <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest">Active</span>
                    )}
                    {site.toLowerCase() !== "umstead" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSite(site);
                        }}
                        className="p-3 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete site set"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSite;
