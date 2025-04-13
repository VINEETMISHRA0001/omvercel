import createHttpError from 'http-errors';
import carBookingModel from '../models/carBooking.model.js';
import userModel from '../models/user.model.js';
import carModel from '../models/car.model.js';

export class CarBookingController {
  // Create a new car booking
  static async createBooking(req, res) {
    try {
      const {
        carId,
        userId,
        startDate,
        endDate,
        startLocation,
        endLocation,
        guests,
        price,
        status,
      } = req.body;

      if (
        !carId ||
        !userId ||
        !startDate ||
        !endDate ||
        !startLocation ||
        !endLocation ||
        !guests ||
        !price
      ) {
        return res.status(400).json({
          success: false,
          message: 'Missing required booking fields.',
        });
      }

      // Check if user and car exist
      const userExists = await userModel.findById(userId);
      const carExists = await carModel.findById(carId);

      if (!userExists || !carExists) {
        return res.status(404).json({
          success: false,
          message: 'User or Car not found.',
        });
      }

      const booking = await carBookingModel.create({
        user: userId,
        car: carId,
        startDate,
        endDate,
        startLocation,
        endLocation,
        guests,
        price,
        status: status || 'pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Car booked successfully.',
        data: booking,
      });
    } catch (error) {
      console.error('Car Booking Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  // Get all bookings of a specific user
  static async getUserBookings(req, res) {
    try {
      const { userId } = req.params;

      const bookings = await carBookingModel
        .find({ user: userId })
        .populate('car')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: 'User car bookings fetched.',
        data: bookings,
      });
    } catch (error) {
      console.error('Get Bookings Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  // Get all bookings
  static async getAllBookings(req, res) {
    try {
      const bookings = await carBookingModel
        .find()
        .populate('car user', '-password')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: 'bookings fetched.',
        data: bookings,
      });
    } catch (error) {
      console.error('Get Bookings Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  // Update a booking
  static async updateBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const updateFields = req.body;

      const booking = await carBookingModel.findByIdAndUpdate(
        bookingId,
        updateFields,
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Booking updated successfully.',
        data: booking,
      });
    } catch (error) {
      console.error('Update Booking Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  // Delete a booking
  static async deleteBooking(req, res) {
    try {
      const { bookingId } = req.params;

      const deleted = await carBookingModel.findByIdAndDelete(bookingId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Booking deleted successfully.',
      });
    } catch (error) {
      console.error('Delete Booking Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}
