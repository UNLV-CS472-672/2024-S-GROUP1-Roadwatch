import express, { Request, Response } from 'express';
import Marker from '../../src/models/Marker';
import * as markerController from '../../src/controllers/MarkerController';
import { jest, describe, expect, test, beforeEach, beforeAll } from '@jest/globals';
import axios from 'axios';

jest.mock('../../src/models/Marker');

describe('Marker Routes', () => {
  let app: express.Application;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  // create a test user and authenticate in order to run the rest of the tests
  beforeAll(async () => {
    const testUserData = {
      userName: 'testuser',
      password: 'password',
    };
  
    async function createUser() {
      try {
        const response = await axios.post('http://localhost:3000/api/user', {
          firstName: 'Test',
          lastName: 'User',
          userName: testUserData.userName,
          password: testUserData.password,
          email: 'test@example.com',
          phoneNumber: '1234567890',
          dob: '1990-01-01',
          city: 'Test City',
          address: '123 Test St',
          state: 'Test State',
          zip: '12345',
        });
  
        console.log('User creation response status code:', response.status);
  
        if (response.status === 200) {
          console.log('Test user created successfully');
        } else {
          console.log('New test user was not created:', response.status);
        }
      } catch (error: any) {
        console.log('A new test user was not created, this is not necessarily an error');
      }
    }
  
    async function loginUser() {
        try {
          const response = await axios.post('http://localhost:3000/api/user/login', {
            userInput: testUserData.userName, // Using the userInput field for login
            password: testUserData.password,
          });
      
          console.log('Login response status code:', response.status);
      
          if (response.status === 200) {
            console.log('Login successful');
          } else {
            console.log('Login failed:', response.status);
          }
        } catch (error: any) {
          console.log('Error logging in:', error.message);
        }
      }
  
    try {
      await createUser();
      await loginUser();
    } catch (error) {
      console.error('Test setup failed:', error);
      throw error;
    }
  }, 10000); // Timeout value of 10 seconds

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockRequest = {};
    mockResponse = {
        status: jest.fn(function(this: Response, code: number) { 
          this.statusCode = code;
          return this;
        }),
        json: jest.fn(function(this: Response) {
          return this;
        }),
    };
  });

  describe('POST /markers', () => {
    test('should save a new marker', async () => {
      const newMarker = { longitude: 5, latitude: 6 };
      const mockRequestWithBody = { body: newMarker } as Request;
      const mockResponseWithStatus = { ...mockResponse, status: jest.fn(() => mockResponse) };

      await markerController.saveMarker(mockRequestWithBody, mockResponseWithStatus as Response);

      expect(mockResponseWithStatus.status).toHaveBeenCalledWith(201);
      expect(mockResponseWithStatus.json).toHaveBeenCalledWith({ message: 'Marker saved successfully', marker: newMarker });
    });

    test('should handle missing longitude and latitude', async () => {
      const mockRequestWithBody = { body: {} } as Request;

      await markerController.saveMarker(mockRequestWithBody, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Longitude and Latitude are required' });
    });

    test('should handle errors gracefully', async () => {
      (Marker.prototype.save as jest.Mock).mockRejectedValue(new Error('Database error') as never);
      const mockRequestWithBody = { body: { longitude: 5, latitude: 6 } } as Request;

      await markerController.saveMarker(mockRequestWithBody, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Could not save marker' });
    });
  });

  describe('GET /markers', () => {
    test('should return all markers', async () => {
      const mockMarkers: never = {} as never;
      const mockQuery = { exec: jest.fn().mockResolvedValue(mockMarkers) };
      (Marker.find as jest.Mock).mockReturnValue(mockQuery);

      await markerController.getMarkers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMarkers);
    });

    test('should handle errors gracefully', async () => {
      (Marker.find as jest.Mock).mockRejectedValue(new Error('Database error') as never);

      await markerController.getMarkers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Could not get markers' });
    });
  });

  describe('DELETE /markers', () => {
    test('should delete a marker', async () => {
      const markerToDelete = { longitude: 5, latitude: 6 };
      const mockRequestWithBody = { body: markerToDelete } as Request;

      await markerController.deleteMarker(mockRequestWithBody, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Marker deleted successfully' });
    });

    test('should handle missing longitude and latitude', async () => {
      const mockRequestWithBody = { body: {} } as Request;

      await markerController.deleteMarker(mockRequestWithBody, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Longitude and Latitude are required' });
    });

    test('should handle errors gracefully', async () => {
      (Marker.findOneAndDelete as jest.Mock).mockRejectedValue(new Error('Database error') as never);
      const mockRequestWithBody = { body: { longitude: 5, latitude: 6 } } as Request;

      await markerController.deleteMarker(mockRequestWithBody, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Could not delete user' });
    });
  });
});
