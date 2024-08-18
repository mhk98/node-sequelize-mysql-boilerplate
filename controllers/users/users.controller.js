const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.user;
const { generateToken } = require('../../utils/jwt_token');

exports.signup = async (req, res) => {
  try {
    const { Name, Email, Password, role } = req.body;
    const data = {
      Name,
      Email,
      Password,
      role,
      image: req.file ? req.file.path || "" : "",
    };

    console.log(req.body);
    console.log(req.file);
    const isUserExist = await User.findOne({
      where: { Email: req.body.Email },
    });

    if (isUserExist) {
      return res.status(409).send("User already exist");
    }

    const user = await User.create(data);
    res.status(200).send({
      status: "Success",
      message: "Successfully signed up",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Username or password is not curret",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    //checking refresh token from cookies
    // console.log("cookie", req.cookies);
    const user = await User.findAll();

    res.status(200).send({
      status: "Success",
      message: "This is your all data",
      data: user,
    });
  } catch (error) {
    

    res.status(500).json({
      status: "fail",
      message: "No data found",
      error: error.message,
    });
  }
};
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const users = req.body;
    // console.log(req.body);
    const user = await User.findOne({
      where: { Id: id },
    });

    if (!user) {
      return res.status(401).send({
        status: "fail",
        message: "No user found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "This is your information",
      data: user,
    });
  } catch (error) {
   

    res.status(500).json({
      status: "fail",
      message: "User not found",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const users = req.body;
    // console.log(req.body);
    const user = await User.findOne({
      where: { Id: id },
    });

    if (!user) {
      return res.status(401).send({
        status: "fail",
        message: "No user found",
      });
    }

    const result = await User.destroy({ where: { Id: id } });
    res.status(200).send({
      status: "Success",
      message: "Successfully delete user",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "User not found",
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log(req.body);

    // Validate request data
    if (!Email || !Password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both email and password.",
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user found with this email. Please create an account first.",
      });
    }

    // Validate password
    const isPasswordValid = bcrypt.compareSync(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "Incorrect password or email.",
      });
    }

    // Generate JWT access token
    const accessToken = generateToken(user)

    // Set access token in cookie
    const cookieOptions = {
      secure: process.env.NODE_ENV === "production", // Fixed environment check
      httpOnly: true,
    };
    res.cookie("accessToken", accessToken, cookieOptions);

    // Send response
    res.status(200).json({
      status: "success",
      message: "Logged in successfully.",
      data: {
        accessToken,
        user, // Consider sending only necessary user data, not the entire user object
      },
    });
  } catch (error) {
    console.error("Login Error: ", error); // Log the error for debugging

    res.status(500).json({
      status: "fail",
      message: "An error occurred during login. Please try again later.",
      error: error.message,
    });
  }
};


exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    let verifiedToken = null;

    //refresh token verify
    try {
      verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return res.send("Invalid refresh token");
    }

    const { Email, role } = verifiedToken;

    //Check delete user refresh token
    const isUserExist = await User.findOne({
      where: { Email: Email },
    });

    if (!isUserExist) {
      return res.send("User does not exist");
    }

    //Generate new token
    const newAccessToken = jwt.sign(
      { Email: Email, role: role },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "365d",
      }
    );

    //set refresh token into cookie
    const cookieOptions = {
      secure: process.env === "production" ? true : false,
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).send({
      status: "Success",
      message: "Logged in successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.forgotPassword = async (req, res) => {
  // console.log('update_user', req.body);
  try {
    const { Password, Email } = req.body;

    if (!Email) {
      return res.send("Email not found");
    }

    const user = await User.findOne({ Where: { Email: Email } });

    if (!user) {
      return res.send("User not found");
    }

    const salt = await bcrypt.genSaltSync(10);
    user.Password = bcrypt.hashSync(Password, salt);
    // Update the user's password and hash it

    // Save the updated user
    await user.save();

    console.log("userInfo", user);

    // const result = await User.update(req.body, { where: { Email: email } });
    // if (!result) {
    //   return res.send("Result not found");
    // }
    res.status(200).send({
      status: "Success",
      message: "Successfully role update",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Not update role",
      error: error.message,
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.destroy({
      where: { Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No result found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete user",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await User.update(data, {
      where: { Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No result found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update your user",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};