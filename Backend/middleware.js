const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function AuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    req.user = user;
    return next();
  });
}

module.exports = AuthMiddleware;
