import { Request, Response } from 'express';
import Community from '../models/Community';

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
