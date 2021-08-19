/* eslint-disable no-unused-vars */
import path from "path";
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import configRoutes from "./routes/index.js";

const __dirname = path.resolve();
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/images", express.static(path.join(__dirname, "images")));
server.use(cors());
server.use(compression());

configRoutes(server);

server.use((req, res, next) => {
  const error = new Error("The Resource not Found!");
  error.statusCode = 422;
  throw error;
});

server.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

export default server;
