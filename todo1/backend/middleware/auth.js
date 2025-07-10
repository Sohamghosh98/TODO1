const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
};
