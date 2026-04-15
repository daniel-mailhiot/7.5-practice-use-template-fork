const express = require('express')
const app = express()

app.use(express.json())

const rooms = [
  { id: 1, name: 'Standard Queen', type: 'standard',  },
  { id: 2, name: 'Standard Twin', type: 'standard', pricePerNight: 110, available: false },
  { id: 3, name: 'Deluxe King', type: 'deluxe', pricePerNight: 200, available: true },
  { id: 4, name: 'Deluxe Ocean View', type: 'deluxe', pricePerNight: 250, available: true },
  { id: 5, name: 'Junior Suite', type: 'suite', pricePerNight: 380, available: false },
  { id: 6, name: 'Grand Suite', type: 'suite', pricePerNight: 520, available: true },
  { id: 7, name: 'Penthouse Suite', type: 'suite', pricePerNight: 900, available: true },
]

// GET / - welcome message
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Grand Azure Hotel API 🏨' })
})

// GET /rooms - return all rooms
// Optional query param: ?type=suite (filter by room type)
app.get('/rooms', (req, res) => {
  const { type } = req.query
  if (type) {
    const filtered = rooms.filter(r => r.type === type)
    return res.json(filtered)
  }
  res.json(rooms)
})

// GET /rooms/:id - return a single room by id
app.get('/rooms/:id', (req, res) => {
  const room = rooms.find(r => r.id === parseInt(req.params.id))
  if (!room) return res.status(404).json({ error: 'Room not found' })
  res.json(room)
})

// GET /rooms/available - return only available rooms
app.get('/available', (req, res) => {
  const available = rooms.filter(r => r.available === true)
  res.json(available)
})

module.exports = app
