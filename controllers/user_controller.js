const userModel = require("../models/UserModel");
const userRegistrationValidators = require("./validators/userRegistrationValidator");

const userControllers = {
  register: async (req, res) => {
    // get the registration data
    const data = req.body;

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
  },
};
