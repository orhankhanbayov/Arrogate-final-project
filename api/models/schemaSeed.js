const request = require('supertest');
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require('./user');
const Route = require('./routes');
const Location = require('./location');
const mongoose = require('mongoose');

route = async () => {
  await fetch('https://mystery-route-backend.onrender.com/routes', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: 'West End',
      bio: 'This treasure hunt will take you on a tour of London’s West End, the main commercial and entertainment hub of the city. The area includes a host of famous neighborhoods like Covent Garden, Soho, Chinatown, Oxford Street, Regent Street, Bond Street and Theatreland. Along your route you will see many of the West End’s restaurants, pubs, government buildings, and entertainment venues.',
      time: 'Estimated adventure 1 - 1.5hrs',
      locations: [
        mongoose.Types.ObjectId('6401d49cde32dd0051c66ffc'),
        mongoose.Types.ObjectId('6401d4d1de32dd0051c66ffe'),
        mongoose.Types.ObjectId('6401d519de32dd0051c67000'),
        mongoose.Types.ObjectId('6401d675de32dd0051c67006'),
        mongoose.Types.ObjectId('6401d635de32dd0051c67004'),
      ],
    }),
  });
};

route();

// route = async () => {
//   await fetch('https://mystery-route-backend.onrender.com/locations', {
//     method: 'post',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: 'Prince Edward Theatre',
//       coordinates: {
//         type: 'Point',
//         coordinates: [51.513472, -0.130778],
//       },
//       clue1:
//         'This landmark is named after the person who became the only King in British History to abdicate.',
//       clue2:
//         'This theatre was home to the musical The Jersey Boys for six years.',
//       clue3: 'It’s the only theatre on Old Compton Street.',
//     }),
//   });
// };

// route();
