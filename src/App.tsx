import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import csvParse from 'csv-parse';
import './App.css';

const apiUrl = 'http://localhost:3001';

type Booking = {
  time: number;
  duration: number;
  userId: string;
};

const isBooking = (record: Record<string, unknown>): record is Booking =>
  record.time !== undefined && record.duration !== undefined && record.userId !== undefined;

const hasInvalidBooking = (records: Record<string, unknown>[]): boolean => records.some((record) => !isBooking(record));

export const App: React.VFC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newBookings, setNewBookings] = useState<Booking[]>();

  useEffect(() => {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then(setBookings);
  }, []);

  const onDrop = (files: File[]) => {
    let receivedBookings: Booking[] = [];

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        if (typeof target?.result === 'string') {
          csvParse(target.result, { delimiter: ', ', columns: true }, (error, records) => {
            if (error) return alert('Error reading file');
            if (hasInvalidBooking(records)) return alert('Invalid data provided');

            receivedBookings = receivedBookings.concat(records);

            if (files.length === index + 1) setNewBookings(receivedBookings);
          });
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <Dropzone accept=".csv" onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className="App-main">
        <p>Existing bookings:</p>
        {bookings.map((booking, i) => {
          const date = new Date(booking.time);
          const duration = booking.duration / (60 * 1000);
          return (
            <p key={i} className="App-booking">
              <span className="App-booking-time">{date.toString()}</span>
              <span className="App-booking-duration">{duration.toFixed(1)}</span>
              <span className="App-booking-user">{booking.userId}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};
