const Joi = require("joi");

const UserSchema = Joi.object({
  username: Joi.string().alphanum().min(1).required(),
  password: Joi.string().min(6),
});

module.exports = UserSchema;
