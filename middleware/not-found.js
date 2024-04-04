const notFound = (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route does not exist",
  });
};

module.exports = {
  notFound,
};
