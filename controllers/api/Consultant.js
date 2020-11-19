const ConsultantService = require('../../services/Consultant');
const UserService = require('../../services/User');
const { verifyTypeNumber } = require('../../utils/MiscUtils');
const { verifyId } = require('../../utils/MongoUtils');

const ConsultantController = {};

ConsultantController.findOneConsultantByUser = async (req, res) => {
    let { username } = req.body;

    if(!username){
        return res.status(403).json({
            error: "Missing username."
        })
    }

    const userFound = await UserService.findOneUsernameOrEmail(username, "");
    if(!userFound.success){
        return res.status(204).json(userFound.content);
    }
    
    try{
        const user = userFound.content.user;
        const consultantResponse = await ConsultantService.findOneConsultantByUser(user._id);
        if(!consultantResponse.success){
            return res.status(204).json(consultantResponse.content);
        }
        return res.status(200).json(consultantResponse.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

ConsultantController.findAll = async(req, res) => {
    const { page = 0, limit = 10 } = req.query;

    if(!verifyTypeNumber(page, limit)){
        return res.status(403).json({ error: "Mistype query." });
    }
    
    try{
        const consultantResponse = await ConsultantService.findAll(parseInt(page), parseInt(limit));
        if(!consultantResponse.success){
            return res.status(204).json(consultantResponse.content);
        }
        return res.status(200).json(consultantResponse.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

ConsultantController.deleteByID = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const consultantDeleted = await ConsultantService.deleteOneByID(_id); 
        if(!consultantDeleted.success){
            return res.status(404).json(consultantDeleted.content);
        }
        return res.status(200).json(consultantDeleted.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

ConsultantController.updateConsultant = async (req, res) => {
    const { _id } = req.body;

    if (!verifyId(_id)) {
        return res.status(400).json({
            error: "Error in ID."
        });
    }

    const fieldsVerified = ConsultantService.verifyUpdateFields(req.body);
    if (!fieldsVerified.success) {
        return res.status(400).json(fieldsVerified.content);
    }

    try {
        const consultantExists = await ConsultantService.findOneConsultantByUser(_id);

        if (!consultantExists.success) {
            return res.status(404).json(consultantExists.content);
        }

        const consultantUpdated = await ConsultantService.updateConsultantById(consultantExists.content, fieldsVerified.content);

        if (!consultantUpdated.success) {
            return res.status(409).json(consultantUpdated.content);
        }

        return res.status(200).json(consultantUpdated.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        });
    }
};

module.exports = ConsultantController;