import BaseError from "./baseError.js";

class IncorrectRequest extends BaseError {
    constructor(message = "One data or more is incorrect") {
        super(message, 400);
    }
}

export default IncorrectRequest;