import Joi from "@hapi/joi";

const Validate = {
  register: (userInfo) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).required(),
      confirmPassword: Joi.ref("password"),
    });

    return schema.validate(userInfo);
  },
  login: (userInfo) => {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).required(),
    });

    return schema.validate(userInfo);
  },
};

export default Validate;
