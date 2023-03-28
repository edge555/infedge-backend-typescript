const router = require('express').Router();
const Auths = require('../controllers/authController');

router.route('/').get(Auths.getAllAuths);
router.route('/login').post(Auths.loginUser);
router.route('/signup').post(Auths.signUpUser);

router.route('/delete').post(Auths.deleteAllUsers);

module.exports = router;
