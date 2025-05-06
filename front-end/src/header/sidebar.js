import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const Sidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? "" : category);
  };

  const toggleSidebar = () => {
    setExpandedCategory("");

    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`h-screen sticky rounded-se-[30px] top-0 left-0 bg-white text-black shadow-lg flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="p-4 text-center bg-tc-blue text-tc-dark-blue  rounded-se-[30px]">
        {isSidebarOpen ? (
          <h1 className="text-2xl font-black tracking-wider text-center">
            EPIC Studio
          </h1>
        ) : null}
        {/* <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button> */}
      </div>

      {/* Navigation */}
      <div
        className={`mt-5  flex-1 flex overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 
          ${isSidebarOpen ? "" : "items-center"}`}
      >
        {/* <div className="flex-1 overflow-y-auto flex overflow-x-hide  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"> */}
        {/* <div className="flex-1  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"> */}
        <ul className="space-y-2  w-full">
          <li className="w-full flex items-center justify-between px-4 py-2 text-left font-bold ">
            Inputs Files
          </li>

          {/* Control Forms */}
          <li>
            {isSidebarOpen ? (
              <div className="flex justify-between w-full group">
                <img
                  src={sidebarOptionIcon}
                  alt="TEAL Climate Logo"
                  className={`h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    expandedCategory === "controlForms" ? "opacity-100" : ""
                  }`}
                />

                <button
                  onClick={() => toggleCategory("controlForms")}
                  className={`w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue ${
                    expandedCategory === "controlForms" ? "bg-tc-blue" : ""
                  }`}
                >
                  <span className="font-size-4">Control Forms</span>
                  {expandedCategory === "controlForms" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  toggleSidebar();
                  toggleCategory("controlForms");
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
              >
                <FaCentos />
              </button>
            )}
            <ul
              className={`pl-4 space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCategory === "controlForms"
                  ? "max-h-screen py-2"
                  : "max-h-0"
              }`}
            >
              <li>
                <Link
                  to="/epicAllForms/EPICRUN/0/1"
                  className="block  py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  EPICRUN
                </Link>
              </li>
              <li>
                <Link
                  to="/epicCont"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  EPICCONT
                </Link>
              </li>
              <li>
                <Link
                  to="/PARM1102"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  PARM1102
                </Link>
              </li>

              <li>
                <Link
                  to="/epicAllForms/MLRN1102/0/1"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  MLRN1102
                </Link>
              </li>
            </ul>
          </li>

          {/* Database Forms */}
          <li>
            {isSidebarOpen ? (
              <div className="flex justify-between w-full group">
                <img
                  src={sidebarOptionIcon}
                  alt="TEAL Climate Logo"
                  // className="h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  className={`h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    expandedCategory === "databaseForms" ? "opacity-100" : ""
                  }`}
                />

                <button
                  onClick={() => toggleCategory("databaseForms")}
                  // className="w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue"
                  className={`w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue ${
                    expandedCategory === "databaseForms" ? "bg-tc-blue" : ""
                  }`}
                  // className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
                >
                  <span>Database Forms</span>
                  {expandedCategory === "databaseForms" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  toggleSidebar();
                  toggleCategory("databaseForms");
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
              >
                <FaDatabase />
              </button>
            )}

            <ul
              className={`pl-4 space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCategory === "databaseForms"
                  ? "max-h-screen py-2"
                  : "max-h-0"
              }`}
            >
              <li>
                <Link
                  to="/epicAllForms/CROPCOM/2/3"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  CROPCOM
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/FERT2012/2/3"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  FERT2012
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/PESTCOM/2/3"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  PESTCOM
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/TILLCOM/2/3"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  TILLCOM
                </Link>
              </li>
            </ul>
          </li>

          {/* OPC Forms */}
          <li>
            {isSidebarOpen ? (
              <div className="flex justify-between w-full group">
                <img
                  src={sidebarOptionIcon}
                  alt="TEAL Climate Logo"
                  className={`h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    expandedCategory === "OPCForms" ? "opacity-100" : ""
                  }`}
                  // className="h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <button
                  onClick={() => toggleCategory("OPCForms")}
                  className={`w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue ${
                    expandedCategory === "OPCForms" ? "bg-tc-blue" : ""
                  }`}
                  // className="w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue"
                >
                  <span>OPC Forms</span>
                  {expandedCategory === "OPCForms" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  toggleSidebar();
                  toggleCategory("OPCForms");
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
              >
                <FaDotCircle />
              </button>
            )}

            <ul
              className={`pl-4 space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCategory === "OPCForms"
                  ? "max-h-screen py-2"
                  : "max-h-0"
              }`}
            >
              <li>
                <Link
                  to="/renameFilesForm"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  <b>Rename File</b>
                </Link>
              </li>
              <li>
                <Link
                  to="/opcform-Form"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  OPC form
                </Link>
              </li>
              <li>
                <Link
                  to="/sitform-Form"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  SIT form
                </Link>
              </li>
              <li>
                <Link
                  to="/solform-Form"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  SOL form
                </Link>
              </li>
            </ul>
          </li>
          {/* <hr className="font-md" /> */}
          <hr className="font-md h-[2px] bg-gray-400 border-0 " />
          <li className="w-full flex items-center justify-between px-4 py-2 text-left font-bold ">
            Output files
          </li>
          {/* Listing Forms */}

          <li>
            {isSidebarOpen ? (
              <div className="flex justify-between w-full group">
                <img
                  src={sidebarOptionIcon}
                  alt="TEAL Climate Logo"
                  className={`h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    expandedCategory === "listingFiles" ? "opacity-100" : ""
                  }`}
                  // className="h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <button
                  onClick={() => toggleCategory("listingFiles")}
                  // className="w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue"
                  className={`w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue ${
                    expandedCategory === "listingFiles" ? "bg-tc-blue" : ""
                  }`}
                  // className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
                >
                  <span>Listing Files</span>
                  {expandedCategory === "listingFiles" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
            ) : (
              // <button
              //   onClick={() => toggleCategory("listingFiles")}
              //   className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
              // >
              //   <span>Listing Files</span>
              //   {expandedCategory === "listingFiles" ? (
              //     <FaChevronUp />
              //   ) : (
              //     <FaChevronDown />
              //   )}
              // </button>
              <button
                onClick={() => {
                  toggleSidebar();
                  toggleCategory("listingFiles");
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
              >
                <FaAlignLeft />
              </button>
            )}

            <ul
              className={`pl-4 space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCategory === "listingFiles"
                  ? "max-h-screen py-2"
                  : "max-h-0"
              }`}
            >
              <li>
                <Link
                  to="/epicAllForms/WINDUSEL/0/1"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  WINDUSEL
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/WPM1USEL/0/1"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  WPM1USEL
                </Link>
              </li>
            </ul>
          </li>

          <li>
            {isSidebarOpen ? (
              <div className="flex justify-between w-full group">
                <img
                  src={sidebarOptionIcon}
                  alt="TEAL Climate Logo"
                  className={`h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    expandedCategory === "weatherfile" ? "opacity-100" : ""
                  }`}
                  // className="h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <button
                  onClick={() => toggleCategory("weatherfile")}
                  // className="w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue"
                  className={`w-11/12 flex items-center justify-between px-4 py-2 text-left font-medium rounded-ss-md rounded-es-md hover:bg-tc-blue ${
                    expandedCategory === "weatherfile" ? "bg-tc-blue" : ""
                  }`}
                  // className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
                >
                  <span>Weather Files</span>
                  {expandedCategory === "weatherfile" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  toggleSidebar();
                  toggleCategory("weatherfile");
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-left font-medium rounded-md hover:bg-tc-dark-blue"
              >
                <FaCloud />
              </button>
            )}
            <ul
              className={`pl-4 space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCategory === "weatherfile"
                  ? "max-h-screen py-2"
                  : "max-h-0"
              }`}
            >
              <li>
                {/* <button
                  onClick={() => openNotepad("dly")}
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  DLY
                </button> */}

                <Link
                  to="/notepad-files/dly"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  DLY Form
                </Link>
                <Link
                  to="/notepad-files/out"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  OUT Form
                </Link>
                <Link
                  to="/notepad-files/wnd"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  WND Form
                </Link>
                <Link
                  to="/notepad-files/wp1"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  WP1 Form
                </Link>
                {/* <Link
                  to="/notepad-files/wp1"
                  className="block py-1 px-2 hover:bg-tc-blue rounded-md"
                >
                  WP1 Form
                </Link> */}
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-start text-sm">
        {/* {isSidebarOpen ? (
          <>
            <FolderPicker />
            <div className="mt-5">
              <span>© TEAL Climate</span>
            </div>
          </>
        ) : (
          <img src={TCSign} alt="TEAL Climate Logo" className="h-5" />
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;
