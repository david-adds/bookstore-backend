import mongoose from "mongoose";
import ErrorBase from "../errors/baseError.js";
import IncorrectRequest from "../errors/incorrectRequest.js";
import ValidationError_ from "../errors/validationError.js";


// eslint-disable-next-line no-unused-vars
function errorHandler( error, req, res, next ) {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError_(error).sendResponse(res);
  } else {
    new ErrorBase().sendResponse(res);
  }
}

export default errorHandler;
