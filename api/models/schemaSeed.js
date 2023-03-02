const request = require('supertest');
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require('./user');
const Route = require('./routes');
const Location = require('./location');
const mongoose = require('mongoose');
login = async () => {
  await fetch('https://mystery-route-backend.onrender.com/tokens', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: 'orhan', password: 'orhan' }),
  });
};

login();

route = async () => {
  await fetch('https://mystery-route-backend.onrender.com/routes', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Central London',
      bio: 'bio',
      time: '1 hour',
      locations: [
        mongoose.Types.ObjectId('640132f34ccb3300501b9657'),
        mongoose.Types.ObjectId('640133144ccb3300501b9659'),
        mongoose.Types.ObjectId('640133259a23e100505ba73c'),
        mongoose.Types.ObjectId('640133479a23e100505ba73f'),
        mongoose.Types.ObjectId('640133679a23e100505ba741'),
      ],
    }),
  });
};

route();
