const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/sendResponse');
const signToken = (userBody: { id: any; username: any; passwordLastModificationTime: any; }) => {
  return jwt.sign({ user: userBody }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.sendResponseWithJwtToken = (req: any, res: any, statuscode: any, userData: { token?: any; id?: any; username?: any; passwordLastModificationTime?: any; }, message: any, status: any) => {
  const { id, username, passwordLastModificationTime } = userData;
  const tokenInfo = {
    id,
    username,
    passwordLastModificationTime,
  };
  console.log('tokenInfo '+ JSON.stringify(tokenInfo));
  const token = signToken(tokenInfo);
  userData.token = token;
  console.log(token);
  sendResponse(req, res, statuscode, userData, message, status);
};
