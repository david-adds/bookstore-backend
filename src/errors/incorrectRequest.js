import ErrorBase from "./baseError.js";

class IncorrectRequest extends ErrorBase {
    constructor(message = "One data or more is incorrect") {
        super(message, 400);
    }
}

export default IncorrectRequest;