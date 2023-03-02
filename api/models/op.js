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
  await fetch('https://mystery-route-backend.onrender.com/');
};
