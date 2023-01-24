const UserRepository = require('../repository/userRepository');


class userService {
  userRepository: typeof UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  getUserByUserId = async (userId:number) => {
    if (userId == null) {
      throw new Error;
    }
    const userData = await this.userRepository.getUserByUserId(userId);
    if (!userData) {
        throw new Error;
    }
    
    return userData;
  };
  getAllUsers = async () => {
    const userData = await this.userRepository.getAllUsers();
    if (!userData) {
        throw new Error;
    }
    return userData;
  };

  getSearchedUsers = async (id:number) => {
    const userData = await this.userRepository.getSearchedUsers(id);
    if (!userData) {
        throw new Error;
    }
    
    return userData;
  };
  updateUserByUserId = async (userId:number, userBody:any) => {
    if (userId == null) {
        throw new Error;
    }
    const userData = await this.userRepository.updateUserByUserId(userId, userBody);
    if (!userData) {
        throw new Error;
    }
    return userData;
  };
  deleteUserByUserId = async (userId:number) => {
    if (userId == null) {
        throw new Error;
    }
    const userData = await this.userRepository.getUserByUserId(userId);
    if (!userData) {
        throw new Error;
    }
    await this.userRepository.deleteUserByUserId(userId);
  };
  
}

module.exports = userService;
