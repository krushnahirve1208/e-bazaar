const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../model/User");

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized,expired token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized,no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error("not authorized as admin");
  }
};
module.exports = { admin, protect };
