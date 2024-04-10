const User = require("../models/User");
const { attachCookiesToResponse } = require("../utils");
const {
  StatusCodes: { CREATED, OK },
} = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  //first registered user is an admin
  req.body.role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create(req.body);
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, tokenUser });

  res.status(CREATED).json({
    status: "success",
    data: {
      message: "User registered successfully",
      user: tokenUser,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and passsword");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, tokenUser });
  res.status(OK).json({
    status: "success",
    data: {
      user: tokenUser,
    },
  });
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = {
  register,
  login,
  logout,
};
