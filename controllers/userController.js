const User = require("../models/User");
const {
  StatusCodes: { OK },
} = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermission,
} = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(OK).json({
    status: "success",
    data: {
      users,
    },
  });
};
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user found with id ${userId}`);
  }
  checkPermission(req.user, user._id.toString());
  res.status(OK).json({
    status: "success",
    data: {
      user,
    },
  });
};
const showCurrentUser = async (req, res) => {
  res.status(OK).json({
    status: "sucess",
    data: {
      currentUser: req.user,
    },
  });
};
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.name = name;
  user.email = email;
  await user.save();
  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ res, tokenUser });
  res.status(OK).json({
    status: "success",
    data: {
      user: tokenUser,
    },
  });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;
  await user.save();

  res.status(OK).json({
    status: "success",
    message: "Password Successfully Updated",
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
