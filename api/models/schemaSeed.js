const request = require('supertest');
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require('./user');
const Route = require('./routes');
const Location = require('./location');
const mongoose = require('mongoose');

route = async () => {
  await fetch('https://mystery-route-backend.onrender.com/routes', {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      id: '6401dd0fde32dd0051c67034',
      start: 'Temple Tube Station',
    }),
  });
};

route();
