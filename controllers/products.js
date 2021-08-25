/* eslint-disable no-unused-vars */
import { Decimal128, ObjectId } from "mongodb";
import * as db from "../utils/dbDrive2.js";
// import { products } from "../utils/products.js";

// const MongoClient = mongodb.MongoClient;

export const getProducts = (req, res, next) => {
  const queryPage = req.query.page;
  const pageSize = 1;
  // let resultProducts = [...products];
  // if (queryPage) {
  //   resultProducts = products.slice(
  //     (queryPage - 1) * pageSize,
  //     queryPage * pageSize
  //   );
  // }
  const products = [];
  db.getDb()
    .db()
    .collection("products")
    .find()
    // .sort({ price: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach((productDoc) => {
      productDoc.price = productDoc.price.toString();
      products.push(productDoc);
    })
    .then((result) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An Error occured!" });
    });
};

export const getProduct = (req, res, next) => {
  db.getDb()
    .db()
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((productDoc) => {
      productDoc.price = productDoc.price.toString(); //since its 128bit decimal
      res.status(200).json(productDoc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An Error occured!" });
    });
};

export const postProduct = (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    // price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  db.getDb()
    .db()
    .collection("products")
    .insertOne(newProduct)
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: "Product added", productId: result.insertedId });
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
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  db.getDb()
    .db()
    .collection("products")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: updatedProduct,
      } //coz updateProduct is alradly an object
    )
    .then((result) => {
      res
        .status(200)
        .json({ message: "Product updated", productId: req.params.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An Error occured!" });
    });
};

export const deleteProduct = (req, res, next) => {
  db.getDb()
    .db()
    .collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json({ message: "Product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An Error occured!" });
    });
};
