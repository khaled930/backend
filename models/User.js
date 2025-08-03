const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  balance: { type: Number, default: 1000000 },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
