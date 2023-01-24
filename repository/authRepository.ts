export {};
const sequelize = require('../database/dbConnect');
// const securePassword = require('../Utils/securePassword');
const UserRepository = require('../repository/userRepository');

const Auth = require('../database/model/auth');
const User = require('../database/model/user');

class authRepository {
  loginUser = async (authBody:any) => {
    const { username } = authBody;
    const userRepository = new UserRepository();
    const userInfo = await userRepository.getUserByUsername(username);
    return userInfo;
  };

  signUpUser = async (authBody:any, userBody:any) => {
    try {
      const { username, email, name } = userBody;
      const authData = await Auth.create(authBody);
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
      const userData = await User.create(userInfo);
      return userData;
    } catch (err) {
      throw err;
    }
  };

  getAllAuths = async () => {
    const allAuthData = await Auth.findAll();
    return allAuthData;
  };

  deleteAllUsers = async () => {
    // bug
    await User.destroy({
      where: {},
      truncate: true
    });
    await Auth.destroy({
      where: {},
      truncate: true
    });
  };
}

module.exports = authRepository;
