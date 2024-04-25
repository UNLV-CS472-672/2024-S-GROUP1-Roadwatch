import { Request, Response } from 'express';
import Post from '../models/Post';

/* Used ChatGPT to understand how to write the following functions */
// The following functions are used to get all posts, delete a post, and create a post.

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

// deletePost function
export const deletePost = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        if (!id) {
            res.statusMessage = 'Bad request, missing post ID.';
            return res.sendStatus(400);
        }

        await Post.findByIdAndDelete(id);

        res.sendStatus(204); // Returns no content, 204 status meaning success.
        } catch (error) {
        console.error('Delete Post Error:', error);
        res.statusMessage = error as string;
        return res.sendStatus(400);
    }
};

// createPost function
export const savePost = async (req: Request, res: Response) => {
    const {
        community,
        user,
        type,
        content,
        marker
      } = req.body;

    try {

        /* These validations were suggested and writen by ChatGPT */
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
        /* End of ChatGPT code */

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
