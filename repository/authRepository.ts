const sequelize = require("../database/dbConnect");
import securePassword from "../utils/securePassword";
import UserRepository from "../repository/userRepository";
import User, { UserOutput } from '../database/model/user';
import Auth from "../database/model/auth";
import iUserBody from "../database/model/interfaces/user/iUserBody";

class authRepository {
  // add type
  loginUser = async (authBody: { username: string; password: string }): Promise<Auth | null> => {
    const { username } = authBody;
    const userRepository = new UserRepository();
    const userInfo = await userRepository.getUserAuthByUsername(username);
    return userInfo;
  };

  signUpUser = async (
    authBody: { username: string; password: string },
    userBody: { name: string; email: string }
  ) : Promise<UserOutput | null> => {
    const transactionInstance = await sequelize.transaction();
    try {
      const { email, name } = userBody;
      const { username, password } = authBody;
      const hashedPassword = await securePassword(password);
      // add type
      const authInfo = {
        username,
        email: email,
        password: hashedPassword,
      };
      const authData = await Auth.create(authInfo, {
        transaction: transactionInstance,
      });
      const { id, createdAt } = authData;
      // add type
      const userInfo : iUserBody = {
        id,
        username,
        name,
        email,
        lastModifierId: id,
        lastModificationTime: createdAt,
        passwordLastModificationTime: createdAt,
      };
      const userData : UserOutput= await User.create(userInfo, {
        transaction: transactionInstance,
      });
      await transactionInstance.commit();
      return userData;
    } catch (err) {
      await transactionInstance.rollback();
      throw err;
    }
  };

  // delete later
  getAllAuths = async () => {
    const allAuthData = await Auth.findAll();
    return allAuthData;
  };

  deleteAllUsers = async () => {
    await User.destroy({
      truncate: true,
      cascade: false,
    });
    await Auth.destroy({
      truncate: true,
      cascade: false,
    });
  };
}

export default authRepository;
