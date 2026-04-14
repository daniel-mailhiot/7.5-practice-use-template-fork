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

})
