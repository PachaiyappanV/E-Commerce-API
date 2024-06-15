const User = require("../models/User");
const {
  StatusCodes: { OK },
} = require("http-status-codes");
const { NotFoundError } = require("../errors");

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
  res.send("updateuser");
};
const updateUserPassword = async (req, res) => {
  res.send("updateuserpassword");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
