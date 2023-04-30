const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

let signupController = async (req, res) => {
  try {
    console.log("GOT A SIGNUP REQUEST");
    //will receive pic of user as well
    console.log(JSON.stringify(req.body));
    console.log(req.body);

    const { email, password, firstName, lastName } = req.body;

    //if either email or password is empty
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "email or password is required." });
    }

    //Check if the email already exists
    let user = await User.findOne({ email: email });
    if (user) {
      res
        .sendStatus(409)
        .json({ success: false, message: "email already exists" });
      return;
    }

    console.log("IM HEREEREEEEEEEEEEE");
    const hashedPwd = await bcrypt.hash(password, saltRounds);

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

    const userDetails = {
      email: email,
      password: hashedPwd,
      firstName,
      lastName,
      refreshToken,
    };

    user = await User.create(userDetails);
    console.log(user);

    //before sending it to client:

    /*
     * deleting password from userDetails object
     * deleting refreshToken from userDetails object as it is added as an httpOnly cookie
     */
    delete userDetails.password;
    delete userDetails.refreshToken;

    //adding accessToken & necessary details to userDetails object
    userDetails.accessToken = accessToken;
    userDetails.id = user._id.toString();
    userDetails.isAdminUser = user.isAdminUser;
    userDetails.organizationIds = user.organizationIds;
    userDetails.projectKeys = user.projectKeys;

    //responding to frontend client
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    }); //secure: true - only serves on https

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userDetails,
    });
    return;
    // res.;
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Could not sign up user" });
  }
};

module.exports = signupController;
