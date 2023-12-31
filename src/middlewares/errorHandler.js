import mongoose from "mongoose";


// eslint-disable-next-line no-unused-vars
function errorHandler( error, req, res, next ) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "One or more passed data is incorrect." });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
    .map(error => error.message)
    .join("; ");

    res.status(400).send({message: `Error(s) Found: ${errorMessages}`})
  } else {
    res.status(500).send({message: "Server Internal Error."});
  }
}

export default errorHandler;
