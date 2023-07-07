const Joi = require("joi");

const userEditPersonalInfoValidators = {
    updatePersonalInfoSchema: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      'any.required': 'Password is required.',
    }),
    mobile: Joi.number().integer().min(10000000).max(99999999).required().messages({
        'number.base': 'Mobile number must be a numeric value',
        'number.integer': 'Mobile number must be an integer',
        'number.min': 'Mobile number must be at least 8 digits long',
        'number.max': 'Mobile number cannot exceed 8 digits',
        'any.required': 'Mobile number is required',
      }),
      address: Joi.string(),
      postcode: Joi.number().required(),
    }),
  };

module.exports = userEditPersonalInfoValidators;
