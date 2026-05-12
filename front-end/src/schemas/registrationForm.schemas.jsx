import * as Yup from "yup";

export const registration_Form_Schemas = Yup.object({
  name: Yup.string().required("Password is name"),
  age: Yup.string().required("Password is age"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  pin: Yup.string().required("PIN is required"),
});
