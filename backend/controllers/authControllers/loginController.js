const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let loginController = async (req, res) => {
  try {
    console.log("GOT A Login REQUEST");
    const { email, password } = req.body;

    //if either email or password is empty
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email or password is required." });
    }

    //find a user from db via email
    // console.log(userDetails);
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Incorrect email"); //incorrect email

    //compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    console.log(`passwordsMatch: ${passwordsMatch}`);
    if (!passwordsMatch) throw new Error("Incorrect password"); //incorrect password

    //create JWTs here
    const accessToken = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    console.log(user);
    // updating the user document by adding the refresh token
    // const updatedUser = await User.findOneAndUpdate(
    //   { _id: user._id },
    //   { ...user, refreshToken: refreshToken }
    // );

    const updatedUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { refreshToken: refreshToken } }
      // { lean: true }
    );

    //removing sensitive user data before responding
    // delete updatedUser.password;
    // delete updatedUser.refreshToken;
    console.log("---------------------------------");
    console.log(updatedUser.firstName);
    let userDetails = {
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      accessToken,
      isAdminUser: updatedUser.isAdminUser,
      organizationIds: updatedUser.organizationIds,
      projectKeys: updatedUser.projectKeys,
    };
    console.log("check before this");
    //setting the refresh token as a httpOnly cookie
    //setting max age to 1d
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    }); //secure: true - only serves on https

    //responding to frontend client with access token
    res.json({
      success: true,
      message: "User successfully logged in",
      userDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = loginController;
