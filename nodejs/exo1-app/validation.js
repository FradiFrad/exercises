const Joi = require("joi");

const UserSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(6).required(),
});

module.exports = UserSchema;
