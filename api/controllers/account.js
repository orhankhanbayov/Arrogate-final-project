const User = require('../models/user');
const TokenGenerator = require('../models/token_generator');

const AccountController = {
  updateScore: (req, res) => {
    User.updateOne(
      { email: req.body.email },
      { $inc: { trophies: req.body.trophies, coins: req.body.coins } },
      async (err, user) => {
        if (err) {
          throw err;
        } else {
          const token = await TokenGenerator.jsonwebtoken(req.user_id);

          res.status(204).json({ message: 'OK', token: token });
        }
      }
    );
  },
  getScore: (req, res) => {
    User.find(
      {},
      { trophies:1, coins:1, name:1, email:1 },
      async (err, user) => {
        if (err) {
          throw err;
        } else {
          const token = await TokenGenerator.jsonwebtoken(req.user_id);

          res.status(200).json({ score: user, token: token });
        }
      }
    );
  },

  Edit: (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        user.password = req.body.newPassword || user.password;
        user.email = req.body.newEmail || user.email;
        user.name = req.body.newName || user.name;

        await user.save();
        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },
};

module.exports = AccountController;
