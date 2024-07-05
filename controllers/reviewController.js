const Product = require("../models/Product");
const Review = require("../models/Review");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new BadRequestError("Already submitted review for this product");
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      review,
    },
  });
};

const getAllReviews = async (req, res) => {
  res.send("get all review");
};

const getSingleReview = async (req, res) => {
  res.send("get single  review");
};

const updateReview = async (req, res) => {
  res.send("update review");
};

const deleteReview = async (req, res) => {
  res.send("delete review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
