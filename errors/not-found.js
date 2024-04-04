const {
  StatusCodes: { NOT_FOUND },
} = require("http-status-codes");
const { CustomAPIError } = require("./custom-api-error");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = {
  NotFoundError,
};
