const router = require('express').Router();
const Users = require('../controllers/userController');
router.route('/').get(Users.getAllUsers);

router
  .route('/:id')
  .get(Users.getUserByUserId)
  .put(Users.updateUserByUserId)
  

module.exports = router;
