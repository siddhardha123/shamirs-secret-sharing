const Joi = require('joi')

const isValidRegisterData = async (body) => {
    return Joi.object({
        name: Joi.string().required(),
        user_name: Joi.string().required(),
        password: Joi.string().required(),
        share_count: Joi.number().integer().min(1).required(),
        threshold: Joi.number().integer().min(1).required(),
    }).validateAsync(body);
};

const isValidLoginData = async(body) => {
    return Joi.object({
        user_name: Joi.string().required(),
        password: Joi.string().required(),
        shares: Joi.array().items(Joi.string()),
    }).validateAsync(body);
}

module.exports = {isValidRegisterData,isValidLoginData}
