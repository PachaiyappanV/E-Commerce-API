const {
  StatusCodes: { UNAUTHORIZED },
} = require("http-status-codes");
const { CustomAPIError } = require("./custom-api-error");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = {
  UnauthenticatedError,
};
