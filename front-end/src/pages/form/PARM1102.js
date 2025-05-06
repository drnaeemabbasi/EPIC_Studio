import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import infoIcon from "../../assets/infoIcon.svg";

import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
import RunExepop from "../../service/run.exe";
const Parm1102Form = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState({}); // To store the initial data
  const [descriptions, setDescriptions] = useState({}); // Store descriptions
  const [expandedField, setExpandedField] = useState(null); // Track which description is expanded

  // Fetch data to populate form
  const fetchInitialValues = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/getParm1102Data`,
        {
          params: {
            formName: "PARM1102",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedData = res.data;
      const rows = fetchedData.data;
      setDescriptions(fetchedData.descriptions); // Store the descriptions

      console.log(fetchedData.descriptions);
      const newRows = {};
      for (let i = 0; i < 42; i++) {
        newRows[`newRow${i + 1}`] = rows[i] || {}; // Handle 0 to 39 (newRow1 to newRow42)
      }
      setInitialData(newRows); // Set the fetched data in state
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, []);

  // Initialize Formik
  const formik = useFormik({
    initialValues: initialData, // Set initial values dynamically
    enableReinitialize: true, // Reinitialize form values when `initialValues` changes
    onSubmit: async (values) => {
      try {
        // console.log(values);
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/updatePARM1102`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data updated successfully:", response.data);
        toast.success("Data updated successfully");

        fetchInitialValues(); // Read the data after submitting
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },
  });

  const toggleDescription = (fieldKey) => {
    if (expandedField === fieldKey) {
      setExpandedField(null); // Collapse the description
    } else {
      console.log(fieldKey);
      setExpandedField(fieldKey); // Expand the clicked description
    }
  };

  // Render form fields dynamically for each row
  const renderFields = (rowKey, row) => {
    return Object.keys(row).map((fieldKey) => {
      // if (row[fieldKey] == null) return null; // Skip null or undefined fields

      return (
        <>
          <div className="w-full md:w-1/6 px-2" key={fieldKey}>
            <div key={fieldKey} className="relative w-full">
              {/* <div className="relative w-full flex items-center border border-blue-500 rounded-lg mb-6"> */}
              <label
                htmlFor={fieldKey}
                // className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"
                className="block  font-bold mb-2 flex items-center"

                // className="block text-gray-700 font-semibold mb-2 flex"
              >
                {fieldKey}
                {descriptions[fieldKey] && (
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    onMouseOver={(e) => {
                      e.target.title = expandedField
                        ? ""
                        : descriptions[fieldKey].substring(0, 30) + "..."; // Show preview on hover if not expanded
                    }}
                  >
                    <img src={infoIcon} alt="info Icon" />

                    {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                  </span>
                )}
              </label>
              <input
                type="text"
                id={fieldKey}
                name={`${rowKey}.${fieldKey}`}
                className="w-full  px-3 py-2 border-[1px] border-gray-300 rounded-[6px] focus:outline-none focus:ring focus:border-tc-blue"
                // className="w-full p-2 pl-4 text-sm text-black focus:outline-none focus:ring focus:ring-blue-500 rounded-lg"
                // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder={`Enter ${fieldKey}`}
                value={formik.values[rowKey][fieldKey] || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => toggleDescription(fieldKey)}
              />

              {expandedField === fieldKey && (
                <div
                  id={`desc-${fieldKey}`}
                  className="absolute bg-white shadow-lg transition-all duration-300 ease-in-out rounded-lg mt-2 z-20 overflow-auto resize"
                  style={{
                    top: "100%", // Position it directly below the input field
                    left: "0",
                    transform: "translateY(10px)", // Slight offset to avoid clipping
                    width: "240px", // Initial width
                    height: "150px", // Initial height
                    minWidth: "150px", // Minimum width
                    minHeight: "100px", // Minimum height
                  }}
                >
                  <div className="relative p-4">
                    <header className="absolute top-0 right-0">
                      <button
                        type="button"
                        className="p-1 text-red-500 hover:text-red-700"
                        onClick={() => toggleDescription(fieldKey)}
                      >
                        <FontAwesomeIcon icon={faWindowClose} />
                      </button>
                    </header>
                    <p className="text-sm text-gray-700 top-10">
                      {descriptions[fieldKey]}
                    </p>
                  </div>
                </div>
              )}

              {/* Expanded description box */}
            </div>

            {formik.errors[rowKey]?.[fieldKey] &&
            formik.touched[rowKey]?.[fieldKey] ? (
              <p className="block text-red-500 text-sm">
                {formik.errors[rowKey][fieldKey]}
              </p>
            ) : null}
          </div>
          <hr className="h-1 bg-gray-700 from-gray-700 via-white to-gray-700 my-4" />
        </>
      );
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className=" flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          <div className="w-full px-6 flex justify-end mt-4">
            <RunExepop />
          </div>
          <div className="p-4">
            <div className="relative flex space-x-4">
              <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg mt-4 w-full max-w-6xl"
              >
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  PARM1102 Form
                </h2>
                <div className="flex space-x-4 mb-6">
                  <button
                    type="submit"
                    // className="w-full bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                    className="w-full font-semibold bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                    // className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    // onClick={fetchInitialValues}
                    onClick={() => {
                      toast.success("Data Read successfully");

                      fetchInitialValues();
                    }} // Re-fetch data
                    // className="w-full bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                    className="w-full font-semibold bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                    // className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Read
                  </button>
                </div>
                {/* Dynamically render sections for each newRow */}
                {[...Array(42)].map((_, index) => {
                  const rowKey = `newRow${index + 1}`;
                  return (
                    <div key={rowKey}>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Section {index + 1}
                      </h3>
                      <div className="flex flex-wrap -mx-2">
                        {renderFields(rowKey, formik.values[rowKey] || {})}
                      </div>
                    </div>
                  );
                })}

                <div className="flex space-x-4 mb-6">
                  <button
                    type="submit"
                    // className="w-full bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                    className="w-full font-semibold bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                    // className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Data Read successfully");
                      fetchInitialValues();
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth", // Smooth scrolling
                      });
                    }} // Re-fetch data
                    // className="w-full bg-tc-blue cursor-pointer text-white py-2 px-4 rounded-md hover:bg-hover-tc-blue focus:outline-none focus:hover-tc-blue"
                    className="w-full font-semibold bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                    // className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                  >
                    Read
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Bottom />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Parm1102Form;
