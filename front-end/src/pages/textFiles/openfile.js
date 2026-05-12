import React, { useEffect, useState } from "react";
import axios from "axios";
import NotepadPopup from "../../service/nodepadFile_popup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCloud, FaFileAlt, FaWind, FaSun } from "react-icons/fa";

const Text = () => {
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [notepadContent, setNotepadContent] = useState();

  const { fileFormat } = useParams();
  const navigate = useNavigate();

  const openNotepad = async (format) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/files/${format}`
      );
      setNotepadContent(response.data);
    } catch (error) {
      console.error("Error fetching file:", error);
      alert("Failed to fetch file content");
    }
  };

  const saveNotepadContent = async (content) => {
    try {
      console.log(content);
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/files/update`,
        { content, fileFormat }
      );
      alert("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  useEffect(() => {
    if (fileFormat) {
      setIsNotepadOpen(true);
      openNotepad(fileFormat); // Proper React pattern: fetching in useEffect!
      console.log("fileFormat:", fileFormat);
    } else {
      setIsNotepadOpen(false);
    }
  }, [fileFormat]);

  return (
    <>
      <div className="w-full flex-1 max-w-[100vw] overflow-y-auto bg-slate-50">
        <div className="flex flex-col justify-start items-center w-full min-h-full p-8">
          
          <div className="max-w-4xl w-full mb-8 pt-4">
             <h2 className="text-2xl font-bold text-slate-800">Weather Files Dashboard</h2>
             <p className="text-slate-500 mt-2">Select a weather file category to view or edit its contents.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
            
            <Link to="/notepad-files/dly" className="group bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all text-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaCloud className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">DLY Form</h3>
              <p className="text-sm text-slate-500 mt-2">EPIC daily weather file (filename.DLY)</p>
            </Link>

            <Link to="/notepad-files/out" className="group bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:border-blue-300 transition-all text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaFileAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">OUT Form</h3>
              <p className="text-sm text-slate-500 mt-2">Weather output file</p>
            </Link>

            <Link to="/notepad-files/wnd" className="group bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:border-teal-300 transition-all text-center">
              <div className="w-16 h-16 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaWind className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">WND Form</h3>
              <p className="text-sm text-slate-500 mt-2">Wind weather file</p>
            </Link>

            <Link to="/notepad-files/wp1" className="group bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:border-purple-300 transition-all text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaSun className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">WP1 Form</h3>
              <p className="text-sm text-slate-500 mt-2">Weather generation parameter file</p>
            </Link>

          </div>

          <NotepadPopup
            isOpen={isNotepadOpen}
            onClose={() => {
              setNotepadContent();
              setIsNotepadOpen(false);
              navigate("/notepad-files"); 
            }}
            filename={fileFormat}
            content={notepadContent}
            onSave={saveNotepadContent}
          />
        </div>
      </div>
    </>
  );
};

export default Text;
