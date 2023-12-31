import mongoose, {mongo} from "mongoose";

async function connectToDatabase(){
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default connectToDatabase;