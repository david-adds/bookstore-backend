import mongoose, {mongo} from "mongoose";

async function connectToDatabase(process.env.DB_CONNECTION_STRING){
    await mongoose.connect();
    return mongoose.connection;
};

export default connectToDatabase;