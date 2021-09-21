import React from 'react';
import { Booking, NewBooking } from '../../types';
import { BookingTimeline } from './BookingTimeline';

type BookingsDisplayProps = {
  bookings: (Booking | NewBooking)[];
};

export const BookingsDisplay: React.VFC<BookingsDisplayProps> = ({ bookings }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 3rem' }}>
      {bookings.map((booking, i) => {
        const date = new Date(booking.time);
        const duration = booking.duration / (60 * 1000);
        return (
          <>
            <p key={i} className="App-booking">
              <span className="App-booking-time">{date.toString()}</span>
              <span className="App-booking-duration">{duration.toFixed(1)}</span>
              <span className="App-booking-user">{booking.userId}</span>
            </p>
            <BookingTimeline booking={booking} />
          </>
        );
      })}
    </div>
  );
};
