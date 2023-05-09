import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse';

import User from '../database/model/user';
import StoryService from '../services/storyService';
const storyService = new StoryService();

interface MyUserRequest extends Request {
  user: User;
}

// Insert a story to database
export const postStory = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storyData = await storyService.postStory(req.body, req.user);
    sendResponse(req, res, 201, storyData, 'Story created', 'Success');
  } catch (error) {
    next(error);
  }
};

// Find a single Story with an id
export const getStoryByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const storyData = await storyService.getStoryByStoryId(id);
    sendResponse(req, res, 200, storyData, 'Story Found', 'Success');
  } catch (error) {
    next(error);
  }
};

// Retrieve all Stories from the database.
export const getAllStories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storysData = await storyService.getAllStories();
    sendResponse(req, res, 200, storysData, 'Stories Found', 'Success');
  } catch (error) {
    next(error);
  }
};

// Retrieve all Stories from the database matching keyword
export const getSearchedStories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storysData = await storyService.getSearchedStories(req.params.id);
    sendResponse(req, res, 200, storysData, 'Stories Found', 'Success');
  } catch (error) {
    next(error);
  }
};

// Update a Story by the id
export const updateStoryByStoryId = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const storyBody = req.body;
    storyBody.lastModifierId = req.user.id;
    const storyData = await storyService.updateStoryByStoryId(id, storyBody);
    sendResponse(req, res, 200, storyData, 'Story Updated', 'Success');
  } catch (error) {
    next(error);
  }
};

// Delete a Story with the specified id
export const deleteStoryByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    await storyService.deleteStoryByStoryId(id);
    sendResponse(req, res, 204, {}, 'Story Deleted', 'Success');
  } catch (error) {
    next(error);
  }
};

// delete all Stories
export const deleteAll = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const delData = await storyService.deleteAll();
  res.send(delData);
};
