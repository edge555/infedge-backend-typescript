import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse';

import User from '../database/model/user';
import UserService from '../services/userService';
const userService = new UserService();

interface MyUserRequest extends Request {
  user: User;
}

// Find a single User with an id
export const getUserByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const userData = await userService.getUserByUserId(id);
    sendResponse(req, res, 200, userData, 'User Found', 'Success');
  } catch (error) {
    next(error);
  }
};

// Retrieve all Users from the database.
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const usersData = await userService.getAllUsers();
    sendResponse(req, res, 200, usersData, 'Users Found', 'Success');
  } catch (error) {
    next(error);
  }
};

// Retrieve all Users from the database matching keywords
export const getSearchedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const name = req.params.id;
    const usersData = await userService.getSearchedUsers(name);
    sendResponse(req, res, 200, usersData, 'Users Found', 'Success');
  } catch (error) {
    next(error);
  }
};

// Update a User by the id
export const updateUserByUserId = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const userBody = req.body;
    userBody.lastModifierId = req.user.id;
    const userData = await userService.updateUserByUserId(id, userBody);
    sendResponse(req, res, 200, userData, 'User Updated', 'Success');
  } catch (error) {
    next(error);
  }
};

// Delete a User with the specified id
export const deleteUserByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    await userService.deleteUserByUserId(id);
    sendResponse(req, res, 204, {}, 'User Deleted', 'Success');
  } catch (error) {
    next(error);
  }
};
