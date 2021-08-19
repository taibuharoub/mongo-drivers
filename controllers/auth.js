import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createToken = () => {
  return jwt.sign({}, "secret", { expiresIn: "1h" });
};
