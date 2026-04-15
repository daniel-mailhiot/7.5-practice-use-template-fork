const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

// ---------------------------------------------------------------
// TIP: Use AI to help you generate test cases!
// Paste your app.js into your AI tool of choice and ask it to
// write Mocha + Chai + Supertest tests for each route.
// Review what it generates, make sure you understand each test,
// and adjust as needed before running them.
// ---------------------------------------------------------------

// Minimum requirement: at least 6 tests total across all routes.

// ---------------------------------------------------------------
// GET /
// ---------------------------------------------------------------
// Ideas:
//   - Should return status 200
//   - Response body should have a "message" property
//   - Message should include the hotel name

describe('GET /', () => {
  it('should return a welcome message', async () => {
    // Send a GET request to the home route
    const res = await request(app).get('/')

    // The route exists, so we expect a successful response
    expect(res.status).to.equal(200)

    // The API should respond with an object containing a message
    expect(res.body).to.have.property('message')

    // We check for part of the text instead of the full exact string
    // so the test is a little more flexible if punctuation or emoji changes
    expect(res.body.message).to.include('Grand Azure Hotel')
  })
})

// ---------------------------------------------------------------
// GET /rooms
// ---------------------------------------------------------------
// Ideas:
//   - Should return status 200
//   - Should return an array
//   - Should return the correct number of rooms
//   - Each room should have: id, name, type, pricePerNight, available
//   - ?type=suite should return only suite rooms
//   - ?type=deluxe should return only deluxe rooms
//   - ?type=standard should return only standard rooms
//   - Filtering by a type that doesn't exist should return an empty array

describe('GET /rooms', () => {
  it('should return all rooms', async () => {
    // Request the full list of rooms
    const res = await request(app).get('/rooms')

    // The request should succeed
    expect(res.status).to.equal(200)

    // The response should be an array
    expect(res.body).to.be.an('array')

    // Based on app.js, there are currently 7 rooms in the dataset
    expect(res.body).to.have.lengthOf(7)
  })

  it('should return rooms with the expected properties', async () => {
    const res = await request(app).get('/rooms')

    // Loop through every returned room and make sure each one
    // has the fields the API is supposed to provide
    res.body.forEach(room => {
      expect(room).to.have.property('id')
      expect(room).to.have.property('name')
      expect(room).to.have.property('type')
      expect(room).to.have.property('pricePerNight')
      expect(room).to.have.property('available')
    })
  })

  it('should filter rooms by type when type=suite', async () => {
    // Send a query string: /rooms?type=suite
    const res = await request(app).get('/rooms').query({ type: 'suite' })

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')

    // In app.js there are 3 suite rooms
    expect(res.body).to.have.lengthOf(3)

    // Every returned room should match the requested type
    res.body.forEach(room => {
      expect(room.type).to.equal('suite')
    })
  })

  it('should filter rooms by type when type=deluxe', async () => {
    const res = await request(app).get('/rooms').query({ type: 'deluxe' })

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')

    // In app.js there are 2 deluxe rooms
    expect(res.body).to.have.lengthOf(2)

    res.body.forEach(room => {
      expect(room.type).to.equal('deluxe')
    })
  })

  it('should return an empty array for an unknown room type', async () => {
    // This type does not exist in the current dataset
    const res = await request(app).get('/rooms').query({ type: 'unknown' })

    expect(res.status).to.equal(200)

    // The route still works, but no rooms match the filter
    expect(res.body).to.be.an('array').that.is.empty
  })
})

// ---------------------------------------------------------------
// GET /rooms/:id
// ---------------------------------------------------------------
// Ideas:
//   - Should return status 200 for a valid id
//   - Should return the correct room name for a given id
//   - Should return status 404 for an id that doesn't exist
//   - 404 response should include an "error" property

describe('GET /rooms/:id', () => {
  it('should return the correct room for a valid id', async () => {
    // Room 1 in app.js is "Standard Queen"
    const res = await request(app).get('/rooms/1')

    expect(res.status).to.equal(200)

    // Check one or two specific values to confirm we got the right room
    expect(res.body).to.have.property('id', 1)
    expect(res.body).to.have.property('name', 'Standard Queen')
  })

  it('should return 404 and an error message for an invalid id', async () => {
    // There is no room with id 999
    const res = await request(app).get('/rooms/999')

    // The app should correctly report "not found"
    expect(res.status).to.equal(404)

    // The error response should include a helpful error message
    expect(res.body).to.have.property('error', 'Room not found')
  })
})

// ---------------------------------------------------------------
// GET /available
// ---------------------------------------------------------------
// Ideas:
//   - Should return status 200
//   - Should return an array
//   - Every room in the response should have available === true
//   - Should not include any unavailable rooms

describe('GET /available', () => {
  it('should return only available rooms', async () => {
    // Note: in this project the route is /available
    // (not /rooms/available)
    const res = await request(app).get('/available')

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')

    // In app.js there are currently 5 available rooms
    expect(res.body).to.have.lengthOf(5)

    // Every room returned by this route should be available
    res.body.forEach(room => {
      expect(room.available).to.equal(true)
    })
  })

  it('should not include unavailable rooms', async () => {
    const res = await request(app).get('/available')

    // Grab just the ids to make it easier to check what is included
    const roomIds = res.body.map(room => room.id)

    // Room 2 and room 5 are unavailable in app.js,
    // so they should not appear in this response
    expect(roomIds).to.not.include(2)
    expect(roomIds).to.not.include(5)
  })
})