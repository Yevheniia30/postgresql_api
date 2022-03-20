const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

module.exports = function (role) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "User is  unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== role) {
      return res.status(403).json({ message: "No access" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "User is  unauthorized" });
  }
};
