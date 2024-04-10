require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//database
const { connectDB } = require("./db/connect");

//routers
const authRouter = require("./routes/authRoutes");

//middleware
const { notFoundMiddleware } = require("./middleware/not-found");
const { errorHandlerMiddleware } = require("./middleware/errorhandler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/api/v1", (req, res) => {
  console.log(req.cookies);
  res.send("e commerce");
});
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  app.get("/", (req, res) => {
    res.send("hello from home");
  });
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
