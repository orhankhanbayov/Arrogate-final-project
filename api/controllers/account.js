const User = require('../models/user');
const TokenGenerator = require('../models/token_generator');

const AccountController = {
  updateScore: (req, res) => {
    User.find({ emai: req.body.email }, async (err, user) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        // Check if trophies and coins properties exist
        if (user.hasOwnProperty('trophies') && user.hasOwnProperty('coins')) {
          // Increment trophies and coins
          user.trophies = parseInt(user.trophies) + parseInt(req.body.trophies);
          user.coins = parseInt(user.coins) + parseInt(req.body.coins);
        } else {
          // Set default values and increment
          user.trophies = parseInt(req.body.trophies || 0);
          user.coins = parseInt(req.body.coins || 0);
        }

        await user.save();
        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },
  getScore: (req, res) => {
    User.findById(req.body.id, { trophies: 1, coins: 1 }, async (err, user) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        res.status(200).json({ score: user, token: token });
      }
    });
  },
};

module.exports = AccountController;
