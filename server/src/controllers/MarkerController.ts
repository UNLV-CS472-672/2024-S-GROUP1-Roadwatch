import { Request, Response } from 'express';
import Marker from '../models/Marker';

// GET endpoint to retrieve all markers with longitude and latitude
export const getMarkers = async (req: Request, res: Response) => {
    try {
        const markers = await Marker.find({}, 'longitude latitude'); // Projection to include only longitude and latitude
        res.status(200).json(markers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST endpoint to save a marker to the database
export const saveMarker = async (req: Request, res: Response) => {
    try {
        const { longitude, latitude } = req.body;
        if (!longitude || !latitude) {
            return res.status(400).json({ message: 'Longitude and Latitude are required' });
        }
        const newMarker = new Marker({ longitude, latitude });
        await newMarker.save();
        res.status(201).json({ message: 'Marker saved successfully', marker: newMarker });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE endpoint to delete a marker by Longitude and Latitude
export const deleteMarker = async (req: Request, res: Response) => {
    try {
        const { longitude, latitude } = req.body;
        if (!longitude || !latitude) {
            return res.status(400).json({ message: 'Longitude and Latitude are required' });
        }
        await Marker.findOneAndDelete({ longitude, latitude });
        res.status(200).json({ message: 'Marker deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
