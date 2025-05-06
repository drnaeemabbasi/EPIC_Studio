import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { epicRunSchemas } from "../../schemas/epicRun.schemas";
import Header from "../../header/header";
import Bottom from "../../header/bottom";
import axios from "axios";

const SimpleForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitialValues = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fetchedData = res.data;
      // Populate form values with fetched data
      formik.setValues({
        ASTN: fetchedData.ASTN || "",
        INPS: fetchedData.INPS || "",
        IOPS: fetchedData.IOPS || "",
        ISIT: fetchedData.ISIT || "",
        IWND: fetchedData.IWND || "",
        IWP1: fetchedData.IWP1 || "",
        IWP5: fetchedData.IWP5 || "",
        IWTH: fetchedData.IWTH || "",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, []);

  const formik = useFormik({
    initialValues: {
      ASTN: "",
      INPS: "",
      IOPS: "",
      ISIT: "",
      IWND: "",
      IWP1: "",
      IWP5: "",
      IWTH: "",
    },
    validationSchema: epicRunSchemas,
    enableReinitialize: true, // Enable formik to reinitialize with new values when data is fetched
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/epicRunFileRouter/updateData/`, // Assuming you have an ID for the record
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data updated successfully:", response.data);
        fetchInitialValues();

        // actions.resetForm(); // Optional: Reset form after submission
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg mt-8"
        >
          {/* Row 1 */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="ASTN"
                className="block text-gray-700 font-semibold mb-2"
              >
                ASTN
              </label>
              <input
                type="text"
                id="ASTN"
                name="ASTN"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter ASTN"
                value={formik.values.ASTN}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.ASTN && formik.touched.ASTN ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.ASTN}
                </p>
              ) : null}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="ISIT"
                className="block text-gray-700 font-semibold mb-2"
              >
                ISIT
              </label>
              <input
                type="text"
                id="ISIT"
                name="ISIT"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter ISIT"
                value={formik.values.ISIT}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.ISIT && formik.touched.ISIT ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.ISIT}
                </p>
              ) : null}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="IWP1"
                className="block text-gray-700 font-semibold mb-2"
              >
                IWP1
              </label>
              <input
                type="text"
                id="IWP1"
                name="IWP1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter IWP1"
                value={formik.values.IWP1}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.IWP1 && formik.touched.IWP1 ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.IWP1}
                </p>
              ) : null}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="IWP5"
                className="block text-gray-700 font-semibold mb-2"
              >
                IWP5
              </label>
              <input
                type="text"
                id="IWP5"
                name="IWP5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter IWP5"
                value={formik.values.IWP5}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.IWP5 && formik.touched.IWP5 ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.IWP5}
                </p>
              ) : null}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="IWND"
                className="block text-gray-700 font-semibold mb-2"
              >
                IWND
              </label>
              <input
                type="text"
                id="IWND"
                name="IWND"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter IWND"
                value={formik.values.IWND}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.IWND && formik.touched.IWND ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.IWND}
                </p>
              ) : null}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="INPS"
                className="block text-gray-700 font-semibold mb-2"
              >
                INPS
              </label>
              <input
                type="text"
                id="INPS"
                name="INPS"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter INPS"
                value={formik.values.INPS}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.INPS && formik.touched.INPS ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.INPS}
                </p>
              ) : null}
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label
                htmlFor="IOPS"
                className="block text-gray-700 font-semibold mb-2"
              >
                IOPS
              </label>
              <input
                type="text"
                id="IOPS"
                name="IOPS"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter IOPS"
                value={formik.values.IOPS}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.IOPS && formik.touched.IOPS ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.IOPS}
                </p>
              ) : null}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="IWTH"
                className="block text-gray-700 font-semibold mb-2"
              >
                IWTH
              </label>
              <input
                type="text"
                id="IWTH"
                name="IWTH"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter IWTH"
                value={formik.values.IWTH}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.IWTH && formik.touched.IWTH ? (
                <p className="block text-red-500 text-sm">
                  {formik.errors.IWTH}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Update
              </button>
            </div>
            {/* New Read button with onClick */}
            <div className="w-1/2">
              <button
                type="button"
                onClick={fetchInitialValues} // Attach the onClick handler
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                // className="w-full bg-green-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >
                Read
              </button>
            </div>
          </div>
        </form>
      </div>
      <Bottom />
    </>
  );
};

export default SimpleForm;
