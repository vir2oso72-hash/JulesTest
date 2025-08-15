const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
const db = 'mongodb://localhost:27017/dashboard-app';

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'dashboard-ui', 'dist')));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dashboard-ui', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
