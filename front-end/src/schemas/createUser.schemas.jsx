import * as Yup from "yup";

export const createUserSchemas = Yup.object({
  name: Yup.string().required("User name is required"),
  email: Yup.string().email("email is Invalid").required("email is required"),
  password: Yup.string().required("password is required"),
  confirmPassword: Yup.string()
    .required("password is required")
    .oneOf([Yup.ref("password"), null], "pasword must match"),
});
