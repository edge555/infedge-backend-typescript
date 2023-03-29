import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/sendResponse');

import iUserBodyToken from '../database/model/interfaces/user/iUserBodyToken';

const signToken = (userBody: iUserBodyToken): string => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT environment variables not defined');
  }
  return jwt.sign({ user: userBody }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
