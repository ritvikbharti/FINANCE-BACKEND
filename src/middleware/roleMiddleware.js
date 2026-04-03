import { sendResponse } from "../utils/response.js";

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendResponse(res, 401, false, "Not logged in");
    }

    if (!roles.includes(req.user.role)) {
      return sendResponse(res, 403, false, "Access denied for this role");
    }

    next();
  };
};