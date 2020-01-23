const Joi = require("@hapi/joi");

//register validation
const userRegisterValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(4)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required(),
        address: Joi.string()
            .min(8)
            .required(),
        postcode: Joi.string()
            .min(7)
            .max(7)
            .required()
    });
    return schema.validate(data)
};

//login validation
const userLoginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(8)
        .required()
    });
    return schema.validate(data);
}

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userLoginValidation = userLoginValidation;