require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db.js');
const cors = require('cors');

const PORT = process.env.PORT || 8000;

const app = express();

//connect Database
connectDB();

//setting middlewares
app.use(express.json({ extended: true }));
app.use(cors());

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log('server started at PORT: ', PORT));
