const BusinessLineModel = require("../models/BusinessLine");
const debug = require("debug")("log");

const BusinessLineService = {};

BusinessLineService.verifyCreateFields = ({ name }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Fields OK"
        }
    }
    
    if(!name){
        serviceResponse={
            success: false,
            content: {
                error: "A required field was not provided"
            }
        }
    }
    
    return serviceResponse;
};

BusinessLineService.createNewBusinessLine = async ({ name }) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "A new Business Line has been registered"
        }
    }

    try{
        const newBusinessLine = new BusinessLineModel({name});
        console.log("New Business Line Model: " + newBusinessLine );
        
        const savedBusinessLine = await newBusinessLine.save();
        if(!savedBusinessLine){
            serviceResponse = {
                success: false,
                content: {
                    error: "Business could not be registered"
                }
            }
        }

        return serviceResponse;
    }catch(error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }

};

BusinessLineService.findAll = async () => {
    let serviceResponse = {
        success: true,
        content: {}
    }
    
    try {
        const businesseslines = await BusinessLineModel.find();
        if(!businesseslines){
            serviceResponse = {
                success: false,
                content: {
                    error: "Could not find any businesses lines"
                }
            }
        } else {
            serviceResponse.content = {
                businesseslines,
                count: businesseslines.length
            }
        }
        return serviceResponse;
    } catch (error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
}

BusinessLineService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Business line deleted!"
        }
    }
    
    try{
        const businessLineDeleted = await BusinessLineModel.findByIdAndDelete(_id).exec(); 
        if(!businessLineDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Business line could not be deleted"
                }
            }
        }

        return serviceResponse;
    } catch (error) {
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
}

module.exports = BusinessLineService;