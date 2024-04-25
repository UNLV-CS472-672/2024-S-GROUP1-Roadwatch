import { Request, Response } from 'express';
import Post from '../models/Post';
import Marker from '../models/Marker';
import Community from '../models/Community';

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId).populate('replies');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
};

export const getReplies = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId).populate('replies');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post.replies);
};

export const addReply = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  post.replies.push(req.body.replyId);
  await post.save();
  res.json(post);
};

export const deleteReply = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const replyIndex = post.replies.findIndex(
    (reply) => reply.toString() === req.params.replyId
  );
  if (replyIndex !== -1) {
    post.replies.splice(replyIndex, 1);
    await post.save();
  }
  res.json({ message: 'Reply deleted' });
};

// createPost function
export const createPost = async (req: Request, res: Response) => {
  const { community, user, type, content, marker } = req.body;

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

    let postMarker;
    if (type === 'marker') {
      postMarker = await Marker.create({
        longitude: marker.longitude,
        latitude: marker.latitude,
        type: marker.type,
      });
    }

    const post = await Post.create({
      community,
      user,
      type,
      content,
      marker: type === 'marker' ? postMarker?._id : undefined,
      likeCount: 0,
    });

    const postCommunity = await Community.findById(community);
    console.log(postCommunity);
    const updatedPostIds = postCommunity?.posts.concat([post._id]);
    await Community.updateOne({ _id: community }, { posts: updatedPostIds });

    res.status(201).json({ data: post });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.statusMessage = error as string;
    return res.sendStatus(400);
  }
};

// deletePost function
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

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
