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
  const [validNewBookings, setValidNewBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then(setExistingBookings);
  }, []);

  useEffect(() => {
    if (newBookingRecords) {
      const newBookingsWithConflictStatus = identifyBookingConflicts(existingBookings, newBookingRecords);
      setNewBookings(newBookingsWithConflictStatus);
      setValidNewBookings(filterAndTransformNewBookingsToWrite(newBookingsWithConflictStatus));
    }
  }, [newBookingRecords]);

  const writeValidBookings = async () => {
    if (validNewBookings.length) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validNewBookings),
      };

      const response = await fetch(`${apiUrl}/add-bookings`, requestOptions);
      const data = await response.json();

      setNewBookings(undefined);
      setValidNewBookings([]);
      setExistingBookings(data);
    }
  };

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
      <div className="App-main" style={{ padding: '2rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Bookings:</h1>
          {validNewBookings.length !== 0 && (
            <button type="button" onClick={writeValidBookings} style={{ padding: '1rem' }}>
              Write valid bookings
            </button>
          )}
        </div>
        <BookingsDisplay bookings={bookings} />
      </div>
    </div>
  );
};
