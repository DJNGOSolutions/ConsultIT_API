const BusinessSectorModel = require("../models/BusinessSector");
const debug = require("debug")("log");

const BusinessSectorService = {};

BusinessSectorService.verifyCreateFields = ({ name }) => {
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

BusinessSectorService.createNewBusinessSector = async ({ name }) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "A new Business Sector has been registered"
        }
    }

    try{
        const newBusinessSector = new BusinessSectorModel({name});
        console.log("New Business Sector Model: " + newBusinessSector );
        
        const savedBusinessSector = await newBusinessSector.save();
        if(!savedBusinessSector){
            serviceResponse = {
                success: false,
                content: {
                    error: "Business sector could not be registered"
                }
            }
        }

        return serviceResponse;
    }catch(error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }

};

BusinessSectorService.findAll = async () => {
    let serviceResponse = {
        success: true,
        content: {}
    }
    
    try {
        const businessessectors = await BusinessSectorModel.find();
        if(!businessessectors){
            serviceResponse = {
                success: false,
                content: {
                    error: "Could not find any business sectors"
                }
            }
        } else {
            serviceResponse.content = {
                businessessectors,
                count: businessessectors.length,
                page,
                limit
            }
        }
        return serviceResponse;
    } catch (error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
}

BusinessSectorService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Business sector deleted!"
        }
    }
    
    try{
        const businessSectorDeleted = await BusinessSectorModel.findByIdAndDelete(_id).exec(); 
        if(!businessSectorDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Business sector could not be deleted"
                }
            }
        }

        return serviceResponse;
    } catch (error) {
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
}

module.exports = BusinessSectorService;