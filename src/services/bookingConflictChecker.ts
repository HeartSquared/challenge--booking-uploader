import { Booking, NewBooking, NewBookingRecord } from '../types';

export const transformNewBookingRecordToBooking = (newBooking: NewBookingRecord): Booking => ({
  time: Date.parse(newBooking.time),
  duration: parseInt(newBooking.duration) * 60 * 1000,
  userId: newBooking.userId,
});

export const hasConflict = (newBooking: Booking, existingSameDayBookings: Booking[]): boolean => {
  const newStartTime = newBooking.time;
  const newEndTime = newStartTime + newBooking.duration;

  return existingSameDayBookings.some(({ time, duration }) => {
    const existingStartTime = time;
    const existingEndTime = existingStartTime + duration;
    return newStartTime < existingEndTime && newEndTime > existingStartTime;
  });
};

export const identifyBookingConflicts = (
  existingBookings: Booking[],
  newBookings: NewBookingRecord[],
): NewBooking[] => {
  return newBookings.map((newBooking) => {
    const currentBooking = transformNewBookingRecordToBooking(newBooking);

    return {
      ...currentBooking,
      hasConflict: hasConflict(currentBooking, existingBookings),
    };
  });
};
