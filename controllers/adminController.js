const User = require('../models/User');

exports.listUsers = async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
};

exports.toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.isActive = !user.isActive;
  await user.save();
  res.json({ message: 'User status updated', isActive: user.isActive });
};
