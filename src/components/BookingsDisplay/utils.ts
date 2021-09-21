import { Booking, NewBooking } from '../../types';

type AggregatedBookings = Record<string, (Booking | NewBooking)[]>;

export const aggregateBookings = (bookings: (Booking | NewBooking)[]): AggregatedBookings =>
  bookings.reduce((acc: AggregatedBookings, booking) => {
    const date = new Date(booking.time);
    const aggregationKey = date.toLocaleDateString('en-AU');

    if (acc[aggregationKey]) return { ...acc, [aggregationKey]: [...acc[aggregationKey], booking] };

    return { ...acc, [aggregationKey]: [booking] };
  }, {});

export const sortAggregatedBookings = (bookings: AggregatedBookings): AggregatedBookings => {
  return Object.keys(bookings)
    .sort()
    .reduce((obj: AggregatedBookings, key) => {
      obj[key] = bookings[key];
      return obj;
    }, {});
};

export const isNewBooking = (booking: Booking | NewBooking): booking is NewBooking =>
  (booking as NewBooking).hasConflict !== undefined;
