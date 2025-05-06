import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { epicContSchemas } from "../../schemas/epicCont.schemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import Sidebar from "../../header/sidebar";
import RunExepop from "../../service/run.exe";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import infoIcon from "../../assets/infoIcon.svg";

const EpicCont = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [descriptions, setDescriptions] = useState({}); // Store descriptions
  const [expandedField, setExpandedField] = useState(null); // Track which description is expanded
  // Fetch data to populate form
  const fetchInitialValues = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/epicCount`,
        {
          params: {
            formName: "EPICCONT",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedData = res.data;
      console.log(fetchedData.row7 || {});
      // Set fetched data into formik values
      formik.setValues({
        row1: fetchedData.row1 || {},
        row2: fetchedData.row2 || {},
        row3: fetchedData.row3 || {},
        row4: fetchedData.row4 || {},
        row5: fetchedData.row5 || {},
        row6: fetchedData.row6 || {},
        row7: fetchedData.row7 || {},
      });
      setDescriptions(fetchedData.descriptions); // Store the descriptions

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, []);

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      row1: {},
      row2: {},
      row3: {},
      row4: {},
      row5: {},
      row6: {},
      row7: {},
    },
    // validationSchema: epicContSchemas,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/updateData/epicCont`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data updated successfully:", response.data);
        toast.success("Data updated successfully");

        fetchInitialValues(); // Refresh form with updated values if necessary
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

  // Render form fields dynamically
  const renderFields = (rowKey, row) => {
    return Object.keys(row).map((fieldKey) => (
      <div className="w-full md:w-1/4 px-2" key={fieldKey}>
        <div key={fieldKey} className="relative w-full">
          {/* <div className="relative w-full flex items-center border border-blue-500 rounded-lg mb-6"> */}
          <label
            htmlFor={fieldKey}
            // className="block text-gray-700 font-semibold mb-2 flex"
            className="block  font-bold mb-2 flex items-center"

            // className="absolute -top-2 left-4 bg-white px-1 text-sm font-bold text-black"
          >
            {fieldKey}

            {descriptions[fieldKey] && (
              <span
                className="ml-2 text-blue-500 cursor-pointer "
                onMouseOver={(e) => {
                  e.target.title = expandedField
                    ? ""
                    : descriptions[fieldKey].substring(0, 30) + "..."; // Show preview on hover if not expanded
                }}
              >
                {/* <FontAwesomeIcon icon={faInfoCircle} />
                 */}
                <img src={infoIcon} alt="info Icon" />
              </span>
              // <span
              //   className="ml-2 text-tc-dark-blue cursor-pointer"
              //   // onClick={() => toggleDescription(fieldName)}
              //   onMouseOver={(e) => {
              //     e.target.title = expandedField
              //       ? ""
              //       : descriptions[fieldKey].substring(0, 30) + "..."; // Show preview on hover if not expanded
              //   }}
              // >
              //   <img src={infoIcon} alt="info Icon" />
              // </span>
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
        </div>

        {formik.errors[rowKey]?.[fieldKey] &&
        formik.touched[rowKey]?.[fieldKey] ? (
          <p className="block text-red-500 text-sm">
            {formik.errors[rowKey][fieldKey]}
          </p>
        ) : null}
      </div>
    ));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col justify-center items-center w-full bg-gray-100">
          <Header />
          {/* <RunExepop /> */}

          <div className="w-full px-6 flex justify-end mt-4">
            <RunExepop />
          </div>

          <div className="p-4">
            <div className="relative flex space-x-4 ">
              <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg mt-8 w-full max-w-6xl"
              >
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  EPICCONT Form
                </h2>
                <div className="flex space-x-4 mb-6">
                  <div className="w-1/2">
                    <button
                      type="submit"
                      className="w-full font-semibold bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                      // className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Update
                    </button>
                  </div>
                  <div className="w-1/2">
                    <button
                      type="button"
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
                </div>
                {/* Line One */}
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Line One
                </h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  {renderFields("row1", formik.values.row1)}
                </div>

                {/* Line Two */}
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Line Two
                </h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  {renderFields("row2", formik.values.row2)}
                </div>

                {/* Line Three */}
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Line Three
                </h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  {renderFields("row3", formik.values.row3)}
                </div>

                {/* Line Four */}
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Line Four
                </h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  {renderFields("row4", formik.values.row4)}
                </div>

                {/* Line Five */}
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Line Five
                </h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  {renderFields("row5", formik.values.row5)}
                </div>

                {/* Line Six */}
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Line Six
                </h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  {renderFields("row6", formik.values.row6)}
                </div>

                {/* Line Seven */}
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  Line Seven
                </h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  {renderFields("row7", formik.values.row7)}
                </div>

                <div className="flex space-x-4 mb-6">
                  <div className="w-1/2">
                    <button
                      type="submit"
                      className="w-full font-semibold bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                      // className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                      Update
                    </button>
                  </div>
                  <div className="w-1/2">
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
                      className="w-full font-semibold bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"

                      // className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                    >
                      Read
                    </button>
                  </div>
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

export default EpicCont;
