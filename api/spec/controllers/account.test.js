const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const User = require('../../models/user');
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

describe('/users', () => {
  beforeAll(async () => {
    await User.deleteMany({});

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

  describe('/account', () => {
    describe('trophies and coins', () => {
      it('can update trophies', async () => {
        let response = await request(app)
          .post('/account')
          .set('Authorization', `Bearer ${token}`)
          .send({ id: user_id, trophies: 5, coins: 10 });
        expect(response.status).toBe(204);
      });
    });
  });
});
