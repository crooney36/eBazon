import express from "express";
import jwt from "jsonwebtoken";
import { requireUser } from "./utils.js";
import {
  createProduct,
  getAllProducts,
  getProductByID,
} from "../db/products.js";

export const productsRouter = express.Router();
export default productsRouter;

productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next();
});

// GET /api/products/
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send({
      products,
    });
  } catch ({ name, message }) {
    next({
      name: "Error fetching allProducts",
      message: "Could not fetch all products. ",
    });
  }
});

// GET /api/products/id
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await getProductByID(id);
    console.log(product);
    res.send({
      product,
    });
  } catch ({ name, message }) {
    next({
      name: "Error fetching product by ID",
      message: "Could not fetch product. ",
    });
  }
});

// POST /api/products/createProduct
productsRouter.post("/createProduct", async (req, res, next) => {
  // console.log("Request body: ", req.body);
  console.log("^^^");
  try {
    console.log("Request body: ", req.body);
    console.log(req.user, "username***");
    const seller_name = req.user.username;
    const { name, description, price, dimensions, quantity, tags } = req.body;
    console.log(
      name,
      seller_name,
      description,
      price,
      dimensions,
      quantity,
      tags,
      "&&&"
    );
    const product = await createProduct({
      name,
      seller_name,
      description,
      price,
      dimensions,
      quantity,
      tags,
    });
    res.send({ product });
  } catch ({ name, message }) {
    next({
      name: "ErrorCreatingProduct",
      message: "Error Creating Product",
    });
  }
});

productsRouter.post("/:id/addTags", requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    console.log(tags);
    await addTagsToProduct(id, tags);
    const product = await getProductByID(id);
    if (product) {
      res.send(product);
    } else {
      next({
        name: "ProductNotFoundError",
        message: "A product was not found with this id",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
