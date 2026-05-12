import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState("");

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? "" : category);
  };

  return (
    <div className="w-64 h-screen bg-tc-blue text-black fixed flex flex-col shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 text-center flex-shrink-0">
        <h1 className="text-2xl font-bold text-white tracking-wider">
          EPIC Studio
        </h1>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-hover-tc-blue scrollbar-track-white">
        <div className="p-2 pl-5">
          <p className="text-gray-100 font-bold">Input Files</p>
        </div>
        {/* Sidebar navigation */}
        <ul className="space-y-2 px-4">
          {/* Control Forms */}
          <li>
            <button
              className="w-full text-left py-2 px-4 bg-tc-dark-blue rounded-md font-bold text-white hover:bg-hover-tc-blue"
              onClick={() => toggleCategory("controlForms")}
            >
              Control Forms
            </button>
            <ul
              className={`pl-4 bg-tc-dark-blue rounded-md mt-2 text-white space-y-1 transition-all duration-300 ease-in-out ${
                expandedCategory === "controlForms"
                  ? "max-h-screen p-2"
                  : "max-h-0"
              } overflow-hidden`}
            >
              <li>
                <Link
                  to="/epicAllForms/EPICRUN/0/1"
                  className="block  py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  EPICRUN
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/TILLCOM/2/3"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  TILLCOM
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/WINDUSEL/0/1"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  WINDUSEL
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/WPM1USEL/0/1"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  WPM1USEL
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/CROPCOM/2/3"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  CROPCOM
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/FERT2012/2/3"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  FERT2012
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/PESTCOM/2/3"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  PESTCOM
                </Link>
              </li>
              <li>
                <Link
                  to="/epicAllForms/MLRN1102/0/1"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  MLRN1102
                </Link>
              </li>
            </ul>
          </li>

          {/* Database Forms */}
          <li>
            <button
              className="w-full text-left py-2 px-4 bg-tc-dark-blue rounded-md font-bold text-white hover:bg-hover-tc-blue"
              onClick={() => toggleCategory("databaseForms")}
            >
              Database Forms
            </button>
            <ul
              className={`pl-4 bg-tc-dark-blue rounded-md mt-2 text-white space-y-1 transition-all duration-300 ease-in-out ${
                expandedCategory === "databaseForms"
                  ? "max-h-screen p-2"
                  : "max-h-0"
              } overflow-hidden`}
            >
              <li>
                <Link
                  to="/epicCont"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  EPICCONT
                </Link>
              </li>
              <li>
                <Link
                  to="/PARM1102"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  PARM1102
                </Link>
              </li>
            </ul>
          </li>

          {/* OPC Forms */}
          <li>
            <button
              className="w-full text-left py-2 px-4 bg-tc-dark-blue rounded-md font-bold text-white hover:bg-hover-tc-blue"
              onClick={() => toggleCategory("OPCForms")}
            >
              OPC Forms
            </button>
            <ul
              className={`pl-4 bg-tc-dark-blue rounded-md mt-2 text-white space-y-1 transition-all duration-300 ease-in-out ${
                expandedCategory === "OPCForms" ? "max-h-screen p-2" : "max-h-0"
              } overflow-hidden`}
            >
              <li>
                <Link
                  to="/renameFilesForm"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  <b>Rename File</b>
                </Link>
              </li>
              <li>
                <Link
                  to="/opcform-Form"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  OPC form
                </Link>
              </li>
              <li>
                <Link
                  to="/sitform-Form"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  SIT form
                </Link>
              </li>
              <li>
                <Link
                  to="/solform-Form"
                  className="block py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                >
                  SOL form
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-sm text-gray-400 flex-shrink-0">
        <div className="mt-4">© EPIC Studio</div>
      </div>
    </div>
  );
};

export default Sidebar;
