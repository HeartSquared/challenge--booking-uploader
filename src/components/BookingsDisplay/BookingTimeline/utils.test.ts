import { getDurationSpan, getStartTimeOffset } from './utils';

describe('getStartTimeOffset', () => {
  test('return start time offset based on span of 10 minutes', () => {
    // Mar 03 2020 12:00:00 GMT+1100
    expect(getStartTimeOffset(1583197200000)).toBe(72);
    // Mar 03 2020 12:40:00 GMT+1100
    expect(getStartTimeOffset(1583199600000)).toBe(76);
  });
});

describe('getDurationSpan', () => {
  test('return duration from milliseconds to span of 10 minutes', () => {
    const minutes180InMs = 180 * 60 * 1000;
    const minutes180In10Mins = 180 / 6;
    expect(getDurationSpan(minutes180InMs)).toBe(minutes180In10Mins);
  });
});
