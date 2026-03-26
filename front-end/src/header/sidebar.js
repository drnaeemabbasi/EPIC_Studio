import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TCSign from "../assets/teal-climate-logo-1.svg";
import sidebarOptionIcon from "../assets/Rectangle 5.png";
import FolderPicker from "../components/setFolder.js";
import axios from "axios";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
  FaCentos,
  FaDatabase,
  FaDotCircle,
  FaAlignLeft,
  FaCloud,
} from "react-icons/fa";

const SidebarLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname.toLowerCase() === to.toLowerCase();
  return (
    <Link
      to={to}
      className={`block py-1.5 px-3 mb-0.5 transition-colors duration-200 text-sm rounded-lg border ${isActive
        ? "bg-indigo-500/15 text-indigo-400 font-semibold border-indigo-500/20"
        : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-white font-medium"
        }`}
    >
      {children}
    </Link>
  );
};

const Sidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Auto-expand category based on current route
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("epicrun") || path.includes("epiccont") || path.includes("parm1102") || path.includes("mlrn1102")) {
      setExpandedCategory("controlForms");
    } else if (path.includes("cropcom") || path.includes("fert2012") || path.includes("pestcom") || path.includes("tillcom")) {
      setExpandedCategory("databaseForms");
    } else if (path.includes("renamefiles") || path.includes("opcform") || path.includes("sitform") || path.includes("solform")) {
      setExpandedCategory("OPCForms");
    } else if (path.includes("windusel") || path.includes("wpm1usel")) {
      setExpandedCategory("listingFiles");
    } else if (path.includes("notepad-files")) {
      setExpandedCategory("weatherfile");
    }
  }, [location.pathname]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? "" : category);
  };

  const toggleSidebar = () => {
    setExpandedCategory("");
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`h-screen sticky top-0 left-0 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-all duration-300 z-50 ${isSidebarOpen ? "w-64" : "w-16"
        }`}
    >
      {/* Header */}
      <div className="p-5 text-center bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-center h-[72px]">
        {isSidebarOpen ? (
          <h1 className="text-xl font-black tracking-wide text-white drop-shadow-sm">
            EPIC Studio
          </h1>
        ) : (
          <h1 className="text-xl font-black text-white">ES</h1>
        )}
      </div>

      {/* Navigation */}
      <div
        className={`mt-4 flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-6 ${isSidebarOpen ? "px-2" : "items-center px-0"
          }`}
      >
        <ul className="space-y-4 w-full">
          <li className={`w-full flex items-center px-4 pt-6 pb-2 text-xs uppercase tracking-wider text-slate-500 font-bold ${!isSidebarOpen && 'justify-center opacity-0'}`}>
            Inputs Files
          </li>

          {/* Control Forms */}
          <li>
            {isSidebarOpen ? (
              <button
                onClick={() => toggleCategory("controlForms")}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left font-semibold rounded-lg transition-colors ${expandedCategory === "controlForms" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaCentos className="text-lg opacity-80" />
                  <span>Control Forms</span>
                </div>
                {expandedCategory === "controlForms" ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </button>
            ) : (
              <button
                onClick={() => { toggleSidebar(); toggleCategory("controlForms"); }}
                className="w-full flex items-center justify-center py-3 text-slate-500 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                title="Control Forms"
              >
                <FaCentos className="text-xl" />
              </button>
            )}
            <ul
              className={`pl-11 pr-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === "controlForms" ? "max-h-96 py-2 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <li><SidebarLink to="/epicAllForms/EPICRUN/0/1">EPICRUN</SidebarLink></li>
              <li><SidebarLink to="/epicCont">EPICCONT</SidebarLink></li>
              <li><SidebarLink to="/PARM1102">PARM1102</SidebarLink></li>
              <li><SidebarLink to="/epicAllForms/MLRN1102/0/1">MLRN1102</SidebarLink></li>
            </ul>
          </li>

          {/* Database Forms */}
          <li>
            {isSidebarOpen ? (
              <button
                onClick={() => toggleCategory("databaseForms")}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left font-semibold rounded-lg transition-colors ${expandedCategory === "databaseForms" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaDatabase className="text-lg opacity-80" />
                  <span>Database Forms</span>
                </div>
                {expandedCategory === "databaseForms" ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </button>
            ) : (
              <button
                onClick={() => { toggleSidebar(); toggleCategory("databaseForms"); }}
                className="w-full flex items-center justify-center py-3 text-slate-500 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                title="Database Forms"
              >
                <FaDatabase className="text-xl" />
              </button>
            )}

            <ul
              className={`pl-11 pr-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === "databaseForms" ? "max-h-96 py-2 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <li><SidebarLink to="/epicAllForms/CROPCOM/2/3">CROPCOM</SidebarLink></li>
              <li><SidebarLink to="/epicAllForms/FERT2012/2/3">FERT2012</SidebarLink></li>
              <li><SidebarLink to="/epicAllForms/PESTCOM/2/3">PESTCOM</SidebarLink></li>
              <li><SidebarLink to="/epicAllForms/TILLCOM/2/3">TILLCOM</SidebarLink></li>
            </ul>
          </li>

          {/* OPC Forms */}
          <li>
            {isSidebarOpen ? (
              <button
                onClick={() => toggleCategory("OPCForms")}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left font-semibold rounded-lg transition-colors ${expandedCategory === "OPCForms" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaDotCircle className="text-lg opacity-80" />
                  <span>OPC Forms</span>
                </div>
                {expandedCategory === "OPCForms" ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </button>
            ) : (
              <button
                onClick={() => { toggleSidebar(); toggleCategory("OPCForms"); }}
                className="w-full flex items-center justify-center py-3 text-slate-500 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                title="OPC Forms"
              >
                <FaDotCircle className="text-xl" />
              </button>
            )}

            <ul
              className={`pl-11 pr-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === "OPCForms" ? "max-h-96 py-2 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <li><SidebarLink to="/renameFilesForm">Rename File</SidebarLink></li>
              <li><SidebarLink to="/opcform-Form">OPC form</SidebarLink></li>
              <li><SidebarLink to="/sitform-Form">SIT form</SidebarLink></li>
              <li><SidebarLink to="/solform-Form">SOL form</SidebarLink></li>
            </ul>
          </li>

          {isSidebarOpen && <div className="px-5 py-3"><hr className="border-slate-800/80" /></div>}
          {!isSidebarOpen && <div className="px-2 py-4"><hr className="border-slate-800/80" /></div>}

          <li className={`w-full flex items-center px-4 py-1 text-xs uppercase tracking-wider text-slate-500 font-bold ${!isSidebarOpen && 'justify-center opacity-0'}`}>
            Output files
          </li>

          {/* Listing Files */}
          <li>
            {isSidebarOpen ? (
              <button
                onClick={() => toggleCategory("listingFiles")}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left font-semibold rounded-lg transition-colors ${expandedCategory === "listingFiles" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaAlignLeft className="text-lg opacity-80" />
                  <span>Listing Files</span>
                </div>
                {expandedCategory === "listingFiles" ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </button>
            ) : (
              <button
                onClick={() => { toggleSidebar(); toggleCategory("listingFiles"); }}
                className="w-full flex items-center justify-center py-3 text-slate-500 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                title="Listing Files"
              >
                <FaAlignLeft className="text-xl" />
              </button>
            )}

            <ul
              className={`pl-11 pr-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === "listingFiles" ? "max-h-96 py-2 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <li><SidebarLink to="/epicAllForms/WINDUSEL/0/1">WINDUSEL</SidebarLink></li>
              <li><SidebarLink to="/epicAllForms/WPM1USEL/0/1">WPM1USEL</SidebarLink></li>
            </ul>
          </li>

          {/* Weather Files */}
          <li>
            {isSidebarOpen ? (
              <button
                onClick={() => toggleCategory("weatherfile")}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left font-semibold rounded-lg transition-colors ${expandedCategory === "weatherfile" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaCloud className="text-lg opacity-80" />
                  <span>Weather Files</span>
                </div>
                {expandedCategory === "weatherfile" ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </button>
            ) : (
              <button
                onClick={() => { toggleSidebar(); toggleCategory("weatherfile"); }}
                className="w-full flex items-center justify-center py-3 text-slate-500 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                title="Weather Files"
              >
                <FaCloud className="text-xl" />
              </button>
            )}
            <ul
              className={`pl-11 pr-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === "weatherfile" ? "max-h-96 py-2 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <li><SidebarLink to="/notepad-files/dly">DLY Form</SidebarLink></li>
              <li><SidebarLink to="/notepad-files/out">OUT Form</SidebarLink></li>
              <li><SidebarLink to="/notepad-files/wnd">WND Form</SidebarLink></li>
              <li><SidebarLink to="/notepad-files/wp1">WP1 Form</SidebarLink></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Footer / Toggle Switch */}
      <div className="p-4 border-t border-slate-800/80 flex justify-center bg-slate-950/50 text-slate-500">
        {/* Toggle Button for Desktop */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-all hidden md:block focus:outline-none"
        >
          {isSidebarOpen ? <FaChevronDown className="transform rotate-90" /> : <FaChevronDown className="transform -rotate-90" />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
