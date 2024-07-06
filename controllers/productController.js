const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../errors");
const path = require("path");
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
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");

  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      product,
    },
  });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      product,
    },
  });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Success! Product removed.",
  });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: { image: `/uploads/${productImage.name}` },
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
