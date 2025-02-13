const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://rajababu:rajababu@cluster0.bpwiq.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {

    console.error('my error :',error);
    process.exit(1);
  }
};

module.exports = connectDB;
