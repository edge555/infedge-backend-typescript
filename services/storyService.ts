import AppError from '../utils/appError';

import User from '../database/model/user';

import { StoryInput, StoryOutput } from '../database/model/story';
import StoryRepository from '../repository/storyRepository';

class StoryService {
  storyRepository: StoryRepository;

  constructor() {
    this.storyRepository = new StoryRepository();
  }

  postStory = async (
    storyBody: { title: string; description: string },
    userBody: User
  ): Promise<StoryOutput> => {
    const { title, description } = storyBody;
    const storyObj: StoryInput = {
      title,
      description,
      authorName: userBody.name,
      authorUserName: userBody.username,
      authorId: userBody.id,
      lastModifierId: userBody.id,
      lastModificationTime: new Date(),
    };
    const storyData: StoryOutput = await this.storyRepository.postStory(
      storyObj
    );
    return storyData;
  };

  getStoryByStoryId = async (storyId: number): Promise<StoryOutput> => {
    if (storyId == null) {
      throw new AppError('Bad request', 400);
    }
    const storyData: StoryOutput | null =
      await this.storyRepository.getStoryByStoryId(storyId);
    if (!storyData) {
      throw new AppError('No Story was found with that ID', 404);
    }

    return storyData;
  };

  getAllStories = async (): Promise<StoryOutput[]> => {
    const storyData: StoryOutput[] | null =
      await this.storyRepository.getAllStories();
    if (!storyData || storyData.length === 0) {
      throw new AppError('No stories found', 404);
    }
    return storyData;
  };

  getSearchedStories = async (id: string): Promise<StoryOutput[]> => {
    const storyData: StoryOutput[] | null =
      await this.storyRepository.getSearchedStories(id);
    if (!storyData || storyData.length === 0) {
      throw new AppError('No stories found', 404);
    }
    return storyData;
  };

  getAuthorIdByStoryId = async (storyId: number): Promise<number> => {
    if (storyId == null) {
      throw new AppError('Something went wrong', 500);
    }
    const authorId: number | null =
      await this.storyRepository.getAuthorIdByStoryId(storyId);
    if (authorId == null) {
      throw new AppError('No Story was found with that ID', 404);
    }
    return authorId;
  };

  updateStoryByStoryId = async (
    storyId: number,
    storyBody: { title?: string; description?: string }
  ): Promise<StoryOutput> => {
    if (storyId == null) {
      throw new AppError('Bad request', 400);
    }
    const [rowsAffected, updatedStory] =
      await this.storyRepository.updateStoryByStoryId(storyId, storyBody);
    if (rowsAffected === 0 || !updatedStory) {
      throw new AppError('No Story was found with that ID', 404);
    }
    return updatedStory;
  };

  deleteStoryByStoryId = async (storyId: number): Promise<void> => {
    if (storyId == null) {
      throw new AppError('Bad request', 400);
    }
    const storyData: StoryOutput | null =
      await this.storyRepository.getStoryByStoryId(storyId);
    if (!storyData) {
      throw new AppError('No Story was found with that ID', 404);
    }
    await this.storyRepository.deleteStoryByStoryId(storyId);
  };

  // delete later
  deleteAll = async () => {
    await this.storyRepository.deleteAll();
  };
}

export default StoryService;
