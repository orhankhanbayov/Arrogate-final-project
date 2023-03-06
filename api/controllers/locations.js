const Location = require('../models/location');
const TokenGenerator = require('../models/token_generator');
const RoutesController = {
  Create: (req, res) => {
    const location = new Location(req.body);
    location.save(async (err) => {
      if (err) {
        res.status(400).json({ message: 'Bad request' });
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },
};

module.exports = RoutesController;
