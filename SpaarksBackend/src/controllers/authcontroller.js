const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {

      //check if user already exists
      const existingUser = await User.findOne({email})
      if(existingUser){
        return res.status(400).json({error:'email already in use'})
      }

    // Create a new user with the hashed password
    const user = await User.create({ username, email, password});

     // Generate a JWT token for the newly created user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);


     // Send the token as a response with status 201 (Created)
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


