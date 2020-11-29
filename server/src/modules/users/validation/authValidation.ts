import Joi from 'joi';
const loginSchema:any = Joi.object({
    email:Joi.string()
    .required()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password:Joi.string()
    .min(6)
});
export = {loginSchema};