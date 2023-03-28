import { Router } from "express";
const Stories = require("../controllers/storyController");
const userMiddleware = require("../middlewares/userProtect");
const storyMiddleware = require("../middlewares/storyProtect");

const router = Router();

router
  .route("/")
  .get(Stories.getAllStories)
  .post(userMiddleware.Protect, Stories.postStory);

router.route("/search/:id").get(Stories.getSearchedStories);

router
  .route("/:id")
  .get(Stories.getStoryByStoryId)
  .put(
    userMiddleware.Protect,
    storyMiddleware.Protect,
    Stories.updateStoryByStoryId
  )
  .delete(
    userMiddleware.Protect,
    storyMiddleware.Protect,
    Stories.deleteStoryByStoryId
  );

//delete later
router.route("/deleteall").post(Stories.deleteAll);

export default router;
