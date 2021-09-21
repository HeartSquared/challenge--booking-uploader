import { filterAndTransformNewBookingsToWrite } from './bookingTransformer';

describe('filterAndTransformNewBookingsToWrite', () => {
  test('filters out bookings with a conflict and removes the `hasConflict` property', () => {
    const result = filterAndTransformNewBookingsToWrite([
      {
        time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
        duration: 10800000, // 180
        userId: '0003',
        hasConflict: false,
      },
      {
        time: 1583006400000, // Mar 01 2020 07:00:00 GMT+1100
        duration: 10800000, // 180
        userId: '0003',
        hasConflict: true,
      },
      {
        time: 1583186400000, // Mar 03 2020 09:00:00 GMT+1100
        duration: 18000000, // 300
        userId: '0002',
        hasConflict: false,
      },
    ]);

    expect(result).toStrictEqual([
      {
        time: 1583179200000, // Mar 03 2020 07:00:00 GMT+1100
        duration: 10800000, // 180
        userId: '0003',
      },
      {
        time: 1583186400000, // Mar 03 2020 09:00:00 GMT+1100
        duration: 18000000, // 300
        userId: '0002',
      },
    ]);
  });
});
