const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import iUserBodyToken from "../database/model/interfaces/user/iUserBodyToken";
const { sendResponse } = require("../utils/sendResponse");


const signToken = (userBody: iUserBodyToken): string => {
  return jwt.sign({ user: userBody }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
};

export const sendResponseWithJwtToken = (
  req: Request,
  res: Response,
  statuscode: number,
  userData: iUserBodyToken,
  message: string,
  status: string
) => {
  const { id, username, passwordLastModificationTime } = userData;
  const tokenInfo: iUserBodyToken = {
    id,
    username,
    passwordLastModificationTime,
  };
  const token = signToken(tokenInfo);
  userData.token = token;
  console.log(token);
  sendResponse(req, res, statuscode, userData, message, status);
};
