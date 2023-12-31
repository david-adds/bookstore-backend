import mongoose from "mongoose";


// eslint-disable-next-line no-unused-vars
function errorHandler( error, req, res, next ) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "One or more passed data is incorrect." });
  } else {
    res.status(500).json({message: "Server Internal Error."});
  }
}

export default errorHandler;
