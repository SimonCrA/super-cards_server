const Joi = require('@hapi/joi')

//Sign up Validation
const signUpValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    lastname: Joi.string().min(3).required(),
    nickname: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    address: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(data);
}

//Log in Validation
const logInValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(data);
}

module.exports = {
  signUpValidation,
  logInValidation
}