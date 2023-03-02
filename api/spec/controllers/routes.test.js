const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require('../../models/user');
const Route = require('../../models/routes');
const Location = require('../../models/location');

describe('/routes', () => {
  beforeAll(async () => {
    await Route.deleteMany({});
    await Location.deleteMany({});

    let location1 = await Location.insertMany({
      name: 'Big Ben',
      coordinates: { type: 'Point', coordinates: [1, 1] },
      clue1: 'Clue 1',
      clue2: 'Clue 2',
      clue3: 'Clue 3',
    });

    let location2 = await Location.insertMany({
      name: 'London Eye',
      coordinates: { type: 'Point', coordinates: [2, 2] },
      clue1: 'Clue 1',
      clue2: 'Clue 2',
      clue3: 'Clue 3',
    });

    await Route.insertMany({
      name: 'Central London',
      bio: 'bio',
      time: '1 hour',
      locations: [location1[0]._id, location2[0]._id],
    });
    const user = new User({
      email: 'test@test.com',
      name: 'name',
      password: '12345678',
    });
    await user.save();
    user_id = user._id;
    token = JWT.sign(
      {
        user_id: user.id,
        iat: Math.floor(Date.now() / 1000),

        exp: Math.floor(Date.now() / 10) + 336 * 60,
      },
      secret
    );
  });

  describe('GET routes, when email and password are provided', () => {
    it('returns status 200', async () => {
      let response = await request(app)
        .get('/routes')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('returns list of routes', async () => {
      let response = await request(app)
        .get('/routes')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.routes[0]).not.toBeNull();
    });

    it('returns name of route', async () => {
      let response = await request(app)
        .get('/routes')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.routes[0].name).toBe('Central London');
    });
  });

  describe('GET routes, when password is incorrect', () => {
    it('returns 401 status', async () => {
      let response = await request(app).get('/routes');
      expect(response.status).toBe(401);
    });

    it('does not return routes', async () => {
      let response = await request(app).get('/routes');
      expect(response.body).toEqual({ message: 'auth error' });
    });
  });

  describe('returns routes populated with locations', () => {
    it('does nothing', async () => {
      let response = await request(app)
        .get('/routes')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.routes[0].locations[0].name).toBe('Big Ben');
    });
  });
});
