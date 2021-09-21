import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { BookingsDisplay } from './components/BookingsDisplay';
import { identifyBookingConflicts } from './services/bookingConflictChecker';
import { filterAndTransformNewBookingsToWrite } from './services/bookingTransformer';
import { readAndParseFiles } from './services/fileParser';
import { Booking, NewBooking, NewBookingRecord } from './types';
import './App.css';

const apiUrl = 'http://localhost:3001';

export const App: React.VFC = () => {
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [newBookingRecords, setNewBookingRecords] = useState<NewBookingRecord[]>();
  const [newBookings, setNewBookings] = useState<NewBooking[]>();

  useEffect(() => {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then(setExistingBookings);
  }, []);

  useEffect(() => {
    if (newBookingRecords) {
      const newBookingsWithConflictStatus = identifyBookingConflicts(existingBookings, newBookingRecords);

      const validBookingsToWrite = filterAndTransformNewBookingsToWrite(newBookingsWithConflictStatus);

      if (validBookingsToWrite) {
        const writeNewNonConflictingBookings = async () => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validBookingsToWrite),
          };

          await fetch(`${apiUrl}/add-bookings`, requestOptions);

          setNewBookings(newBookingsWithConflictStatus);
        };

        writeNewNonConflictingBookings();
      }
    }
  }, [newBookingRecords]);

  const onDrop = (files: File[]) => readAndParseFiles(files, setNewBookingRecords);

  const bookings = newBookings ? [...existingBookings, ...newBookings] : existingBookings;

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
        <BookingsDisplay bookings={bookings} />
      </div>
    </div>
  );
};
