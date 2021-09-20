import { hasInvalidBooking } from './fileParser';

describe('hasInvalidBooking', () => {
  test('returns false when all provided data are JsonBookings', () => {
    const result = hasInvalidBooking([
      {
        time: '01 Mar 2020 11:00:00 GMT+1000',
        duration: '180',
        userId: '0001',
      },
      {
        time: '02 Mar 2020 11:00:00 GMT+1000',
        duration: '180',
        userId: '0001',
      },
    ]);

    expect(result).toBe(false);
  });

  test('returns true when not all provided data are Bookings', () => {
    const result = hasInvalidBooking([
      {
        fruit: 'apple',
      },
      {
        time: '02 Mar 2020 11:00:00 GMT+1000',
        duration: '180',
        userId: '0001',
      },
    ]);

    expect(result).toBe(true);
  });
});
