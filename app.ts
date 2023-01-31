require("dotenv").config();
import express from "express";
import cors from "cors";
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const storyRouter = require("./routes/storyRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorHandler");

const app = express();
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/story", storyRouter);

const db = require("./database/dbconfig");
db();

app.get("/", (req, res, next) => {
  res.writeHead(200);
  res.send("Hello world");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
