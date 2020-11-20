const BusinessModel = require('../models/Business');
const debug = require("debug")("log");

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

module.exports = BusinessService;