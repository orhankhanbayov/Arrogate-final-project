const Route = require('../models/routes');
const TokenGenerator = require('../models/token_generator');

const RoutesController = {
  List: (req, res) => {
    Route.find()
      .populate('Locations')
      .exec(async (err, routes) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ routes: routes, token: token });
      });
  },
};

module.exports = RoutesController;
