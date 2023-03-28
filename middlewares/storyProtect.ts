const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import { Request, Response, NextFunction } from "express";
import User from "../database/model/user";
import StoryService from "../services/storyService";
const storyService = new StoryService();
import UserService from "../services/userService";
const userService = new UserService();
const AppError = require("../utils/appError");

interface MyUserRequest extends Request {
  user: User;
}
export const Protect = async (req: MyUserRequest, res: Response, next: NextFunction) => {
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
      const id = parseInt(req.params.id);
      const authorId = await storyService.getAuthorIdByStoryId(id);
      if (!authorId) {
        return next(new AppError(`The story doesn't exist`, 401));
      }
   
      if (role != 1 && authorId != decoded.user.id) {
        return next(new AppError(`You don't have the permission`, 403));
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
