const User = require("../models/User");
const {
  StatusCodes: { OK },
} = require("http-status-codes");

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
  res.send("getsingleuser");
};
const showCurrentUser = async (req, res) => {
  res.send("showcurrentuser");
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
