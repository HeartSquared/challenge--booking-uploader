import React from 'react';
import { Booking, NewBooking } from '../../types';
import { BookingTimeline } from './BookingTimeline';
import { aggregateBookings, isNewBooking, sortAggregatedBookings } from './utils';

type BookingsDisplayProps = {
  bookings: (Booking | NewBooking)[];
};

export const BookingsDisplay: React.VFC<BookingsDisplayProps> = ({ bookings }) => {
  const aggregatedBookings = aggregateBookings(bookings);
  const sortedAggregatedBookings = sortAggregatedBookings(aggregatedBookings);

  return (
    <div style={{ padding: '0 3rem' }}>
      {Object.keys(sortedAggregatedBookings).map((dateString) => {
        return (
          <div key={dateString} style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ alignSelf: 'flex-start', margin: '2rem 0 0', fontSize: '1.5em' }}>
              <strong>{dateString}</strong>
            </p>

            {sortedAggregatedBookings[dateString].map((booking, i) => {
              const date = new Date(booking.time);
              const duration = booking.duration / (60 * 1000);
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>{isNewBooking(booking) ? 'New' : 'Existing'}</p>
                    <p>
                      <span style={{ margin: '0 1rem' }}>{date.toString()}</span>
                      <span style={{ margin: '0 1rem' }}>{duration.toFixed(1)}</span>
                      <span style={{ margin: '0 1rem' }}>{booking.userId}</span>
                    </p>
                  </div>
                  <BookingTimeline booking={booking} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
