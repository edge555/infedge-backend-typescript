export {};

const UserService = require('../services/userService');

const userService = new UserService();
const contentNegotiate = require('../utils/sendResponse');

// Retrieve all Users from the database.
exports.getAllUsers = async (req: any, res: any, next: (arg0: unknown) => void) => {
  try {
    const usersData = await userService.getAllUsers();
    contentNegotiate.sendResponse(req, res, 200, usersData, 'Users Found', 'Success');
  } catch (error) {
    next(error);
  }
};

// Find a single User with an id
exports.getUserByUserId = async (req: { params: { id: any; }; }, res: any, next: (arg0: unknown) => void) => {
    try {
      const id = req.params.id;
      const userData = await userService.getUserByUserId(id);
      contentNegotiate.sendResponse(req, res, 200, userData, 'User Found', 'Success');
    } catch (error) {
      next(error);
    }
  };

// // Retrieve all Users from the database matching keywords
// exports.getSearchedUsers = async (req: { params: { id: any; }; }, res: any, next: (arg0: unknown) => void) => {
//   try {
//     const id = req.params.id;
    
//     const usersData = await userService.getSearchedUsers(id);
//     return usersData;
//   } catch (error) {
//     next(error);
//   }
// };



// Delete a User with the specified id
exports.deleteUserByUserId = async (req: { params: { id: any; }; }, res: any, next: (arg0: unknown) => void) => {
  try {
    const id = req.params.id;
    await userService.deleteUserByUserId(id);
    contentNegotiate.sendResponse(req, res, 204, {}, 'User Deleted', 'Success');
  } catch (error) {
    next(error);
  }
};

// Update a User by the id
exports.updateUserByUserId = async (req: { params: { id: any; }; body: any; user: { id: any; }; }, res: any, next: (arg0: unknown) => void) => {
  try {
    const id = req.params.id;
    const userBody = req.body;
    userBody.lastModifierId = 1;
    const userData = await userService.updateUserByUserId(id, userBody);
    contentNegotiate.sendResponse(req, res, 200, userData, 'User Updated', 'Success');
  } catch (error) {
    next(error);
  }
};
