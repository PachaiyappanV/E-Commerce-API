const {
  StatusCodes: { FORBIDDEN },
} = require("http-status-codes");
const { CustomAPIError } = require("./custom-api-error.js");

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = {
  UnauthorizedError,
};
