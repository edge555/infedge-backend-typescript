import { Router } from "express";
const Users = require("../controllers/userController");
const userMiddleware = require("../middlewares/userProtect");

const router = Router();

router.route("/").get(Users.getAllUsers);
router.route('/search/:id').get(Users.getSearchedUsers);

router
  .route("/:id")
  .get(Users.getUserByUserId)
  .put(
    userMiddleware.Protect,
    userMiddleware.isAuthorized,
    Users.updateUserByUserId
  )
  .delete(
    userMiddleware.Protect,
    userMiddleware.isAuthorized,
    Users.deleteUserByUserId
  );

module.exports = router;
