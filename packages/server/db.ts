import mongoose from 'mongoose';

const connectDB = (connectionStr) => {
    mongoose.set('strictQuery', false);


    return mongoose.connect(connectionStr)
}


export default connectDB;