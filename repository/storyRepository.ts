export {};
const Sequelize = require("sequelize");
const sequelize = require("../database/dbConnect");
import Story from "../database/model/story";
import iStoryBody from "../database/model/interfaces/story/iStoryBody";
import { StoryInput, StoryOutput } from "../database/model/story";
const Op = Sequelize.Op;

class storyRepository {
  constructor() {}
  postStory = async (storyBody: iStoryBody) => {
    const storyData = await Story.create(storyBody);
    return storyData;
  };
  getStoryByStoryId = async (storyId: number): Promise<StoryOutput> => {
    const storyData = await Story.findByPk(storyId);
    return storyData;
  };

  getAllStories = async (): Promise<StoryOutput[]> => {
    const storyData = await Story.findAll();
    return storyData;
  };

  getSearchedStories = async (id: number): Promise<StoryOutput[]> => {
    const storyData = await Story.findAll({
      where: {
        [Op.or]: [
          {
            authorName: {
              [Op.like]: "%" + id + "%",
            },
          },
          {
            title: {
              [Op.like]: "%" + id + "%",
            },
          },
        ],
      },
    });
    return storyData;
  };
  updateStoryByStoryId = async (storyId: number, storyBody: iStoryBody) => {
    const storyData = await Story.update(storyBody, { where: { id: storyId } });
    return storyData;
  };

  deleteStoryByStoryId = async (storyId: number): Promise<void> => {
    await Story.destroy({ where: { id: storyId } });
  };

  getAuthorIdByStoryId = async (storyId: number) => {
    const storyData = await Story.findByPk(storyId);
    return storyData;
  };

  // delete later
  deleteAll = async () => {
    await Story.destroy({
      truncate: true,
    });
  };
}

module.exports = storyRepository;
