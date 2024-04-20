import { Request, Response } from 'express';
import Post from '../models/Post';

// getAllPosts function
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find({});
    
        res.status(200).json({ data: posts });
        } catch (error) {
        console.error('Get Posts Error:', error);
        res.statusMessage = error as string;
        return res.sendStatus(400);
    }
};

// getPostById function
export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
    
        res.status(200).json({ data: post });
        } catch (error) {
        console.error('Get Post Error:', error);
        res.statusMessage = error as string;
        return res.sendStatus(400);
    }
}

// createPost function
export const createPost = async (req: Request, res: Response) => {
    const {
        community,
        user,
        type,
        content,
        marker
      } = req.body;

    try {


        // Validate the request
        if (!community || !user || !type || !content) {
            res.statusMessage = 'Bad request, missing required fields.';
            return res.sendStatus(400);
        }

        // Validate Marker
        if (type === 'marker' && !marker) {
            res.statusMessage = 'Bad request, missing marker ID for marker post';
            return res.sendStatus(400);
        }

        const post = await Post.create({
            community,
            user,
            type,
            content,
            marker: type === 'marker' ? marker : undefined,
            likeCount: 0
        });

        res.status(201).json({ data: post });
        } catch (error) {
        console.error('Create Post Error:', error);
        res.statusMessage = error as string;
        return res.sendStatus(400);
    }
}
