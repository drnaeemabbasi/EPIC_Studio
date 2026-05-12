import { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import FormControl from "../components/FormControl.jsx";
import Input from "./../components/ui/Input.jsx";
import Label from "./../components/ui/Label.jsx";

import { createUserSchemas } from "../schemas/createUser.schemas";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBearerToken } from "./../utils/auth.utils.js";

import axios from "axios";
const UserForm = ({ selectedForm, setRegisterStatus }) => {
  const navigate = useNavigate();

  const [emailErr, setEmailErr] = useState("");
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const {
    values,
    errors,
    touched,

    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: createUserSchemas,
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/createuser`,
          values,
          {
            params: { category: selectedForm, category: selectedForm },
            headers: {
              "Content-Type": "application/json",
              Authorization: getBearerToken(),
            },
          }
        );
        if (res.data.somethingWrondErr) {
          // localStorage.removeItem("TC_AUTH_TOKEN");
          // localStorage.removeItem("userId");
          navigate("/loginform");
        }
        if (res.data.facing_err) {
          toast.warn(res.data.facing_err);

          setEmailErr(res.data.facing_err);
        } else {
          console.log("done");
          setEmailErr(null);

          setRegisterStatus(res.data);
          action.resetForm();
          // toast.success("User Add successfully");
        }
      } catch (error) {
        console.log("catch", error);
      }
    },
  });

  return (
    <>
      <div className="flex-1 rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-end justify-start py-[18px] pr-[18px] pl-6 box-border gap-[216px] min-w-[585px] max-w-full text-left text-5xl text-dark font-poppins mq450:gap-[216px] mq800:min-w-full mq1125:gap-[216px]">
        <form
          onSubmit={handleSubmit}
          className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq450:gap-[32px]"
        >
          <h3 className="m-0 font-extrabold text-2xl">User Form</h3>

          <div className="w-full grid grid-cols-2 text-base gap-5">
            {/* Name */}

            <FormControl>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name && touched.name ? (
                <p className="block text-red-500 text-sm  m-0">{errors.name}</p>
              ) : null}
            </FormControl>

            <FormControl>
              <Label>Email@</Label>
              <Input
                type="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <p className="block text-red-500 text-sm  m-0">
                  {errors.email}
                </p>
              ) : null}
              {emailErr ? (
                <p className="block text-red-500 text-sm  m-0">{emailErr}</p>
              ) : null}
            </FormControl>

            <FormControl>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && touched.password ? (
                <p className="block text-red-500 text-sm  m-0">
                  {errors.password}
                </p>
              ) : null}
            </FormControl>

            <FormControl>
              <Label>Confirm password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="block text-red-500 text-sm  m-0">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </FormControl>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer
        theme={"colored"}
        hideProgressBar={true}
        transition={Slide}
        autoClose={1500}
        pauseOnFocusLoss={false}
        style={{
          "--toastify-font-family": "Poppins",
          "--toastify-color-success": "#00CC9CFF",
          "--toastify-color-warning": "#e74c3c",
        }}
      />
    </>
  );
};

export default UserForm;
