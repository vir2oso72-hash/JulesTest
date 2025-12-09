require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/schools', require('./routes/api/schools'));
app.use('/api/banddirectors', require('./routes/api/bandDirectors'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/instruments', require('./routes/api/instruments'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'dashboard-ui', 'dist')));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dashboard-ui', 'dist', 'index.html'));
});

// Sync database
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
});
