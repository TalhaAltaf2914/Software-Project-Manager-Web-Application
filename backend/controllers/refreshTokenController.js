const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

let refreshTokenController = async (req, res) => {
  try {
    console.log("GOT A Refresh Token REQUEST");
    const cookies = req.cookies;

    //cookies or jwt is empty?
    if (!cookies?.jwt) {
      return res.sendStatus(401);
    }
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;
    //find a user from db via refreshToken
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403); //Forbidden

    //evaluate jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        //checking for error or token tampering
        if (err || user.email !== decoded.email) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10m" }
        );

        res.json({ success: true, accessToken });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(403).json({ success: false, message: err.message });
  }
};

module.exports = refreshTokenController;
