import { Request, Response, NextFunction } from "express";
import {sendResponse} from "../utils/sendResponse";
import { sendResponseWithJwtToken } from "../utils/jwtHandler";

import AuthService from "../services/authService";
const authService = new AuthService();

// Create and Save a new User
export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, name, email, password } = req.body;
    const data = {
      username,
      name,
      email,
      password,
    };
    const authData = await authService.signUpUser(data);
    sendResponse(
      req,
      res,
      201,
      authData,
      "User Created",
      "Success"
    );
  } catch (error) {
    next(error);
  }
};

// login a user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const data = {
      username,
      password,
    };
    const userData = await authService.loginUser(data);
    sendResponseWithJwtToken(
      req,
      res,
      200,
      userData,
      "Logged In",
      "Success"
    );
  } catch (error) {
    next(error);
  }
};

// delete later
export const getAllAuths = async (req: Request, res: Response) => {
  const allAuthData = await authService.getAllAuths();
  res.send(allAuthData);
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  const delData = await authService.deleteAllUsers();
  res.send(delData);
};
