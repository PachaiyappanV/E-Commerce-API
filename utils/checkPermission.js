const { UnauthorizedError } = require("../errors");

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin" || requestUser.userId === resourceUserId)
    return;
  throw new UnauthorizedError("You are not allowed to access this resource");
};

module.exports = {
  checkPermission,
};
