const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/sendResponse");
const signToken = (userBody: {
  id: number;
  username: string;
  passwordLastModificationTime: Date;
}) => {
  return jwt.sign({ user: userBody }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.sendResponseWithJwtToken = (
  req: any,
  res: any,
  statuscode: number,
  userData: {
    token?: string;
    id: number;
    username: string;
    passwordLastModificationTime: Date;
  },
  message: string,
  status: string
) => {
  const { id, username, passwordLastModificationTime } = userData;
  const tokenInfo = {
    id,
    username,
    passwordLastModificationTime,
  };
  const token = signToken(tokenInfo);
  userData.token = token;
  console.log(token);
  sendResponse(req, res, statuscode, userData, message, status);
};
