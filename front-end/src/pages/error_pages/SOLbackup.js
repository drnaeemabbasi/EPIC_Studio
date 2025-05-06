import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SOLForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [formbackupMainData, setFormBackupMainData] = useState({});

  const [formMainData, setFormMainData] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);

  const [expandedField, setExpandedField] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch form data
  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/databseFiles/fetchSOLFormData`,
        { params: { formName: props.formName || "SOLForm" } }
      );
      setFormData(response.data.data.rows || []);
      setFormMainData(response.data.data.mainData || {});
      setFormBackupMainData(response.data.data.mainData || {});

      setDescriptions(response.data.descriptions || {});
    } catch (err) {
      toast.error("Failed to fetch form data");
      navigate("/epicAllForms/EPICRUN/0/1");
    } finally {
      setIsLoading(false);
    }
  };

  // Update form data
  const updateFormData = async (event) => {
    event.preventDefault();
    try {
      const fullFormData = { formData, formMainData };
      console.log(fullFormData);
      // await axios.put(
      //   `${process.env.REACT_APP_API_BASE_URL}/databseFiles/updateSOLFormData`,
      //   { formData }
      // );
      toast.success("Data updated successfully");
    } catch (error) {
      toast.error("Failed to update data");
    }
  };

  // Handle input changes
  const handleInputChange = (event, rowIndex, fieldName) => {
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [fieldName]: event.target.value,
      };
      return updatedData;
    });
  };

  // Toggle description display
  const toggleDescription = useCallback((fieldName) => {
    setExpandedField((prev) => (prev === fieldName ? null : fieldName));
  }, []);

  const handlePreviousClick = () => {
    setCurrentColumnIndex(currentColumnIndex - 1);
    setFormMainData(formbackupMainData); // Update formMainData to empty values
  };
  const handleNextClick = () => {
    console.log(currentColumnIndex);
    if (currentColumnIndex + 1 < Object.keys(formMainData).length) {
      setCurrentColumnIndex(currentColumnIndex + 1);
    } else {
      // Create empty rows with the same field names
      const emptyData = Object.keys(formMainData).reduce((acc, column) => {
        acc[column] = Object.keys(formMainData[column]).reduce(
          (subAcc, field) => {
            subAcc[field] = ""; // Assign empty string as the value
            return subAcc;
          },
          {}
        );
        return acc;
      }, {});
      setFormMainData(emptyData); // Update formMainData to empty values
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const renderFields = (fields, section) =>
    Object.entries(fields).map(([key, value], index) => (
      <div key={index} className="mb-2">
        <label
          htmlFor={`${section}-${key}`}
          className="block text-gray-700 font-semibold mb-2 flex items-center"
        >
          {key}
          {descriptions[key] && (
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              onClick={() => toggleDescription(key)}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
          )}
        </label>
        <input
          id={`${section}-${key}`}
          type="text"
          value={value || ""}
          onChange={(e) => handleInputChange(e, section, key)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        {expandedField === key && (
          <div
            id={`desc-${key}`}
            className="absolute bg-gray-100 transition-all duration-400 rounded-md shadow-lg p-4 mt-2 z-10 w-full"
          >
            <p>{descriptions[key]}</p>
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 cursor-pointer"
              onClick={() => toggleDescription(key)}
            >
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
          </div>
        )}
      </div>
    ));

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          <div className="p-4 w-full max-w-6xl">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <form
                onSubmit={updateFormData}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  SOL Form
                </h2>
                {/* Rows Section */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Rows
                </h3>
                {formData.map((row, rowIndex) => (
                  <div key={rowIndex} className="mb-6 border-b pb-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-2">
                      Row {rowIndex + 1}
                    </h4>
                    <div
                      key={rowIndex}
                      className={`grid ${
                        rowIndex === 0 ? "grid-cols-2" : "grid-cols-10"
                      } gap-4 `}
                    >
                      {renderFields(row, `rows-${rowIndex}`)}
                    </div>
                  </div>
                ))}

                {/* Main Data Section */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Main Data
                </h3>

                {Object.entries(formMainData).map(
                  ([column, fields], colIndex) => (
                    <div
                      key={colIndex}
                      className={`mb-6 border-b pb-4 ${
                        colIndex === currentColumnIndex ? "block" : "hidden"
                      }`} // Only show current column
                    >
                      <h4 className="text-md font-semibold text-gray-700 mb-2">
                        {column.toUpperCase()}
                      </h4>
                      <div className="grid grid-cols-10 gap-4">
                        {renderFields(fields, `mainData-${column}`)}
                      </div>
                    </div>
                  )
                )}

                <div className="flex justify-end space-x-4 mt-5">
                  <button
                    type="button"
                    onClick={handlePreviousClick}
                    className="bg-gray-300 cursor-pointer text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="bg-gray-300 cursor-pointer text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={fetchFormData}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Read
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
          <Bottom />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SOLForm;
