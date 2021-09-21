import { aggregateBookings, sortAggregatedBookings } from './utils';

describe('aggregateBookings', () => {
  test('aggregates existing and new bookings by date', () => {
    const bookings = [
      {
        time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
        duration: 10800000, // 180
        userId: '0003',
      },
      {
        time: 1583006400000, // Mar 01 2020 07:00:00 GMT+1100
        duration: 10800000, // 180
        userId: '0003',
      },
      {
        time: 1583186400000, // Mar 03 2020 09:00:00 GMT+1100
        duration: 18000000, // 300
        userId: '0002',
        hasConflict: true,
      },
    ];

    expect(aggregateBookings(bookings)).toStrictEqual({
      '03/03/2020': [
        {
          time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
        {
          time: 1583186400000, // Mar 03 2020 09:00:00 GMT+1100
          duration: 18000000, // 300
          userId: '0002',
          hasConflict: true,
        },
      ],
      '01/03/2020': [
        {
          time: 1583006400000, // Mar 01 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
      ],
    });
  });
});

describe('sortAggregatedBookings', () => {
  test('aggregates existing and new bookings by date', () => {
    const bookings = {
      '03/03/2020': [
        {
          time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
        {
          time: 1583186400000, // Mar 03 2020 09:00:00 GMT+1100
          duration: 18000000, // 300
          userId: '0002',
          hasConflict: true,
        },
      ],
      '01/03/2020': [
        {
          time: 1583006400000, // Mar 01 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
      ],
    };

    expect(sortAggregatedBookings(bookings)).toStrictEqual({
      '01/03/2020': [
        {
          time: 1583006400000, // Mar 01 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
      ],
      '03/03/2020': [
        {
          time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
          duration: 10800000, // 180
          userId: '0003',
        },
        {
          time: 1583186400000, // Mar 03 2020 09:00:00 GMT+1100
          duration: 18000000, // 300
          userId: '0002',
          hasConflict: true,
        },
      ],
    });
  });
});
