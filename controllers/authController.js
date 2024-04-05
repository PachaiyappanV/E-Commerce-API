const User = require("../models/User");
const {
  StatusCodes: { CREATED, OK },
} = require("http-status-codes");

const register = async (req, res) => {
  //first registered user is an admin
  req.body.role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create(req.body);
  res.status(CREATED).json({
    status: "success",
    data: {
      message: "User registered successfully",
      user,
    },
  });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = {
  register,
  login,
  logout,
};
