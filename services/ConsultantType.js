const ConsultantTypeModel = require("../models/ConsultantType");
const debug = require("debug")("log");

const ConsultantType = {};

ConsultantTypeService.verifyCreateFields = ({ name }) => {
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

ConsultantTypeService.createNewConsultantType = async ({ name }) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "A new Consultant Type has been registered"
        }
    }

    try{
        const newConsultantType = new ConsultantTypeModel({name});
        console.log("New Consultant Type Model: " + newConsultantType );
        
        const savedConsultantType = await newConsultantType.save();
        if(!savedConsultantType){
            serviceResponse = {
                success: false,
                content: {
                    error: "Consultant Type not be registered"
                }
            }
        }

        return serviceResponse;
    }catch(error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }

};

ConsultantTypeService.findAll = async () => {
    let serviceResponse = {
        success: true,
        content: {}
    }
    
    try {
        const consultantstypes = await ConsultantTypeModel.find();
        if(!consultantstypes){
            serviceResponse = {
                success: false,
                content: {
                    error: "Could not find any Consultant Type"
                }
            }
        } else {
            serviceResponse.content = {
                consultantstypes,
                count: consultantstypes.length
            }
        }
        return serviceResponse;
    } catch (error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
}

ConsultantTypeService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Consultant type deleted!"
        }
    }
    
    try{
        const ConsultantTypeDeleted = await ConsultantTypeModel.findByIdAndDelete(_id).exec(); 
        if(!ConsultantTypeDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Consultant type could not be deleted"
                }
            }
        }

        return serviceResponse;
    } catch (error) {
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
}

module.exports = ConsultantTypeService;