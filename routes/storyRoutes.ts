export {};
const router = require("express").Router();
const Stories = require("../controllers/storyController");
router.route("/").get(Stories.getAllStories).post(Stories.postStory);

router
  .route("/:id")
  .get(Stories.getStoryByStoryId)
  .put(Stories.updateStoryByStoryId)
  .delete(Stories.deleteStoryByStoryId);

router.route('/deleteall').post(Stories.deleteAll);

module.exports = router;
