export {};
const StoryRepository = require("../repository/storyRepository");
const AppError = require("../utils/appError");

class storyService {
  storyRepository: typeof StoryRepository;
  constructor() {
    this.storyRepository = new StoryRepository();
  }
  postStory = async (storyBody : {title : string, description : string}) => {
    const {title, description} = storyBody;
    const storyObj = {
        title,
        description,
        authorName : 'Shoaib',
        authorUserName : 'edge555',
        authorId : 1,
        lastModifierId : 1,
        lastModificationTime : Date.now()
    }
    const storyData = await this.storyRepository.postStory(storyObj);
    return storyData;
  };
  getStoryByStoryId = async (storyId: number) => {
    if (storyId == null) {
      throw new AppError("Bad request", 400);
    }
    const storyData = await this.storyRepository.getStoryByStoryId(storyId);
    if (!storyData) { 
      throw new AppError("No Story was found with that ID", 404);
    }

    return storyData;
  };
  getAllStories = async () => {
    const storyData = await this.storyRepository.getAllStories();
    if (!storyData) {
      throw new AppError("No stories found", 404);
    }
    return storyData;
  };

  getSearchedStories = async (id: number) => {
    const storyData = await this.storyRepository.getSearchedStories(id);
    if (!storyData) {
      throw new AppError("No stories found", 404);
    }
    return storyData;
  };
  updateStoryByStoryId = async (storyId: number, storyBody: any) => {
    if (storyId == null) {
      throw new AppError("Bad request", 400);
    }
    const storyData = await this.storyRepository.updateStoryByStoryId(
      storyId,
      storyBody
    );
    if (!storyData) {
      throw new AppError("No Story was found with that ID", 404);
    }
    return storyData;
  };
  deleteStoryByStoryId = async (storyId: number) => {
    if (storyId == null) {
      throw new AppError("Bad request", 400);
    }
    const storyData = await this.storyRepository.getStoryByStoryId(storyId);
    if (!storyData) {
      throw new AppError("No Story was found with that ID", 404);
    }
    await this.storyRepository.deleteStoryByStoryId(storyId);
  };

  deleteAll = async () => {
    await this.storyRepository.deleteAll();
  };
}

module.exports = storyService;
