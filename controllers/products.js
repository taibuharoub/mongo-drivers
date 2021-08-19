/* eslint-disable no-unused-vars */
import { products } from "../utils/products.js";

export const getProducts = (req, res, next) => {
  // Return a list of dummy products
  // Later, this data will be fetched from MongoDB
  const queryPage = req.query.page;
  const pageSize = 5;
  let resultProducts = [...products];
  if (queryPage) {
    resultProducts = products.slice(
      (queryPage - 1) * pageSize,
      queryPage * pageSize
    );
  }
  res.status(200).json(resultProducts);
};

export const getProduct = (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  if (!product) {
    const error = new Error(`No product found with that id ${req.params.id}`);
    error.statusCode = 422;
    throw error;
  }
  res.status(200).json(product);
};

export const postProduct = (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  console.log(newProduct);
  res.status(201).json({ message: "Product added", productId: "DUMMY" });
};

export const updateProduct = (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  console.log(updatedProduct);
  res.status(200).json({ message: "Product updated", productId: "DUMMY" });
};

export const deleteProduct = (req, res, next) => {
  res.status(200).json({ message: "Product deleted" });
};
