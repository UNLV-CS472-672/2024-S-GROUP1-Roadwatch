import { Request, Response } from 'express';
import Marker from '../models/Marker';

// GET endpoint to retrieve all markers with longitude and latitude
export const getMarkers = async (req: Request, res: Response) => {
    try {
        // Retrieve all markers from the database with projection to include only longitude and latitude
        const markers = await Marker.find({}, 'longitude latitude');
        return res.status(200).json(markers); // Return retrieved markers as JSON response
    } catch (err) {
        console.error('Could not get markers: ', err);
        return res.status(500).json({ message: 'Internal server error' }); // Handle errors gracefully
    }
};

// POST endpoint to save a marker to the database
export const saveMarker = async (req: Request, res: Response) => {
    const { longitude, latitude } = req.body;

    // Check if longitude and latitude are provided
    if (!longitude || !latitude) {
        return res.status(400).json({ message: 'Longitude and Latitude are required' });
    }

    try {
        // Create a new marker instance and save it to the database
        const newMarker = new Marker({ longitude, latitude });
        await newMarker.save();
        res.status(201).json({ message: 'Marker saved successfully', marker: newMarker }); // Respond with success message and saved marker
    } catch (err) {
        console.error('Could not save marker: ', err);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors gracefully
    }
};

// DELETE endpoint to delete a marker by Longitude and Latitude
export const deleteMarker = async (req: Request, res: Response) => {
    const { longitude, latitude } = req.body;

    // Check if longitude and latitude are provided
    if (!longitude || !latitude) {
        return res.status(400).json({ message: 'Longitude and Latitude are required' });
    }

    try {
        // Find and delete a marker by longitude and latitude
        await Marker.findOneAndDelete({ longitude, latitude });
        res.status(200).json({ message: 'Marker deleted successfully' }); // Respond with success message
    } catch (err) {
        console.error('Could not delete user: ', err);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors gracefully
    }
};
