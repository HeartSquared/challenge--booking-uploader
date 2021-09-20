import csvParse from 'csv-parse';
import { NewBookingRecord } from '../types';

const isBooking = (record: Record<string, unknown>): record is NewBookingRecord =>
  record.time !== undefined && record.duration !== undefined && record.userId !== undefined;

export const hasInvalidBooking = (records: Record<string, unknown>[]): boolean =>
  records.some((record) => !isBooking(record));

export const readAndParseFiles = (files: File[], onComplete: (newBookings: NewBookingRecord[]) => void): void => {
  let newBookings: NewBookingRecord[] = [];

  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      if (typeof target?.result === 'string') {
        csvParse(target.result, { delimiter: ', ', columns: true }, (error, records) => {
          if (error) return alert('Error reading file');
          if (hasInvalidBooking(records)) return alert('Invalid data provided');

          newBookings = newBookings.concat(records);
          if (files.length === index + 1) onComplete(newBookings);
        });
      }
    };
    reader.readAsText(file);
  });
};
