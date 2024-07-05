const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      product,
    },
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      products,
    },
  });
};

const getSingleProduct = async (req, res) => {
  res.send("get single product");
};

const updateProduct = async (req, res) => {
  res.send("update product");
};

const deleteProduct = async (req, res) => {
  res.send("delete product");
};

const uploadImage = async (req, res) => {
  res.send("upload product image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
