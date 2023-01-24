import { Request, Response } from 'express';
const contentNegotiate = require('../utils/sendResponse');
const jwthandler = require('../utils/jwtHandler');
const AuthService = require('../services/authService');
const authService = new AuthService();

// Create and Save a new User
exports.signUpUser = async (req: Request, res: Response, next: (arg0: unknown) => void) => {
  try {
    const { username, name, email, password } = req.body;
    const data = {
      username,
      name,
      email,
      password,
    };
    const authData = await authService.signUpUser(data);
    contentNegotiate.sendResponse(req, res, 201, authData, 'User Created', 'Success'); 
  } catch (error) {
    next(error);
  }
};

// login a user
exports.loginUser = async (req: { body: { username: string; password: string; }; }, res: any, next: (arg0: unknown) => void) => {
  try {
    const { username, password } = req.body;
    const data = {
      username,
      password,
    };
    const userData = await authService.loginUser(data);
    jwthandler.sendResponseWithJwtToken(req, res, 200, userData, 'Logged In', 'Success');
  } catch (error) {
    next(error);
  }
};

exports.getAllAuths = async (req: any, res: { send: (arg0: any) => void; }) => {
  const allAuthData = await authService.getAllAuths();
  res.send(allAuthData);
};

exports.deleteAllUsers = async (req: any, res: { send: (arg0: any) => void; }) => {
  const delData = await authService.deleteAllUsers();
  res.send(delData);
};