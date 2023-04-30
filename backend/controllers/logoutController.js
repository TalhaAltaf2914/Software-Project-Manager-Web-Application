const User = require("../models/UserModel");

let logoutController = async (req, res) => {
  try {
    //on client also delete the access token
    console.log("GOT A logout REQUEST");
    const cookies = req.cookies;

    //if either email or password is empty
    if (!cookies?.jwt) {
      return res.sendStatus(204); //no content
    }
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;

    //is refreshToken in db?
    const user = await User.findOne({ refreshToken });

    //refreshToken not in db:
    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000, not needed when clearing cookie
        sameSite: "None",
        secure: true,
      });

      return res.sendStatus(204);
    }

    //delete refreshToken in db
    // user.updateOne({ ...user, refreshToken: "" });
    const updatedUser = await User.updateOne(
      { _id: user._id },
      { $set: { refreshToken: "" } }
    );

    console.log(
      `LOGOUT:\nEmptied refresh token from user's document: \n${updatedUser}`
    );

    res.clearCookie("jwt", {
      httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000, not needed when clearing cookie
      sameSite: "None",
      secure: true,
    }); //secure: true - (can serve on localhost apparently) only serves on https

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(403).json({ success: false, message: err.message });
  }
};

module.exports = logoutController;
