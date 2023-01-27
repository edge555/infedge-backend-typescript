export {};
const sequelize = require("../database/dbConnect");
const securePassword = require("../utils/securePassword");
const UserRepository = require("../repository/userRepository");

const Auth = require("../database/model/auth");
const User = require("../database/model/user");

class authRepository {
  loginUser = async (authBody: any) => {
    const { username } = authBody;
    const userRepository = new UserRepository();
    const userInfo = await userRepository.getUserByUsername(username);
    return userInfo;
  };

  signUpUser = async (authBody: any, userBody: any) => {
    const transactionInstance = await sequelize.transaction();
    try {
      const { username, email, name } = userBody;
      const { password } = authBody;
      const authData = await Auth.create(authBody, {
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

  deleteAllUsers = async () => {
    
    console.log("del1");
    await User.destroy({ where: {} });
    await Auth.destroy({ where: {} });
    console.log("del2");
  };
}

module.exports = authRepository;
