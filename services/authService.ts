export {};
const AuthRepository = require("../repository/authRepository");
const User = require("../database/model/user");
const Auth = require("../database/model/auth");
const AppError = require("../utils/appError");
//const bcrypt = require('bcryptjs');

class authService {
  authRepository: typeof AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }

  loginUser = async (authBody: any) => {
    const userAuthData = await this.authRepository.loginUser(authBody);
    if (!userAuthData) {
      throw new AppError("User not found", 404);
    }
    // const userData = await new UserRepository().getUserByUserId(userAuthData.id);
    // const isMatchedPassword = await bcrypt.compare(authBody.password, userAuthData.password);
    // if (!isMatchedPassword) {
    //   throw new AppError('Incorrect password', 403);
    // }
    return userAuthData;
  };

  signUpUser = async (authBody: any) => {
    const { username, name, email, password } = authBody;
    const authData = { username, email, password };
    const userData = { username, name, email };
    const user = await this.authRepository.signUpUser(authData, userData);
    return user;
  };

  getAllAuths = async () => {
    const allAuthData = await this.authRepository.getAllAuths();
    return allAuthData;
  };
  deleteAllUsers = async () => {
    await this.authRepository.deleteAllUsers();
    return null;
  };
}

module.exports = authService;
