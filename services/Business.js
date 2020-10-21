const BusinessModel = require('../models/Business');
const debug = require("debug")("log");

const BusinessService = {};

BusinessService.test = () => {
    let serviceResponse = {
        success: true,
        content: {
            message: "This sht works!"
        }
    };
    return serviceResponse;
};

module.exports = BusinessService;