const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");
const userRegistrationValidators = require("./validators/userRegistrationValidator");
const userLoginValidators = require("./validators/userLoginValidator");
const userEditPersonalInfoValidator = require("./validators/userEditPersonalInfoValidator");

const userControllers = {
  register: async (req, res) => {
    // get the registration data
    const data = req.body;

    // validate the registration data
    const validationResult =
      userRegistrationValidators.registerSchema.validate(data);
    if (validationResult.error) {
      res.statusCode = 400;

      return res.json({
        msg: validationResult.error.details[0].message,
      });
    }

    // search for any existing registered email, return err if so
    try {
      const user = await userModel.findOne({ email: data.email });
      if (user) {
        res.statusCode = 400;
        return res.json({
          msg: "user with email exists, use another email",
        });
      }
    } catch (err) {
      res.statusCode = 500;
      return res.json({
        msg: "failed to check for duplicates",
      });
    }

    // apply hashing algo (bcrypt) to given password. Harsh the pw & store in DB
    const hash = await bcrypt.hash(data.password, 10);

    // use user model to create a new user
    try {
      await userModel.create({
        name: data.name,
        email: data.email,
        password: hash,
      });
    } catch (err) {
      res.statusCode = 500;
      return res.json({
        msg: "failed to create user",
      });
    }

    // return response
    res.json();
  },

  login: async (req, res) => {
    // get the login data
    const data = req.body;

    // validate the login data
    const validationResult = userLoginValidators.loginSchema.validate(data);

    if (validationResult.error) {
      res.statusCode = 400;
      return res.json({
        msg: validationResult.error.details[0].message,
      });
    }

    // check if user exists by the user (email), return login error (status 400) if do not exist

    let user = null;

    try {
      user = await userModel.findOne({ email: data.email });
    } catch (err) {
      res.statusCode = 500;
      return res.json({
        msg: "error occurred when fetching user",
      });
    }

    if (!user) {
      res.statusCode = 401;
      return res.json({
        msg: "login failed, please check login details",
      });
    }

    // use bcrypt to compare given password against DB record, return status 401 (unauthorized) if failed

    const validLogin = await bcrypt.compare(data.password, user.password);

    if (!validLogin) {
      res.statusCode = 401;
      return res.json({
        msg: "login failed, please check login details",
      });
    };

  // generate JWT using an external lib
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    process.env.APP_KEY,
    {
      expiresIn: "10 days",
      audience: "FE",
      issuer: "BE",
      subject: user._id.toString(), // _id from Mongoose is type of ObjectID,
    }
  );

  // return response with JWT
  res.json({
    msg: "login successful",
    token: token,
  });
},

editpersonalinfo: async (req, res) => {
  // Get the user ID from the authenticated request
  const userId = req.user._id;

  // Get the updated personal information
  const data = req.body;

  // Validate the updated personal information
  const validationResult = userEditPersonalInfoValidator.updatePersonalInfoSchema.validate(data);
  if (validationResult.error) {
    res.statusCode = 400;
    return res.json({
      msg: validationResult.error.details[0].message,
    });
  }

  // Update the user's personal information in the database
  try {
    await userModel.findByIdAndUpdate(userId, {
      name: data.name,
      email: data.email,
      password: data.password,
      mobile: data.mobile,
      address: data.address,
      postcode: data.postcode,
    });
  } catch (err) {
    res.statusCode = 500;
    return res.json({
      msg: "failed to update user information",
    });
  }

  // Return a success response
  res.json({
    msg: "user information updated successfully",
  });
},

};

module.exports = userControllers;