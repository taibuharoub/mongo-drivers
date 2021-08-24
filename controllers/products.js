/* eslint-disable no-unused-vars */
import { MongoClient, Decimal128 } from "mongodb";
import { products } from "../utils/products.js";

// const MongoClient = mongodb.MongoClient;

export const getProducts = (req, res, next) => {
  /* const queryPage = req.query.page;
  const pageSize = 5;
  let resultProducts = [...products];
  if (queryPage) {
    resultProducts = products.slice(
      (queryPage - 1) * pageSize,
      queryPage * pageSize
    );
  } */
  MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
      const products = [];
      client
        .db()
        .collection("products")
        .find()
        .forEach((productDoc) => {
          productDoc.price = productDoc.price.toString();
          products.push(productDoc);
        })
        .then((result) => {
          client.close();
          res.status(200).json(products);
        })
        .catch((err) => {
          console.log(err);
          client.close();
          res.status(500).json({ message: "An Error occured!" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An Error occured!" });
    });
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
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    // price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
      client
        .db()
        .collection("products")
        .insertOne(newProduct)
        .then((result) => {
          console.log(result);
          client.close();
          res
            .status(201)
            .json({ message: "Product added", productId: result.insertedId });
        })
        .catch((err) => {
          console.log(err);
          client.close();
          res.status(500).json({ message: "An Error occured!" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An Error occured!" });
    });
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
