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

BusinessService.verifyCreateFields = ({ legalName, comercialName, email, phoneNumber, address, state, city, businessLine, businessSector }) => {

    let serviceResponse = {
        success: true,
        content: {
            message: "Fields OK"
        }
    }

    if(!legalName || !comercialName ||!email || !phoneNumber || !address || !state || !city || !businessLine || !businessSector){
        serviceResponse={
            success: false,
            content:{
                error: "A required field was not provided"
            }
        }
    }

    return serviceResponse;

};

BusinessService.createNewBusiness = async ({ legalName, comercialName, email, phoneNumber, address, state, city, businessLine, businessSector }) => {

    let serviceResponse = {
        success: true,
        content: {
            message: "A new Business has been registered"
        }
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
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }

};

BusinessService.findAll = async () => {
    let serviceResponse ={
        success: true,
        content:{}
    }
    
    try{
        const businesses = await BusinessModel.find();
        if(!businesses){
            serviceResponse = {
                success: false, 
                content: {
                    error: "Could not find any business"
                }
            }         
        } else {
            serviceResponse.content = {
            businesses,
            count: businesses.length
            }
        } 
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

BusinessService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Business deleted!"
        }
    }
    
    try{
        const businessDeleted = await BusinessModel.findByIdAndDelete(_id).exec();
        if (!businessDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Business could not be deleted"
                }
            }
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
}


module.exports = BusinessService;