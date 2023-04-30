// require("dotenv").config({ path: "../config/.env" });
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  //if no auth header in request
  if (!authHeader) res.sendStatus(401);
  console.log(authHeader); //Bearer token;

  //taking token & verifying it
  const reqToken = authHeader.split(" ")[1];
  jwt.verify(reqToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token // access forbidden

    req.email = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
