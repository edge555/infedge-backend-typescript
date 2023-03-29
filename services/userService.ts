import AppError from '../utils/appError';

import { UserOutput } from '../database/model/user';
import UserRepository from '../repository/userRepository';

class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserByUserId = async (userId: number): Promise<UserOutput> => {
    if (userId == null) {
      throw new AppError('Bad request', 400);
    }
    const userData = await this.userRepository.getUserByUserId(userId);
    if (!userData) {
      throw new AppError('No User was found with that ID', 404);
    }

    return userData;
  };

  getAllUsers = async (): Promise<UserOutput[]> => {
    const userData = await this.userRepository.getAllUsers();
    if (!userData || userData.length === 0) {
      throw new AppError('No users found', 404);
    }
    return userData;
  };

  getSearchedUsers = async (name: string): Promise<UserOutput[]> => {
    const userData = await this.userRepository.getSearchedUsers(name);
    if (!userData || userData.length === 0) {
      throw new AppError('No users found', 404);
    }
    return userData;
  };

  updateUserByUserId = async (
    userId: number,
    userBody: { name?: string; email?: string }
  ): Promise<[number, UserOutput[]]> => {
    if (userId == null) {
      throw new AppError('Bad request', 400);
    }
    const userData = await this.userRepository.updateUserByUserId(
      userId,
      userBody
    );
    if (!userData[1] || userData[1].length === 0) {
      throw new AppError('No User was found with that ID', 404);
    }
    return userData;
  };

  deleteUserByUserId = async (userId: number): Promise<void> => {
    if (userId == null) {
      throw new AppError('Bad request', 400);
    }
    const userData = await this.userRepository.getUserByUserId(userId);
    if (!userData) {
      throw new AppError('No User was found with that ID', 404);
    }
    await this.userRepository.deleteUserByUserId(userId);
  };

  changedPasswordAfter = async (
    JWTTimeStamp: number,
    passwordChangedAt: string
  ) => {
    if (passwordChangedAt) {
      const timestamp = Math.floor(Date.parse(passwordChangedAt) / 1000);
      return JWTTimeStamp < timestamp;
    }
    return false;
  };
}

export default UserService;
