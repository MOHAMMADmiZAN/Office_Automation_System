const mongoose = require('mongoose');
/**
 * @description: connect to mongodb
 * @param connectionStr
 * @returns {Promise<Mongoose>}
 */
const connectDB = (connectionStr) => {
    mongoose.set('strictQuery', false);

    return mongoose.connect(connectionStr)
}


export default connectDB;