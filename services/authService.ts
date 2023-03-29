import AuthRepository from "../repository/authRepository";
import UserRepository from "../repository/userRepository";
import AppError from "../utils/appError";
import bcrypt from "bcryptjs";
import { UserOutput } from '../database/model/user';

class AuthService {
  authRepository:   AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }
  
  loginUser = async (
    authBody: { username: string; password: string }
  ): Promise<UserOutput | null> => {
    const userAuthData = await this.authRepository.loginUser(authBody);
    if (!userAuthData) {
      throw new AppError("User not found", 404);
    }
    const userData = await new UserRepository().getUserByUserId(
      userAuthData.id
    );
    const isMatchedPassword = await bcrypt.compare(
      authBody.password,
      userAuthData.password
    );
    if (!isMatchedPassword) {
      throw new AppError("Incorrect password", 403);
    }
    return userData;
  };

  signUpUser = async (authBody: {
    username: string;
    name: string;
    email: string;
    password: string;
  }): Promise<UserOutput | null> => {
    const { username, name, email, password } = authBody;
    const authData = { username, password };
    const userData = { name, email };
    const user : UserOutput = await this.authRepository.signUpUser(authData, userData);
    return user;
  };

  // delete later
  getAllAuths = async () => {
    const allAuthData = await this.authRepository.getAllAuths();
    return allAuthData;
  };

  deleteAllUsers = async (): Promise<void> => {
    await this.authRepository.deleteAllUsers();
    return null;
  };
}

export default AuthService;
