import Joi from 'joi';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(24).required(),
  username: Joi.string().min(4).max(20).required(),
  firstname: Joi.string().min(2).max(24).required(),
  lastname: Joi.string().min(2).max(24).required(),
  avatar: Joi.string(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(24).required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).max(24),
  username: Joi.string().min(4).max(20),
  firstname: Joi.string().min(2).max(24),
  lastname: Joi.string().min(2).max(24),
  avatar: Joi.string(),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  body: Joi.string().required(),
  author: Joi.string().required()
});

const updatePostSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  body: Joi.string(),
});

const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({
      errors: err.details,
    });
  }
};

export const signupValidation = validate(signupSchema);
export const signinValidation = validate(signinSchema);
export const updateUserValidation = validate(updateUserSchema);
export const postValidation = validate(postSchema);
export const updatePostValidation = validate(updatePostSchema);
