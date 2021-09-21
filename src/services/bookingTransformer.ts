import { Booking, NewBooking } from '../types';

export const filterAndTransformNewBookingsToWrite = (newBookings: NewBooking[]): Booking[] =>
  newBookings
    .filter(({ hasConflict }) => !hasConflict)
    .map(({ time, duration, userId }) => ({ time, duration, userId }));
