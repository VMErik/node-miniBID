// This help us to validation rules
const joi = require('joi');

// Create the funtion to validate the body to register
const registerValidation = (data) => {
    const schemaValidation = joi.object({
            name: joi.string().required().min(3).max(200),
            username: joi.string().required().min(3).max(256),
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024)
        })
        // Send data to the function to validate
    return schemaValidation.validate(data);
}


const loginValidation = (data) => {
    const schemaValidation = joi.object({
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024)
        })
        // Send data to the function to validate
    return schemaValidation.validate(data);
}

const itemValidation = (data) => {
    const schemaValidation = joi.object({
            item_title: joi.string().required().min(3),
            item_condition: joi.string().required().min(3).max(4),
            item_ownerinfo: joi.string().required().min(3).max(200),
            item_auctionexpiration: joi.date().required(),
        })
        // Send data to the function to validate
    return schemaValidation.validate(data);
}


const auctionValidation = (data) => {
    const schemaValidation = joi.object({
            auction_itemid: joi.string().required().min(24).max(24),
            auction_price: joi.number().required(),
        })
        // Send data to the function to validate
    return schemaValidation.validate(data);
}


// Export the validation
module.exports.registerValidation = registerValidation;
// Validation for Login
module.exports.loginValidation = loginValidation;
// Vaalidate item validation
module.exports.itemValidation = itemValidation;
// Vaalidate auction validation
module.exports.auctionValidation = auctionValidation;