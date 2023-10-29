const Joi = require('joi')

const isValidRegisterData = async (body) => {
    return Joi.object({
        name: Joi.string().required(),
        email : Joi.string().email().required(),
        password: Joi.string().required(),
        share_count: Joi.number().integer().min(1).required(),
        threshold: Joi.number().integer().min(1).required(),
    }).validateAsync(body);
};

const isValidLoginData = async(body) => {
    return Joi.object({
        email : Joi.string().email().required(),
        password: Joi.string().required(),
        shares: Joi.array().items(Joi.string()),
    }).validateAsync(body);
}

const isValidSendOtp = async(body)=> {
    return Joi.object({
        email : Joi.string().email().required()
    }).validateAsync(body)
}


module.exports = {isValidRegisterData,isValidLoginData,isValidSendOtp}
