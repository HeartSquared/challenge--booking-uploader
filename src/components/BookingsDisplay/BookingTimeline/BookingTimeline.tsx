import React from 'react';
import { Booking, NewBooking } from '../../../types';
import { getDurationSpan, getStartTimeOffset } from './utils';
import { isNewBooking } from '../utils';

type BookingTimelineProps = {
  booking: Booking | NewBooking;
};

export const BookingTimeline: React.VFC<BookingTimelineProps> = ({ booking }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(144, 1fr)', // render with granularity of 10 minutes
      backgroundColor: '#ccc',
      width: '100%',
      height: '1rem',
    }}
  >
    <div
      style={{
        gridColumnStart: getStartTimeOffset(booking.time),
        gridColumnEnd: `span ${getDurationSpan(booking.duration)}`,
        backgroundColor: isNewBooking(booking) ? '#49c374' : '#3b9cef',
      }}
    />
  </div>
);
