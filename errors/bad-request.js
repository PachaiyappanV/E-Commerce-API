const {
  StatusCodes: { BAD_REQUEST },
} = require("http-status-codes");
const { CustomAPIError } = require("./custom-api-error");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = {
  BadRequestError,
};
