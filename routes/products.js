import express from "express";
import {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router();

router.route("/").get(getProducts).post(postProduct);
router.route("/:id").get(getProduct);
router.route("/:id").patch(updateProduct);

export default router;
