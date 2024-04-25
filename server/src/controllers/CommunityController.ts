import { Request, Response } from 'express';
import Community from '../models/Community';
import Post from '../models/Post';

export const getAllComunities = async (req: Request, res: Response) => {
  try {
    const communities = await Community.find({}).populate([
      {
        path: 'users',
        select: 'firstName',
      },
    ]);

    res.status(200).json(communities);
  } catch (error) {
    console.error('Get Communities Error:', error);
    res.statusMessage = error as string;
    return res.sendStatus(400);
  }
};

// getAllPosts from a specific community function
export const getCommunityPosts = async (req: Request, res: Response) => {
  const { communityId } = req.params;

  try {
    const posts = await Post.find(
      { community: communityId },
      'user likeCount type marker content'
    ).populate([
      { path: 'user', select: 'userName firstName lastName' },
      { path: 'marker' },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    console.error('Get Posts Error:', error);
    res.statusMessage = error as string;
    return res.sendStatus(400);
  }
};
