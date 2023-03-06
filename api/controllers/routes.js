const Route = require('../models/routes');
const TokenGenerator = require('../models/token_generator');

const RoutesController = {
  List: (req, res) => {
    Route.find()
      .populate({
        path: 'locations',
        model: 'Location',
      })
      .exec(async (err, routes) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ routes: routes, token: token });
      });
  },

  Create: (req, res) => {
    const route = new Route(req.body);
    route.save(async (err) => {
      if (err) {
        res.status(400).json({ message: 'Bad request' });
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },

  Update: (req, res) => {
    Route.findById(req.body.id, async (err, route) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        route.start = req.body.start;
        await route.save();
        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },
};

module.exports = RoutesController;
