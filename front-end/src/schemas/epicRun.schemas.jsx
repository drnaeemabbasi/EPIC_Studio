import * as Yup from "yup";

export const epicRunSchemas = Yup.object({
  ASTN: Yup.string().required("ASTN is required"),
  INPS: Yup.string().required("INPS is required"),
  IOPS: Yup.string().required("IOPS is required"),
  ISIT: Yup.string().required("ISIT is required"),
  IWND: Yup.string().required("IWND is required"),
  IWTH: Yup.string().required("IWND is required"),
  IWP1: Yup.string().required("IWP1 is required"),
  IWP5: Yup.string().required("IWP5 is required"),
});
