const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
} = require("../controllers/ProductController"); 
const { verifyToken } = require("../middlewares/verifytoken"); 

const ProductRouter = express.Router();

ProductRouter.post("/product", verifyToken, createProduct);
ProductRouter.put("/product/:id", verifyToken, updateProduct);
ProductRouter.delete("/product/:id", verifyToken, deleteProduct);
ProductRouter.get("/product", getAllProducts);
ProductRouter.get("/product/:id", getProductById);

module.exports = ProductRouter;
