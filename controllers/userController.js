const getAllUsers = async (req, res) => {
  res.send("getallusers");
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
