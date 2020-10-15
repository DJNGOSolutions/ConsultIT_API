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

BusinessService.createNewBusiness = async ({ legalName, comercialName, email, phoneNumber, address, state, city, businessLine, businessSector }) => {

    let serviceResponse = {
        success: true,
        content: {}
    }

    if(!legalName || !comercialName ||!email || !phoneNumber || !address || !state || !city || !businessLine || !businessSector){
        serviceResponse={
            success: false,
            content:{
                error: "A required field was not provided"
            }
        }
        return serviceResponse;
    }

    try{
        const newBusiness = new BusinessModel({legalName, comercialName, email, phoneNumber, address,state, city, businessLine, businessSector});
        console.log("New Business Model: " + newBusiness);
        const savedBusiness = await newBusiness.save();
        if (!savedBusiness) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Business could not be registered"
                }
            }     
            return serviceResponse;
        }
        
        serviceResponse.content = {
            message: "A new Business has been registered"
        }

        return serviceResponse;
        
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }

};

module.exports = BusinessService;