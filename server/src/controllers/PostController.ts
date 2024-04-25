import { Request, Response } from 'express';
import Post from '../models/Post';
import Community from '../models/Community';
import Marker from '../models/Marker';

/* Used ChatGPT to understand how to write the following functions */
// The following functions are used to get all posts, delete a post, and create a post.

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

// createPost function
export const savePost = async (req: Request, res: Response) => {
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
