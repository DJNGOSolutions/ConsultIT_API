const ConsultantTypeService = require('../../services/ConsultantType');

const ConsultantTypeController = {};

ConsultantTypeController.create = async (req, res) => {
    const fieldsValidation = ConsultantTypeService.verifyCreateFields(req.body);
    if(!fieldsValidation.success){
        return res.status(400).json(fieldsValidation.content);
    }
    
    try{
        const createConsultantType = await ConsultantTypeService.createNewConsultantType(req.body);
        if(!createConsultantType.success){
            return res.status(409).json(createConsultantType.content);
        }
        return res.status(201).json(createConsultantType.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

ConsultantTypeController.findAll = async (req, res) => {
    try{
        const consultantTypeResponse = await ConsultantTypeService.findAll();    
        if(!consultantTypeResponse.success){
            return res.status(204).json(consultantTypeResponse.content);
        }
        return res.status(200).json(consultantTypeResponse.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

ConsultantTypeController.deleteByID = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(403).json({
            error: "Missing id."
        })
    }
    try{
        const consultantTypeDeleted = await ConsultantTypeService.deleteOneByID(_id);
        if(!consultantTypeDeleted.success){
            return res.status(404).json(consultantTypeDeleted.content);
        }
        return res.status(200).json(consultantTypeDeleted.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

module.exports = ConsultantTypeController;