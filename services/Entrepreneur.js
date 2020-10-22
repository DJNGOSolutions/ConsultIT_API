const EntrepreneurModel = require('../models/Entrepreneur');
const debug = require("debug")("log");

const EntrepreneurService = {};

EntrepreneurService.verifyCreateFields = ({firstName, lastName, birthdate, phoneNumber, postalAddress, state, city}) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Fields OK"
        }
    }
    
    if(!firstName || !lastName || !birthdate || !phoneNumber || !postalAddress || !state || !city){
        let serviceResponse = {
            success: false,
            content: {
                message: "A required field was not provided"
            }
        }
    }
    
    return serviceResponse;
};

EntrepreneurService.createNewEntrepreneur = async ({ user, firstName, lastName, photo, birthdate, phoneNumber, postalAddress, state, city, businesses }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "A new Entrepreneur has been registered"
        }
    }
    
    try{
        const newEntrepreneur = new EntrepreneurModel({user, firstName, lastName, photo, birthdate, phoneNumber, postalAddress, state, city});

        if(!businesses) {
            const emptyBusinesses = [];
            newEntrepreneur.businesses = emptyBusinesses;
        }else{
            newEntrepreneur.businesses = businesses;
        }
        
        const savedEntrepreneur = await newEntrepreneur.save();
        if(!savedEntrepreneur) {
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

EntrepreneurService.findAll = async () => {
    let serviceResponse = {
        success: true, 
        content: {}
    }

    try{
        const entrepreneurs = await EntrepreneurModel.find();
        if(!entrepreneurs){
            serviceResponse = {
                success: false,
                content: {
                    error: "Could not find any entrepreneurs"
                }
            }
        }else{
            serviceResponse.content= {
                entrepreneurs,
                count: entrepreneurs.length,
                page,
                limit   
            } 
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

EntrepreneurService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Entrepreneur deleted!"
        }
    }
    
    try{
        const entrepreneurDeleted = await EntrepreneurModel.findByIdAndDelete(_id).exec();
        if(!entrepreneurDeleted) {
            serviceResponse = {
                success: false, 
                content: {
                    error: "Entrepreneur could not be deleted"
                }
            }
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
}

module.exports = EntrepreneurService;