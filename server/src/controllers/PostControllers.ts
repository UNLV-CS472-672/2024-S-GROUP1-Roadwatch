import { Request, Response } from 'express';
import Post from '../models/Post';

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

  const replyIndex = post.replies.findIndex((reply) => reply.toString() === req.params.replyId);
  if (replyIndex !== -1) {
    post.replies.splice(replyIndex, 1);
    await post.save();
  }
  res.json({ message: 'Reply deleted' });
};