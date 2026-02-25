import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connected to Ed-Agent DB"))
  .catch(err => console.error(err));