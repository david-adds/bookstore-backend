import IncorrectRequest from "./incorrectRequest.js";

class ValidationError_ extends IncorrectRequest {
    constructor(error) {
        const errorMessages = Object.values(error.errors)
        .map(error => error.message)
        .join("; ");

        super(`Error(s) Found: ${errorMessages}`, 400);
    }
}

export default ValidationError_;