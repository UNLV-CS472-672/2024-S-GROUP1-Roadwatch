import { Request, Response } from 'express';
import Marker from '../models/Marker';
import Post from '../models/Post';

// GET endpoint to retrieve all markers with longitude and latitude
export const getMarkers = async (req: Request, res: Response) => {
  try {
    // Retrieve all markers from the database with projection to include only longitude and latitude
    const markers = await Marker.find({});
    return res.status(200).json(markers); // Return retrieved markers as JSON response
  } catch (err) {
    console.error('Could not get markers: ', err);
    return res.status(500).json({ message: 'Could not get markers' }); // Handle errors gracefully
  }
};

// POST endpoint to save a marker to the database
export const saveMarker = async (req: Request, res: Response) => {
  const { longitude, latitude, type } = req.body;

  // Check if longitude and latitude are provided
  if (!longitude || !latitude || !type) {
    return res
      .status(400)
      .json({ message: 'Longitude, Latitude, and Type are required' });
  }

  try {
    // Create a new marker instance and save it to the database
    const newMarker = await Marker.create({ longitude, latitude, type });
    res
      .status(201)
      .json({ message: 'Marker saved successfully', marker: newMarker }); // Respond with success message and saved marker
  } catch (err) {
    console.error('Could not save marker: ', err);
    res.status(500).json({ message: 'Could not save marker' }); // Handle errors gracefully
  }
};

// DELETE endpoint to delete a marker by Longitude and Latitude
export const deleteMarker = async (req: Request, res: Response) => {
  const { longitude, latitude } = req.body;

  // Check if longitude and latitude are provided
  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ message: 'Longitude and Latitude are required' });
  }

  try {
    // Find and delete a marker by longitude and latitude
    await Marker.findOneAndDelete({ longitude, latitude });
    res.status(200).json({ message: 'Marker deleted successfully' }); // Respond with success message
  } catch (err) {
    console.error('Could not delete user: ', err);
    res.status(500).json({ message: 'Could not delete user' }); // Handle errors gracefully
  }
};

// Function to get a post by marker ID
export const getPostByMarker = async (req: Request, res: Response) => {
  const { markerId } = req.params;

  try {
    const post = await Post.findOne({ marker: markerId });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error('Could not get post: ', err);
    return res.status(500).json({ message: 'Could not get post' });
  }
};
