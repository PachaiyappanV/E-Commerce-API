require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//database
const { connectDB } = require("./db/connect");

//middleware
const { notFound } = require("./middleware/not-found");
const { errorHandlerMiddleware } = require("./middleware/errorhandler");

app.get("/", (req, res) => {
  res.send("hello from home");
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is up and listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
