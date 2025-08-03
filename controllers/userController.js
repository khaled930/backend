const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getMyBalance = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
};

exports.getMyTransfers = async (req, res) => {
  const transactions = await Transaction.find({ from: req.user.id }).populate('to', 'fullName email');
  res.json(transactions);
};

exports.getMyIncomingTransfers = async (req, res) => {
  const transactions = await Transaction.find({ to: req.user.id }).populate('from', 'fullName email');
  res.json(transactions);
};
