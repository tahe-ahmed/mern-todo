const Joi = require("joi");

const schema = {
  userRegister: Joi.object({
    displayName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  }),
  userLogin: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
  }),
  newTodo: Joi.object({
    title: Joi.string().min(4).max(30).required(),
    content: Joi.string().min(8).required(),
    isComplete:Joi.boolean(),
  }),
  updateTodo: Joi.object({
    title: Joi.string().min(4).max(30),
    content: Joi.string().min(8),
    isComplete:Joi.boolean(),
  }),
  
};


module.exports = {
  userRegisValidation: async (req, res, next) => {
    const value = schema.userRegister.validate(req.body);
    if (value.error) res.status(400).json({ msg: value.error.details[0].message });
    else next();
  },
  userLoginValidation: async (req, res, next) => {
    const value = schema.userLogin.validate(req.body);
    if (value.error) res.status(400).json({ msg: value.error.details[0].message });
    else next();
  },
  newTodoValidation: async (req, res, next) => {
    const value = schema.newTodo.validate(req.body);
    if (value.error) res.status(400).json({ msg: value.error.details[0].message });
    else next();
  },
  updateTodoValidation: async (req, res, next) => {
    const value = schema.updateTodo.validate(req.body);
    if (value.error) res.status(400).json({ msg: value.error.details[0].message });
    else next();
  },
};