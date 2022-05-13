const Joi = require("joi");
const schemas = {
  user: Joi.object().keys({
    username: Joi.string()
      .case("lower")
      .min(4)
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.empty": `"username" cannot be an empty field`,
        "string.min": `"username" must have a minimum length of {#limit}`,
        "any.required": `"username" is a required`,
        "string.pattern.base": `"username" can only contain lowercase English alphabets`,
      }),
    fname: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.empty": `"fname" cannot be an empty field`,
        "any.required": `"fname" is a required`,
        "string.pattern.base": `"fname" can only contain English alphabets`,
      }),
    lname: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.empty": `"lname" cannot be an empty field`,
        "any.required": `"lname" is a required`,
        "string.pattern.base": `"lname" can only contain English alphabets`,
      }),
    password: Joi.string()
      .regex(/[a-z]{1,}/)
      .regex(/[A-Z]{1,}/)
      .regex(/[0-9]{1,}/)
      .regex(/[!@#$%&*]/, { invert: true })
      .min(5)
      .required()
      .messages({
        "string.empty": `"password" cannot be an empty field`,
        "string.min": `"password" must have a minimum length of {#limit}`,
        "any.required": `"password" is required`,
        "string.pattern.base": `"password" must contain at least 1 uppercase character, 1 lowercase character, 1 number.`,
        "string.pattern.invert.base": `"password" should not contain any special character.`,
      }),
  }),
};
module.exports = schemas;
