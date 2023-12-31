import BaseError from "./baseError.js";

class NotFound extends BaseError {
  constructor(message = "Page Not Found") {
    super(message, 404);
  }
}

export default NotFound;