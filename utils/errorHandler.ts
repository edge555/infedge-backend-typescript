export {};
const AppError = require("../utils/appError");
import { Request, Response, NextFunction } from "express";

const handleSequelizeUniqueConstraintError = (message: string) =>
  new AppError(message, 401);
const handleSequelizeValidationError = (message: string) =>
  new AppError(message, 401);
const handleSequelizeDatabaseError = (message: string) =>
  new AppError(message, 401);

const sendError = (
  err: {
    isOperational: boolean;
    statusCode: number;
    status: string;
    message: string;
  },
  res: Response
) => {
  console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
module.exports = (
  err: {
    statusCode: number;
    status: string;
    name: string;
    errors: { message: string }[];
    message: string;
    isOperational: boolean;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "SequelizeUniqueConstraintError")
    err = handleSequelizeUniqueConstraintError(err.errors[0].message);
  if (err.name === "SequelizeValidationError")
    err = handleSequelizeValidationError(err.errors[0].message);
  if (err.name === "SequelizeDatabaseError")
    err = handleSequelizeDatabaseError("Database Error");

  sendError(err, res);
};
