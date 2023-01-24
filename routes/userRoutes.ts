const router = require('express').Router();
const Users = require('../controllers/userController');
router.route('/').get(Users.getAllUsers);

router
  .route('/:id')
  .get(Users.getUserByUserId)
  .put(Users.updateUserByUserId)
  .delete(Users.deleteUserByUserId);

module.exports = router;
