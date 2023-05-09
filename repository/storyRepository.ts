import { Op } from 'sequelize';

import Story, { StoryOutput } from '../database/model/story';
import iStoryBody from '../database/model/interfaces/story/iStoryBody';

class StoryRepository {
  async postStory(storyBody: iStoryBody): Promise<StoryOutput> {
    const storyData = await Story.create(storyBody);
    return storyData.toJSON() as StoryOutput;
  }

  async getStoryByStoryId(storyId: string): Promise<StoryOutput | null> {
    const storyData = await Story.findByPk(storyId);
    return storyData?.toJSON() as StoryOutput | null;
  }

  async getAllStories(): Promise<StoryOutput[]> {
    const storyData = await Story.findAll();
    return storyData.map((story) => story.toJSON() as StoryOutput);
  }

  async getSearchedStories(id: string): Promise<StoryOutput[]> {
    const storyData = await Story.findAll({
      where: {
        [Op.or]: [
          {
            authorName: {
              [Op.like]: '%' + id + '%',
            },
          },
          {
            title: {
              [Op.like]: '%' + id + '%',
            },
          },
        ],
      },
    });
    return storyData.map((story) => story.toJSON() as StoryOutput);
  }

  async getAuthorIdByStoryId(storyId: string): Promise<string | null> {
    const storyData = await Story.findByPk(storyId);
    return storyData?.authorId || null;
  }

  async updateStoryByStoryId(
    storyId: string,
    storyBody: { title?: string; description?: string }
  ): Promise<[number, StoryOutput]> {
    const storyData = await Story.update(storyBody, { where: { id: storyId } });
    const updatedStoryData = await this.getStoryByStoryId(storyId);
    return [storyData[0], updatedStoryData as StoryOutput];
  }

  async deleteStoryByStoryId(storyId: string): Promise<number> {
    const rowsDeleted = await Story.destroy({ where: { id: storyId } });
    return rowsDeleted;
  }

  async deleteAll(): Promise<number> {
    const rowsDeleted = await Story.destroy({
      truncate: true,
    });
    return rowsDeleted;
  }
}

export default StoryRepository;
