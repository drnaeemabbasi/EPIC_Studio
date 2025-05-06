import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import axios from "axios";
import RunExepop from "../../service/run.exe";
import { headers as headersConfig } from "../../service/main.model.js";
import NotepadPopup from "../../service/nodepadFile_popup";
import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Text = () => {
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [notepadContent, setNotepadContent] = useState();
  const [fileName, setFileName] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { fileFormat } = useParams();
  // if (fileFormat) {
  //   setFileName(fileFormat);
  // }
  const navigate = useNavigate();
  const openNotepad = async (fileFormat) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/files/${fileFormat}`
      );

      setNotepadContent(response.data);
    } catch (error) {
      console.error("Error fetching file:", error);
      alert("Failed to fetch file content");
    }
  };
  if (fileFormat) {
    // setFileName(fileFormat);
    openNotepad(fileFormat);
  }
  const saveNotepadContent = async (content) => {
    try {
      console.log(content);
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/files/update`,
        // `${process.env.REACT_APP_API_BASE_URL}/files/update`,
        { content, fileFormat } // Pass the updated content to the backend
      );
      alert("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
      // alert("Failed to save file content");
    }
  };

  useEffect(() => {
    if (fileFormat) {
      setIsNotepadOpen(true);

      console.log("fileFormat", fileFormat);
    }
  }, [fileFormat]);
  return (
    <>
      <div className="flex">
        <Sidebar openNotepad={openNotepad} />

        <div className="flex flex-col justify-start items-start w-full bg-gray-100 ">
          <Header />
          <table className="table-auto border-collapse w-full text-sm text-left shadow-md rounded-md overflow-hidden">
            {/* Table Header */}
            <thead className="bg-tc-dark-blue text-white text-center">
              <tr>
                <th className="px-4 py-2 border-b">Form Name</th>
                <th className="px-4 py-2 border-b">Descriptions</th>
                <th className="px-4 py-2 border-b">View</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white">
              <tr className="hover:bg-gray-100">
                {/* Form Name Column */}
                <td
                  width="20%"
                  className="px-4 py-2 border-b font-medium break-words"
                >
                  EPIC daily weather file (filename.DLY)
                </td>

                {/* Description Column */}
                <td className="px-2 py-2 border-b text-justify break-words relative">
                  {/* Truncated Description */}
                  <div className="line-clamp-2 ">
                    File format: two spaces, 3 fields of 4 characters each
                    (integers), 7 fields of 6 characters each (floating). Daily
                    weather data can be used in two ways: First, it can be
                    directly used in EPIC simulation when the length of the
                    simulation is the same or less than the historical daily
                    weather. Second, in general, the historical daily weather
                    data can be used to generate monthly weather data using the
                    WXPM program, which then is used to generate EPIC weather
                    input data directly by the EPIC model or using the WXGN
                    weather generator. Both WXPM and WXGN are available at the
                    EPIC/APEX software page of the BREC website. Daily weather
                    data is maintained in separate files named filename.DLY.
                    These files must be listed in the EPIC daily weather list
                    file WDLSTCOM.DAT (or user-defined name) with a unique
                    reference number, which corresponds to the variable IWTH in
                    the run file EPICRUN.DAT. Each day of the time series takes
                    one line of the daily weather file. A continuous series of
                    dates is required. Leap years can be consistently considered
                    or ignored and variable LPYR in the EPIC control file must
                    be set accordingly. Elements included in the daily weather
                    file are listed below.
                  </div>

                  {/* Info Icon */}
                  <div className="absolute right-1 top-0 text-gray-500 cursor-pointer hover:text-gray-800">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      onClick={() => setShowFullDescription(true)}
                    />
                  </div>

                  {/* Full Description Modal */}
                </td>

                {/* View Column */}
                <td
                  width="15%"
                  className="px-4 bg-hover-tc-blue py-2 border-b text-blue-500 cursor-pointer hover:underline text-center"
                  aria-label="View File"
                >
                  <Link
                    to="/notepad-files/dly"
                    // className="block  py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                    className="w-full  text-white flex items-center justify-between px-4 py-2 text-left font-bold rounded-sm hover:bg-tc-dark-blue"
                  >
                    DLY Form
                  </Link>
                  {/* View */}
                </td>
              </tr>
            </tbody>
          </table>
          {showFullDescription && (
            <div className="relative left-0 top-0 w-full bg-white text-black p-4 border rounded-md shadow-md z-10 max-h-60 overflow-auto">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Full Description</h2>
                <FontAwesomeIcon
                  icon={faWindowClose}
                  className="text-gray-500 cursor-pointer hover:text-red-500"
                  onClick={() => setShowFullDescription(false)}
                />
              </div>
              File format: two spaces, 3 fields of 4 characters each (integers),
              7 fields of 6 characters each (floating). Daily weather data can
              be used in two ways: First, it can be directly used in EPIC
              simulation when the length of the simulation is the same or less
              than the historical daily weather. Second, in general, the
              historical daily weather data can be used to generate monthly
              weather data using the WXPM program, which then is used to
              generate EPIC weather input data directly by the EPIC model or
              using the WXGN weather generator. Both WXPM and WXGN are available
              at the EPIC/APEX software page of the BREC website. Daily weather
              data is maintained in separate files named filename.DLY. These
              files must be listed in the EPIC daily weather list file
              WDLSTCOM.DAT (or user-defined name) with a unique reference
              number, which corresponds to the variable IWTH in the run file
              EPICRUN.DAT. Each day of the time series takes one line of the
              daily weather file. A continuous series of dates is required. Leap
              years can be consistently considered or ignored and variable LPYR
              in the EPIC control file must be set accordingly. Elements
              included in the daily weather file are listed below.
            </div>
          )}
          {/* <ul
            className={`pl-4 space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out 
            
            `}
          >
            <li>
              <Link
                to="/notepad-files/dly"
                // className="block  py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                className="w-full bg-tc-blue text-white flex items-center justify-between px-4 py-2 text-left font-bold rounded-sm hover:bg-tc-dark-blue"
              >
                DLY Form
              </Link>
            </li>
            <li>
              <Link
                to="/notepad-files/out"
                // className="block  py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                className="w-full bg-tc-blue text-white flex items-center justify-between px-4 py-2 text-left font-bold rounded-sm hover:bg-tc-dark-blue"
              >
                OUT Form
              </Link>
            </li>
            <li>
              <Link
                to="/notepad-files/wnd"
                className="w-full bg-tc-blue text-white flex items-center justify-between px-4 py-2 text-left font-bold rounded-sm hover:bg-tc-dark-blue"
              >
                WND Form
              </Link>
            </li>
            <li>
              <Link
                to="/notepad-files/wp1"
                // className="block  py-1 px-2 hover:bg-hover-tc-blue rounded-md"
                className="w-full bg-tc-blue text-white flex items-center justify-between px-4 py-2 text-left font-bold rounded-sm hover:bg-tc-dark-blue"
              >
                WP1 Form
              </Link>
            </li>
          </ul> */}

          <div>
            {/* Existing Sidebar Code */}
            <NotepadPopup
              isOpen={isNotepadOpen}
              onClose={() => {
                setNotepadContent();
                navigate(-1); // Navigates back to the previous page in the browser's history
                setIsNotepadOpen(false);
              }}
              filename={fileFormat}
              content={notepadContent}
              onSave={saveNotepadContent}
            />
          </div>
          <Bottom />
        </div>
      </div>
    </>
  );
};

export default Text;
