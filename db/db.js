const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.REACT_APP_MONGO_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error(error.message);

    //exit the process
    process.exit(1);
  }
};

module.exports = connectDB;
