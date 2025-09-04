import { Request, Response } from 'express';
import { FlightModel } from '../models/Flight';
import { CreateFlightRequest, UpdateFlightRequest } from '../types/flight';

// GET /api/flights - Get all flights
export const getAllFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const flights = await FlightModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights
    });
  } catch (error) {
    console.error('Error getting flights:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving flights',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// GET /api/flights/:flightCode - Get flight by flight code
export const getFlightByCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const flight = await FlightModel.findOne({ flightCode: req.params.flightCode });
    
    if (!flight) {
      res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: flight
    });
  } catch (error) {
    console.error('Error getting flight:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving flight',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// POST /api/flights - Create new flight
export const createFlight = async (req: Request, res: Response): Promise<void> => {
  try {
    const flightData: CreateFlightRequest = req.body;
    
    // Validate required fields
    if (!flightData.flightCode || !flightData.passengers) {
      res.status(400).json({
        success: false,
        message: 'flightCode and passengers are required'
      });
      return;
    }
    
    // Check if flight code already exists
    const existingFlight = await FlightModel.findOne({ flightCode: flightData.flightCode });
    if (existingFlight) {
      res.status(400).json({
        success: false,
        message: 'Flight code already exists'
      });
      return;
    }
    
    const flight = new FlightModel(flightData);
    const savedFlight = await flight.save();
    
    res.status(201).json({
      success: true,
      message: 'Flight created successfully',
      data: savedFlight
    });
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating flight',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/flights/:flightCode - Update flight
export const updateFlight = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: UpdateFlightRequest = req.body;
    
    // Check if flight exists
    const existingFlight = await FlightModel.findOne({ flightCode: req.params.flightCode });
    if (!existingFlight) {
      res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
      return;
    }
    
    // If updating flight code, check if it already exists
    if (updateData.flightCode && updateData.flightCode !== existingFlight.flightCode) {
      const duplicateFlight = await FlightModel.findOne({ flightCode: updateData.flightCode });
      if (duplicateFlight) {
        res.status(400).json({
          success: false,
          message: 'Flight code already exists'
        });
        return;
      }
    }
    
    const updatedFlight = await FlightModel.findOneAndUpdate(
      { flightCode: req.params.flightCode },
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Flight updated successfully',
      data: updatedFlight
    });
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating flight',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/flights/:flightCode - Delete flight
export const deleteFlight = async (req: Request, res: Response): Promise<void> => {
  try {
    const flight = await FlightModel.findOneAndDelete({ flightCode: req.params.flightCode });
    
    if (!flight) {
      res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Flight deleted successfully',
      data: flight
    });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting flight',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};


