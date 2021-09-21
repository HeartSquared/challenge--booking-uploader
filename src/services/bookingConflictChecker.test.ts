import { transformNewBookingRecordToBooking, hasConflict } from './bookingConflictChecker';

describe('transformNewBookingRecordToBooking', () => {
  test('transforms NewBookingRecord to Booking', () => {
    const result = transformNewBookingRecordToBooking({
      time: 'Mar 03 2020 12:00:00 GMT+1100',
      duration: '180',
      userId: '0001',
    });

    expect(result).toStrictEqual({
      time: 1583197200000,
      duration: 10800000,
      userId: '0001',
    });
  });
});

describe('hasConflict', () => {
  test('returns false when there is no conflict between bookings', () => {
    const result = hasConflict(
      {
        time: 1583197200000, // Mar 03 2020 12:00:00 GMT+1100
        duration: 10800000, // 180
        userId: '0001',
      },
      [
        {
          time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
        {
          time: 1583215200000, // Mar 03 2020 17:00:00 GMT+1100
          duration: 18000000, // 300
          userId: '0002',
        },
      ],
    );

    expect(result).toBe(false);
  });

  test('returns true when conflict exists between bookings', () => {
    const result = hasConflict(
      {
        time: 1583197200000, // Mar 03 2020 12:00:00 GMT+1100
        duration: 10800000, // 180
        userId: '0001',
      },
      [
        {
          time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
        {
          time: 1583197200000, // Mar 03 2020 12:00:00 GMT+1100
          duration: 18000000, // 300
          userId: '0002',
        },
      ],
    );

    expect(result).toBe(true);
  });
});
