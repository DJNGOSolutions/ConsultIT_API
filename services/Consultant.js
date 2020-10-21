const Business = require("../models/Business");
const ConsultantModel = require("../models/Consultant");
const debug = require("debug")("log");

const ConsultantService = {};

ConsultantService.verifyCreateFields = ({ firstName, lastName, birthdate, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType }) => {
    let serviceRespone = {
        success: true,
        content: {
            message: "Fields OK"
        }
    }
    
    if(!firstName || !lastName || !birthdate || !referencePrice || !historicAveragePrice || !phoneNumber || !consultantType){
        serviceRespone = {
            success: false, 
            content:{
                error: "A required field was not provided"
            }
        }
    }
    
    return serviceRespone;
};

ConsultantService.createNewConsultant = async ({ firstName, lastName, birthdate, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType }) => {
    let serviceRespone = {
        success: true, 
        content: {
            message: "A new Consultant has been registered"
        }
    }
    
    try{
        const newConsultant = new ConsultantModel({firstName, lastName, birthdate, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType});
        console.log("New Consultant Model: "+ newConsultant);
        
        const savedConsultant = await newConsultant.save();
        if(!savedConsultant) {
            serviceRespone = {
                success: false, 
                content: {
                    error: "Consultant could not be registered"
                }
            }
        }
        return serviceRespone;

    } catch (error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

ConsultantService.findAll = async () => {
    let serviceRespone = {
        success: true,
        content: {}
    }
    
    try{
        const consultants =  await ConsultantModel.find();
        if(!consultants){
            serviceRespone = {
                success: false,
                content:{
                 error: "Could not find any consultants"
                }
            }
        } else {
            serviceRespone.content = {
                consultants,
                count: consultants.length
            }
        }
        return serviceRespone;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

ConsultantService.deleteOneByID = async (_id) => {
    let serviceRespone = {
        success: true,
        content: {
            message: "Consultant deleted!"
        }
    }
    
    try {
        const consultantDeleted = await ConsultantModel.findByIdAndDelete(_id).exec();
        if(!consultantDeleted){
            serviceRespone = {
                success: false,
                content: {
                    error: "Consultant could not be deleted"
                }
            }
        }
        return serviceRespone;
    }catch(error){
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
};

module.exports = ConsultantService;