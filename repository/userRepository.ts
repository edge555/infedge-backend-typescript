export {};
const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnect');
import Auth from "../database/model/auth"
import User from "../database/model/user"
import {UserInput, UserOutput} from '../database/model/user'
const Op = Sequelize.Op;

class userRepository {
  getUserByUserId = async (userId:number) : Promise<UserOutput> => {
    const userData = await User.findByPk(userId);
    return userData;
};

  getUserByUsername = async (username:string) => {
    const userData = await Auth.findOne({ where: { username: username } });
    return userData;
  };

  getAllUsers = async () : Promise<UserOutput[]> => {
    const userData = await User.findAll();
    return userData;
  };

  getSearchedUsers = async (name:string) : Promise<UserOutput[]> => {
    const userData = await User.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: '%' + name + '%',
            },
          },
          {
            name: {
              [Op.iLike]: '%' + name + '%',
            },
          },
        ],
      },
    });
    return userData;
  };

  updateUserByUserId = async (userId:number, userBody:any) => {
    const userData = await User.update(userBody, { where: { id: userId } });
    return userData;
  };

  deleteUserByUserId = async (userId:number ) => {
    const transactionInstance = await sequelize.transaction();
    try {
      await User.destroy(
        { where: { id: userId },
          transaction: transactionInstance,
        }
      );
      await Auth.destroy(
        { where: { id: userId },
          transaction: transactionInstance,
        }
      );
      await transactionInstance.commit();
    } catch (err) {
      console.log(err);
      await transactionInstance.rollback();
    }
  };
}

module.exports = userRepository;
