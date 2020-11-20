const BusinessSectorModel = require("../models/BusinessSector");
const debug = require("debug")("log");

const BusinessSectorService = {};

BusinessSectorService.verifyCreateFields = ({ name }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Los campos son correctos"
        }
    }
    
    if(!name){
        serviceResponse={
            success: false,
            content: {
                error: "Un o más campos necesarios no fueron proporcionados"
            }
        }
    }
    
    return serviceResponse;
};

BusinessSectorService.createNewBusinessSector = async ({ name }) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Se ha registrado un nuevo Sector de Negocio"
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
                    error: "El Sector de Negocio no pudo ser registrado"
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
                    error: "No se encontró ningún Sector de Negocio"
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
            message: "Se ha borrado el Sector de Negocio"
        }
    }
    
    try{
        const businessSectorDeleted = await BusinessSectorModel.findByIdAndDelete(_id).exec(); 
        if(!businessSectorDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "No se pudo borrar el Sector de Negocio"
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