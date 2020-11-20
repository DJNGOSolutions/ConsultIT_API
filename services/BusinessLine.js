const BusinessLineModel = require("../models/BusinessLine");
const debug = require("debug")("log");

const BusinessLineService = {};

BusinessLineService.verifyCreateFields = ({ name }) => {
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

BusinessLineService.createNewBusinessLine = async ({ name }) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Se ha registrado una nueva Línea de Negocio"
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
                    error: "La Línea de Negocio no pudo ser registrada"
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
                    error: "No se encontró ninguna Línea de Negocio"
                }
            }
        } else {
            serviceResponse.content = {
                businesseslines,
                count: businesseslines.length,
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

BusinessLineService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Se ha borrado la Línea de Negocio"
        }
    }
    
    try{
        const businessLineDeleted = await BusinessLineModel.findByIdAndDelete(_id).exec(); 
        if(!businessLineDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "No se pudo borrar la Línea de Negocio"
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