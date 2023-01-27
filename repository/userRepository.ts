export {};
const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnect');
const Auth = require('../database/model/auth');
const User = require('../database/model/user');
import {UserInput, UserOutput} from '../database/model/user'
const Op = Sequelize.Op;

class userRepository {
  getUserByUserId = async (userId:any) : Promise<UserOutput> => {
    if (Number.isInteger(parseInt(userId))) {
        const userData = await User.findByPk(parseInt(userId));
        if (userData) {
            return userData;
        }
    }
    const userData = await User.findOne({ where: { username: userId } });
    return userData;
};

  getUserByUsername = async (username:string) : Promise<UserOutput> => {
    const userData = await Auth.findOne({ where: { username: username } });
    return userData;
  };

  getAllUsers = async () : Promise<UserOutput[]> => {
    const userData = await User.findAll();
    return userData;
  };

  getSearchedUsers = async (id:string) : Promise<UserOutput[]> => {
    
    const userData = await User.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: '%' + id + '%',
            },
          },
          {
            name: {
              [Op.iLike]: '%' + id + '%',
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
        { where: { id: userId } },
        {
          transaction: transactionInstance,
        }
      );
      await Auth.destroy(
        { where: { id: userId } },
        {
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
