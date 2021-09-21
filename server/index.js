const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { json } = require('body-parser')

const app = express()
app.use(cors()) // so that app can access
app.use(json())

const bookings = JSON.parse(fs.readFileSync('./server/bookings.json')).map(
  (bookingRecord) => ({
    time: Date.parse(bookingRecord.time),
    duration: bookingRecord.duration * 60 * 1000, // mins into ms
    userId: bookingRecord.user_id,
  }),
)

app.get('/bookings', (_, res) => {
  res.json(bookings)
})

app.post('/add-bookings', (req, res) => {
  const bookingsToStore = bookings;
  bookingsToStore.push(...req.body);

  fs.writeFileSync('./server/bookings.json', JSON.stringify(bookingsToStore));

  res.json(bookingsToStore);
})

app.listen(3001)
