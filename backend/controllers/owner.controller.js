const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/owner.model');

const registerOwner = async (req, res) => {
  const { name, email, number, password } = req.body;
  try {
    let owner = await Owner.findOne({ email });
    if (owner) {
      return res.status(400).json({ msg: 'Owner already exists' });
    }
    owner = new Owner({ name, email, number, password });
    const salt = await bcrypt.genSalt(10);
    owner.password = await bcrypt.hash(password, salt);
    await owner.save();

    const payload = { owner: { id: owner.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const loginOwner = async (req, res) => {
  const { email, password } = req.body;
  try {
    let owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { owner: { id: owner.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { registerOwner, loginOwner };