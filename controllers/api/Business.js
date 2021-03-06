const { verifyId } = require('./../../utils/MongoUtils');
const BusinessService = require("../../services/Business");

const BusinessController = {};

BusinessController.test = async (req, res) => {
    const result = BusinessService.test();
    return res.status(200).json(result.content);
};

BusinessController.create = async (req, res) => {
    const fieldsValidation = BusinessService.verifyCreateFields(req.body);
    if(!fieldsValidation.success) {
        return res.status(400).json(fieldsValidation.content);
    }
    
    try{
        const createBusiness = await BusinessService.createNewBusiness(req.body);
        if(!createBusiness.success){
            return res.status(409).json(createBusiness.content);
        }
        res.status(200).json(createBusiness.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

BusinessController.findAll = async (req, res) => {
    try{
        const businessResponse = await BusinessService.findAll();
        if(!businessResponse.success){
            return res.status(204).json(businessResponse.content);
        }
        return res.status(200).json(businessResponse.content);
    } catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

BusinessController.deleteByID = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const businessDeleted = await BusinessService.deleteOneByID(_id);
        if(!businessDeleted.success){
            return res.status(404).json(businessDeleted.content);
        }
        return res.status(200).json(businessDeleted.content);
    } catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

BusinessController.updateBusiness = async (req, res) => {
    const { business_id } = req.body;
    
    if (!verifyId(business_id)) {
        return res.status(400).json({
            error: "Error in ID."
        });
    }
    
    const fieldsVerified = BusinessService.verifyUpdateFields(req.body);
    if(!fieldsVerified.success) {
        return res.status(400).json(fieldsVerified.content);
    }
    
    try{
        const businessExists = await BusinessService.findOneBusinessById(business_id); 
        
        if (!businessExists.success){
            return res.status(404).json(businessExists.content);
        }
        
        const businessUpdated = await BusinessService.updateConsultantById(businessExists.content, fieldsVerified.content);
        
        if (!businessUpdated.success) {
            return res.status(409).json(businessUpdated.content);
        }

        return res.status(200).json(businessUpdated.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        });
    }
};

module.exports = BusinessController;