export {};
const router = require("express").Router();
const Stories = require("../controllers/storyController");
router.route("/").get(Stories.getAllStories);

router
  .route("/:id")
  .get(Stories.getStoryByStoryId)
  .put(Stories.updateStoryByStoryId)
  .delete(Stories.deleteStoryByStoryId);

module.exports = router;
