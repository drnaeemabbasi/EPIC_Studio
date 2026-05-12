import { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registration_Form_Schemas } from "../schemas/registrationForm.schemas";

import { setToken } from "./../utils/auth.utils.js";

const initialValues = {
  name: "",
  age: "",
  email: "",
  password: "",
  pin: "",
};
const RegistrationForm = () => {
  const navigate = useNavigate();

  const [RegistrationStatus, setRegistrationStatus] = useState("");
  useEffect(() => {
    if (RegistrationStatus == "user is registred") {
      navigate("/");
      console.log("something");
    }
  }, [RegistrationStatus]);
  const RegistrationData = async (values, action) => {
    try {
      console.log("res.data.user");

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Registration`,
        values
      );
      if (res.data.err) {
        console.log(res.data.err);
        setRegistrationStatus(res.data.err);
      } else {
        console.log(res.data);

        const userData = res.data.user;

        localStorage.setItem("userId", userData.id); // Store user ID in local storage

        setToken(res.data.token, userData.id);
        console.log(localStorage.getItem("TC_AUTH_TOKEN"));
        action.resetForm();
        setRegistrationStatus(res.data.message); // Update login status with the message from response
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    } finally {
      console.log("Login attempt finished.");
    }
  };
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registration_Form_Schemas,
      onSubmit: async (values, action) => {
        RegistrationData(values, action);
        // console.log("values", values);
      },
    });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mt-8"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center">
            <div className="mb-4 ml-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                ${errors.name && touched.name && "border-red-500"}
                `}
                type="text"
                autoComplete="off"
                id="name"
                name="name"
                placeholder="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <p className="block text-red-500 text-sm  m-0">{errors.name}</p>
              ) : null}
            </div>

            <div className="mb-4 ml-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                ${errors.age && touched.age && "border-red-500"}
                `}
                type="number"
                autoComplete="off"
                id="age"
                name="age"
                placeholder="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.age && touched.age ? (
                <p className="block text-red-500 text-sm  m-0">{errors.age}</p>
              ) : null}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                ${errors.email && touched.email && "border-red-500"}
                `}
              type="email"
              autoComplete="off"
              id="email"
              name="email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="block text-red-500 text-sm  m-0">{errors.email}</p>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
                errors.password && touched.password && "border-red-500"
              }
              `}
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="block text-red-500 text-sm  m-0">
                {errors.password}
              </p>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Portal PIN
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
                errors.pin && touched.pin && "border-red-500"
              }
              `}
              type="pin"
              name="pin"
              id="pin"
              autoComplete="off"
              placeholder="PIN"
              value={values.pin}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.pin && touched.pin ? (
              <p className="block text-red-500 text-sm  m-0">{errors.pin}</p>
            ) : null}
          </div>
          {RegistrationStatus && (
            <div className="mt-4 text-center">
              <p className="text-red-500">{RegistrationStatus}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
