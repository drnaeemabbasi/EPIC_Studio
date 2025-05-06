import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

const issueJWT = (payload) => {
  const token = jwt.sign(payload, process.env.AUTH_JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};

export { issueJWT };
