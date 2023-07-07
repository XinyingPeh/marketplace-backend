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
  },
};
