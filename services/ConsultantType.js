const ConsultantTypeModel = require("../models/ConsultantType");
const debug = require("debug")("log");

const ConsultantTypeService = {};

ConsultantTypeService.verifyCreateFields = ({ name }) => {
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

ConsultantTypeService.createNewConsultantType = async ({ name }) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Se ha registrado un nuevo Tipo de Consultor"
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
                    error: "El Tipo de Consultor no pudo ser registrado"
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
                    error: "No se encontró ningún Tipo de Consultor"
                }
            }
        } else {
            serviceResponse.content = {
                consultantstypes,
                count: consultantstypes.length,
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

ConsultantTypeService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true, 
        content: {
            message: "Se ha borrado el Tipo de Consultor"
        }
    }
    
    try{
        const ConsultantTypeDeleted = await ConsultantTypeModel.findByIdAndDelete(_id).exec(); 
        if(!ConsultantTypeDeleted) {
            serviceResponse = {
                success: false,
                content: {
                    error: "No se pudo borrar el Tipo de Consultor"
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