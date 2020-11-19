const BusinessLineService = require("../../services/BusinessLine");
const { verifyTypeNumber } = require("../../utils/MiscUtils");

const BusinessLineController = {};

BusinessLineController.create = async (req, res) => {
    const fieldValidation = BusinessLineService.verifyCreateFields(req.body);

    if(!fieldValidation.success){
        return res.status(400).json(fieldValidation.content);
    }

    try {
        const businessLineWasCreated = await BusinessLineService.createNewBusinessLine(req.body);

        if(!businessLineWasCreated.success){
            return res.status(409).json(businessLineWasCreated.content);
        }

        return res.status(200).json(businessLineWasCreated.content);
    } catch(error) {
        throw new Error("Internal Server Error.");
    }
    
};

BusinessLineController.findAll = async (req, res) => {
    const { page = 0, limit = 10 } = req.query;

    if(!verifyTypeNumber(page, limit)){
        return res.status(403).json({
            error: "Mistype in query"
        })
    }
    try {
        const businessLineList = await BusinessLineService.findAll(parseInt(page), parseInt(limit));
        if(!businessLineList.success){
            return res.status(409).json(businessLineList.content);
        }

        return res.status(200).json(businessLineList.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

BusinessLineController.delete = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const businessLineWasDeleted = await BusinessLineService.deleteOneByID(_id);
        if (!businessLineWasDeleted){
            return res.status(409).json(businessLineWasDeleted.content);
        }

        return res.status(200).json(businessLineWasDeleted.content);
    } catch(error){
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

module.exports = BusinessLineController;