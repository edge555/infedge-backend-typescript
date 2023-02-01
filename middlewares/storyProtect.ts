export {};
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import { Request, Response, NextFunction } from "express";
const UserService = require("../services/userService");
const StoryService = require("../services/storyService");
const AppError = require("../utils/appError");

const userService = new UserService();
const storyService = new StoryService();

exports.Protect = async (req: Request, res: Response, next: NextFunction) => {
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
    const userData = await userService.getUserByUserId(decoded.user.id);
    const role = userData.role;
    if (
      role != 1 &&
      req.body.authorId &&
      decoded.user.id !== req.body.authorId
    ) {
      return next(new AppError(`You don't have the permission`, 403));
    }
    if (req.params.id) {
      const storyData = await storyService.getAuthorIdByStoryId(req.params.id);
      if (!storyData) {
        return next(new AppError(`The story doesn't exist`, 401));
      }
      if (role != 1 && storyData.authorId != decoded.user.id) {
        return next(new AppError(`You don't have the permission`, 403));
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
