import React from 'react';
import { Booking, NewBooking } from '../../../types';
import { getDurationSpan, getStartTimeOffset } from './utils';
import { isNewBooking } from '../utils';
import * as styles from './styles.css';

type BookingTimelineProps = {
  booking: Booking | NewBooking;
};

enum Colour {
  Existing = '#3b9cef',
  New = '#49c374',
  Conflict = '#bf5b5b',
}

export const BookingTimeline: React.VFC<BookingTimelineProps> = ({ booking }) => (
  <div className={styles.timeline}>
    <div
      style={{
        gridColumnStart: getStartTimeOffset(booking.time),
        gridColumnEnd: `span ${getDurationSpan(booking.duration)}`,
        backgroundColor: isNewBooking(booking) ? (booking.hasConflict ? Colour.Conflict : Colour.New) : Colour.Existing,
      }}
    />
  </div>
);
