import React from "react";
// import logo from "./logo.svg";
import "./global.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/registration.js"; // Make sure the path and case are correct
import SimpleForm from "./pages/form/epicRun.js";
import EpicCont from "./pages/form/epicCont.js";
import PARM1102 from "./pages/form/PARM1102.js";
import RenameFiles from "./pages/form/renameFiles.js";
import OPCForm from "./pages/form/OPCForm.js";
import EpicAllForms from "./pages/form/epicAllForm.js";
import Error404 from "./pages/error_pages/404.js";
import SITForm from "./pages/form/SITForm.js";
import SOLForm from "./pages/form/SOlForm.js";
import Text from "./pages/textFiles/openfile.js";

// import Epic

import TableWithPopup from "./pages/form/firstForm_dataTable.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/EpicAllForms/EPICRUN/0/1" />} />{" "}
        <Route path="/registration" element={<Registration />} />{" "}
        <Route path="/epicRun" element={<SimpleForm />} /> {/* JSX here */}
        <Route path="/epicCont" element={<EpicCont />} /> {/* JSX here */}
        <Route path="/parm1102" element={<PARM1102 />} /> {/* JSX here */}
        <Route path="/opcform-Form" element={<OPCForm />} /> {/* JSX here */}
        <Route path="/sitform-Form" element={<SITForm />} />{" "}
        <Route path="/solform-Form" element={<SOLForm />} /> {/* JSX here */}
        <Route path="/renameFilesForm" element={<RenameFiles />} />{" "}
        {/* <Route path="/notepad-files/:fileFormat" element={<Text />} />{" "} */}
        {/* JSX here */}
        <Route path="/table" element={<TableWithPopup />} /> {/* JSX here */}
        <Route
          path="/EpicAllForms"
          element={<Navigate to="/EpicAllForms/EPICRUN/0/1" />}
        />{" "}
        <Route
          path="/EpicAllForms/:formName/:startingPoint/:endingPoint"
          element={<EpicAllForms />}
        />{" "}
        <Route path="/notepad-files/:fileFormat" element={<Text />} />{" "}
        {/* JSX here */}
        <Route path="/error404" element={<Error404 />} /> {/* JSX here */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
