export {};
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import { Request, Response, NextFunction } from "express";
const UserService = require("../services/userService");
const AppError = require("../utils/appError");
import User from "../database/model/user";
const userService = new UserService();

interface MyUserRequest extends Request {
  user: User;
}

exports.Protect = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access", 401)
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await userService.getUserByUserId(decoded.user.id);
    if (!freshUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist",
          401
        )
      );
    }
    const passwordChanged = await userService.changedPasswordAfter(
      decoded.iat,
      decoded.user.passwordLastModificationTime
    );
    if (passwordChanged) {
      return next(new AppError("Password changed, Please log in again", 401));
    }
    req.user = freshUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.isAuthorized = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserByUserId(req.params.id);
    if (!user) {
      return next(new AppError("No user was found with that ID", 404));
    }
    if (req.user.role != 1 && user.username !== req.user.username) {
      return next(new AppError(`You don't have the permission`, 403));
    }
    next();
  } catch (error) {
    next(error);
  }
};
