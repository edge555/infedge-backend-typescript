export {};
const sequelize = require("../database/dbConnect");
const securePassword = require("../utils/securePassword");
const UserRepository = require("../repository/userRepository");

import Auth from "../database/model/auth";
import User from "../database/model/user";

class authRepository {
  loginUser = async (authBody: { username: string; password: string }) => {
    const { username } = authBody;
    const userRepository = new UserRepository();
    const userInfo = await userRepository.getUserByUsername(username);
    return userInfo;
  };

  signUpUser = async (
    authBody: { username: string; password: string },
    userBody: { name: string; email: string }
  ) => {
    const transactionInstance = await sequelize.transaction();
    try {
      const { email, name } = userBody;
      const { username, password } = authBody;
      const hashedPassword = await securePassword(password);
      const authInfo = {
        username,
        email: email,
        password: hashedPassword,
      };
      const authData = await Auth.create(authInfo, {
        transaction: transactionInstance,
      });
      const { id, createdAt } = authData;
      const userInfo = {
        id,
        username,
        name,
        email,
        lastModifierId: id,
        lastModificationTime: createdAt,
        passwordLastModificationTime: createdAt,
      };
      const userData = await User.create(userInfo, {
        transaction: transactionInstance,
      });
      await transactionInstance.commit();
      return userData;
    } catch (err) {
      await transactionInstance.rollback();
      throw err;
    }
  };

  getAllAuths = async () => {
    const allAuthData = await Auth.findAll();
    return allAuthData;
  };

  deleteAllUsers = async (): Promise<void> => {
    await User.destroy({ where: {} });
    await Auth.destroy({ where: {} });
  };
}

module.exports = authRepository;
