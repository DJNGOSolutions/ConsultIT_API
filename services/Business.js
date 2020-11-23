const BusinessModel = require('../models/Business');
const debug = require("debug")("log");

const EntrepreneurService = require('../services/Entrepreneur');

const BusinessService = {};

BusinessService.test = () => {
    let serviceResponse = {
        success: true,
        content: {
            message: "This works!"
        }
    };
    return serviceResponse;
};

BusinessService.verifyCreateFields = ({ legalName, comercialName, email, phoneNumber, address, state, city, businessLine, businessSector }) => {

    let serviceResponse = {
        success: true,
        content: {
            message: "Los campos son correctos"
        }
    }

    if(!legalName || !comercialName ||!email || !phoneNumber || !address || !state || !city || !businessLine || !businessSector){
        serviceResponse={
            success: false,
            content:{
                error: "Un o más campos necesarios no fueron proporcionados"
            }
        }
    }

    return serviceResponse;

};

BusinessService.createNewBusiness = async ({ legalName, comercialName, email, phoneNumber, address, state, city, businessLine, businessSector }) => {

    let serviceResponse = {
        success: true,
        content: {
            message: "Se ha registrado un nuevo Negocio"
        }
    }


    try{
        const newBusiness = new BusinessModel({legalName, comercialName, email, phoneNumber, address,state, city, businessLine, businessSector});

        const savedBusiness = await newBusiness.save();
        if (!savedBusiness) {
            serviceResponse = {
                success: false,
                content: {
                    error: "El Negocio no pudo ser registrado"
                }
            }     
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }

};

BusinessService.createNewBusiness_Entrepreneur = async (legalName, comercialName, email, phoneNumber, address, state, city, businessLine, businessSector, owner) => {

    let serviceResponse = {
        success: true,
        content: {
            message: "Se ha creado un nuevo Negocio con un Emprendedor asociado"
        }
    }


    try{
        const newBusiness = new BusinessModel({legalName, comercialName, email, phoneNumber, address,state, city, businessLine, businessSector, owner});
        console.log("New Business Model: " + newBusiness);

        const savedBusiness = await newBusiness.save();
        if (!savedBusiness) {
            serviceResponse = {
                success: false,
                content: {
                    error: "El negocio no pudo ser registrado"
                }
            }     
        }
        serviceResponse.business = newBusiness;
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }

};

BusinessService.findOneBusinessByUser = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "El Business fue encontrado"
        }
    }
    
    try{
        const business = await BusinessModel.findOne({ user: _id });
        if (!business) {
            serviceResponse  = {
                success: false,
                content: {
                    error: "El Business no se encontró"
                }
            }
        } else {
            serviceResponse.content = business;
        }
        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error.");
    }
};

BusinessService.findAll = async () => {
    let serviceResponse ={
        success: true,
        content:{}
    }
    
    try{
        const businesses = await BusinessModel.find();
        console.log("FOUND: " + businesses);
        if(!businesses){
            serviceResponse = {
                success: false, 
                content: {
                    error: "No se encontró ningún Negocio"
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
            message: "Se ha borrado el Negocio"
        }
    }
    
    try{
        const businessDeleted = await BusinessModel.findByIdAndDelete(_id).exec();
        if (!businessDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "No se pudo borrar el Negocio"
                }
            }
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
};

BusinessService.verifyUpdateFields = ({ legalName, comercialName, email, phoneNumber, address, state, city, businessLine, businessSector }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }
    
    if (!legalName && !comercialName && !email && !phoneNumber && !address && !state && !city && !businessLine && !businessSector){
        serviceResponse = {
            success: false,
            content: {
                error: "No se especifico ningún campo para actualizar"
            }
        }
        
        return serviceResponse;
    }
    
    if(legalName) serviceResponse.content.legalName = legalName;
    if(comercialName) serviceResponse.content.comercialName = comercialName;
    if(email) serviceResponse.content.email = email;
    if(phoneNumber) serviceResponse.content.phoneNumber = phoneNumber;
    if(address) serviceResponse.content.address = address;
    if(state) serviceResponse.content.state = state;
    if(city) serviceResponse.content.city = city;
    if(businessLine) serviceResponse.content.businessLine = businessLine;
    if(businessSector) serviceResponse.content.businessSector = businessSector;
    
    return serviceResponse;
};

BusinessService.updateConsultantById = async (business, newBusinessData) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "El Negocio se ha actualizado"
        }
    }
    
    try{
        Object.keys(newBusinessData).forEach(key => {
            business[key] = newBusinessData[key];
        });
        const updatedBusiness = await business.save()

        if(!updatedBusiness) {
            serviceResponse = {
                success: false,
                content: {
                    error: "El Negocio no se pudo actualizar"
                }
            }
        } else {
            serviceResponse.content = updatedBusiness;
        }

        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error.")
    }
};

module.exports = BusinessService;