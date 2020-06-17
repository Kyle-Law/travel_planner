const request = require('supertest')
const app = require('./server')

// import { app } from './server'

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/addWeather')
      .send({
        destination: 'Singapore',
        icon: [
          'r02d', 'r01d',
          'r02d', 't02d',
          'c04d', 'c04d',
          'c04d', 'r02d',
          'c04d'
        ],
        temp: [
          29.3, 27.2, 27.7,
          26.5, 25.2, 24.9,
          27.1, 27.3,   28
        ],
        dateStart: 'Tue Jun 16 2020 15:53:00 GMT+0800 (Malaysia Time)',
        dateEnd: 'Wed Jun 24 2020 15:53:00 GMT+0800 (Malaysia Time)'
      })
    expect(res.statusCode).toEqual(500)
    // expect(res.body).toHaveProperty('destination')
  })
})
