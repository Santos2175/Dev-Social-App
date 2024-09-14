require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db.js');
const cors = require('cors');
const path = require('path');

const PORT = process.env.REACT_APP_PORT || 8000;

console.log(__dirname);

const app = express();

//connect Database
connectDB();

//setting middlewares
app.use(express.json({ extended: true }));
app.use(cors());

//Define Routes
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));
app.use('/api/profile', require('./routes/api/profile.js'));
app.use('/api/posts', require('./routes/api/posts.js'));

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log('server started at PORT: ', PORT));
