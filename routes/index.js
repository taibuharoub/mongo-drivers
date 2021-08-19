/* eslint-disable no-unused-vars */
import productRoutes from "./products.js";

export default (app) => {
  // app.get("/", (req, res, next) => {
  //   res.status(200).json({ message: "From Mongo shell to Drivers" });
  // });
  app.use("/products", productRoutes);
};
