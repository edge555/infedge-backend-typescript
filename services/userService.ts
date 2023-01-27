export {};
const UserRepository = require("../repository/userRepository");
const AppError = require("../utils/appError");

class userService {
  userRepository: typeof UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  getUserByUserId = async (userId: number) => {
    if (userId == null) {
      throw new AppError("Bad request", 400);
    }
    const userData = await this.userRepository.getUserByUserId(userId);
    if (!userData) { 
      throw new AppError("No User was found with that ID", 404);
    }

    return userData;
  };
  getAllUsers = async () => {
    const userData = await this.userRepository.getAllUsers();
    if (!userData) {
      throw new AppError("No users found", 404);
    }
    return userData;
  };

  getSearchedUsers = async (id: number) => {
    const userData = await this.userRepository.getSearchedUsers(id);
    if (!userData) {
      throw new AppError("No users found", 404);
    }
    return userData;
  };
  updateUserByUserId = async (userId: number, userBody: any) => {
    if (userId == null) {
      throw new AppError("Bad request", 400);
    }
    const userData = await this.userRepository.updateUserByUserId(
      userId,
      userBody
    );
    if (!userData) {
      throw new AppError("No User was found with that ID", 404);
    }
    return userData;
  };
  deleteUserByUserId = async (userId: number) => {
    if (userId == null) {
      throw new AppError("Bad request", 400);
    }
    const userData = await this.userRepository.getUserByUserId(userId);
    if (!userData) {
      throw new AppError("No User was found with that ID", 404);
    }
    await this.userRepository.deleteUserByUserId(userId);
  };
}

module.exports = userService;
