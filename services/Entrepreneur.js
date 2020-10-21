const Entrepreneur = require('../models/Entrepreneur');
const debug = require("debug")("log");

const EntrepreneurService = {};

EntrepreneurService.verifyCreateFields = ({ user, firstName, lastName, photo, birthdate, phoneNumber, postalAddress, state, city, businesses }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Fields OK"
        }
    }
    
    if(!user || !firstName || !lastName || !photo || !birthdate || !phoneNumber || !postalAddress || !state || !city || !businesses){
        serviceResponse = {
            success: false,
            content: {
                message: "A required field was not provided"
            }
        }
    }
    
    return serviceResponse;
};

module.exports = EntrepreneurService;