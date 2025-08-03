const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');
const adminRoutes = require('./routes/admin');
const { authenticate } = require('./middleware/auth');

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authenticate, userRoutes);
app.use('/api/transaction', authenticate, transactionRoutes);
app.use('/api/admin', authenticate, adminRoutes);

// DB & Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
