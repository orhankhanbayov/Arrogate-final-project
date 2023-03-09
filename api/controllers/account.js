const User = require('../models/user');
const TokenGenerator = require('../models/token_generator');

const AccountController = {
  updateScore: (req, res) => {
    User.find({ emai: req.body.email }, async (err, user) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        user.trophies = req.body.trophies;
        user.coins = req.body.coins;

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
