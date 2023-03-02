const User = require("../models/user");
const jwt = require('jsonwebtoken');


const UsersController = {
  Create: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = new User({ email, password, name });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};


module.exports = UsersController;
