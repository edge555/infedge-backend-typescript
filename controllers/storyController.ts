export {};
import { Request, Response, NextFunction } from "express";
const StoryService = require("../Services/storyService");
const storyService = new StoryService();
const contentNegotiate = require("../utils/sendResponse");

// // Insert a story to database
// exports.postStory = async (req : Request, res : Response, next : NextFunction) => {
//     try {
//       const storysData = await storyService.postStory(req.body, req.user);
//       contentNegotiate.sendResponse(req, res, 201, storysData, 'Story created', 'Success');
//     } catch (error) {
//       next(error);
//     }
//   };

// Retrieve all Stories from the database.
exports.getAllStories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storysData = await storyService.getAllStories();
    contentNegotiate.sendResponse(
      req,
      res,
      200,
      storysData,
      "Stories Found",
      "Success"
    );
  } catch (error) {
    next(error);
  }
};

// // Retrieve all Stories from the database matching keyword
// exports.getSearchedStories = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const id = req.params.id;
//       const storysData = await storyService.getSearchedStories(id);
//       contentNegotiate.sendResponse(req, res, 200, storysData, 'Stories Found', 'Success');
//     } catch (error) {
//       next(error);
//     }
//   };

// Find a single Story with an id
exports.getStoryByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const storyData = await storyService.getStoryByStoryId(id);
    contentNegotiate.sendResponse(
      req,
      res,
      200,
      storyData,
      "Story Found",
      "Success"
    );
  } catch (error) {
    next(error);
  }
};

// Update a Story by the id
exports.updateStoryByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const storyBody = req.body;
    //storyBody.lastModifierId = req.user.id;
    storyBody.lastModifierId = 1;
    const storyData = await storyService.updateStoryByStoryId(id, storyBody);
    contentNegotiate.sendResponse(
      req,
      res,
      200,
      storyData,
      "Story Updated",
      "Success"
    );
  } catch (error) {
    next(error);
  }
};

// Delete a Story with the specified id
exports.deleteStoryByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    await storyService.deleteStoryByStoryId(id);
    contentNegotiate.sendResponse(
      req,
      res,
      204,
      {},
      "Story Deleted",
      "Success"
    );
  } catch (error) {
    next(error);
  }
};

// delete all Stories
exports.deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  const delData = await storyService.deleteAll();
  res.send(delData);
};
