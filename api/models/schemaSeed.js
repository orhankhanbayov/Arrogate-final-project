const request = require('supertest');
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require('./user');
const Route = require('./routes');
const Location = require('./location');
const mongoose = require('mongoose');
// login = async () => {
//   let response = await fetch(
//     'https://mystery-route-backend.onrender.com/tokens',
//     {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: 'orhan', password: 'orhan' }),
//     }
//   );

//   console.log(response.body);
// };

// login();

route = async () => {
  await fetch('https://mystery-route-backend.onrender.com/routes', {
    method: 'get',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQwMTJjNmM3MWQyYWIwMDUwOTEyMDBjIiwiaWF0IjoxNjc3ODAzNDA3LCJleHAiOjE2Nzc4MDM2MDg4NH0.zHTZVCMu3VclQvoBxfUivvS9ajGm7g9UK-Z6KdZZSFc`,
    },
  });
};

route();
