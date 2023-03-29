const sequelize = require('../database/dbConnect');
import { Op } from 'sequelize';

import Auth from '../database/model/auth';
import User, { UserOutput } from '../database/model/user';

class UserRepository {
  getUserByUserId = async (userId: number): Promise<UserOutput | null> => {
    const userData = await User.findByPk(userId);
    return userData ? (userData.toJSON() as UserOutput) : null;
  };

  getAllUsers = async (): Promise<UserOutput[] | null> => {
    const userData = await User.findAll();
    return userData.map((user) => user.toJSON() as UserOutput);
  };

  getSearchedUsers = async (name: string): Promise<UserOutput[] | null> => {
    const userData = await User.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      },
    });
    return userData.map((user) => user.toJSON() as UserOutput);
  };

  getUserAuthByUsername = async (username: string): Promise<Auth | null> => {
    const userData = await Auth.findOne({ where: { username } });
    return userData;
  };

  updateUserByUserId = async (
    userId: number,
    userBody: { name?: string; email?: string }
  ): Promise<[number, UserOutput[]]> => {
    const userData = await User.update(userBody, {
      where: { id: userId },
      returning: true,
    });
    return userData;
  };

  deleteUserByUserId = async (userId: number): Promise<void> => {
    const transactionInstance = await sequelize.transaction();
    try {
      await User.destroy({
        where: { id: userId },
        transaction: transactionInstance,
      });
      await Auth.destroy({
        where: { id: userId },
        transaction: transactionInstance,
      });
      await transactionInstance.commit();
    } catch (err) {
      console.log(err);
      await transactionInstance.rollback();
    }
  };
}

export default UserRepository;
