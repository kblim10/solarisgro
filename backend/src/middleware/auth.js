const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Device = require('../models/Device');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

const deviceAuth = async (req, res, next) => {
  try {
    const token = req.header('X-Device-Token');
    
    if (!token) {
      throw new Error();
    }

    const device = await Device.findOne({ authToken: token });

    if (!device) {
      throw new Error();
    }

    req.device = device;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid device token.' });
  }
};

module.exports = {
  auth,
  deviceAuth
}; 