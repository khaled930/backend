const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.transfer = async (req, res) => {
  const { toEmail, amount } = req.body;

  try {
    const fromUser = await User.findById(req.user.id);
    const toUser = await User.findOne({ email: toEmail });

    if (!toUser || !toUser.isActive) {
      return res.status(400).json({ error: 'Recipient not found or inactive' });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // خصم وإضافة الرصيد
    fromUser.balance -= amount;
    toUser.balance += amount;

    // حفظ بدون معاملات Mongo (بسيط وآمن للمحلي)
    await fromUser.save();
    await toUser.save();

    const tx = new Transaction({ from: fromUser._id, to: toUser._id, amount });
    await tx.save();

    res.json({ message: 'Transfer successful' });
  } catch (err) {
    res.status(500).json({ error: 'Transfer failed', details: err });
  }
};
