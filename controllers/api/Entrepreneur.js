const EntrepreneurService = require('../../services/Entrepreneur');
const { verifyId } = require('./../../utils/MongoUtils');
const UserService = require('../../services/User');


const EntrepreneurController = {};

EntrepreneurController.findAll = async(req, res) => {
    try{
        const entrepreneurResponse = await EntrepreneurService.findAll();
        if(!entrepreneurResponse.success){
            return res.status(204).json(entrepreneurResponse.content);
        }
        return res.status(200).json(entrepreneurResponse.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

EntrepreneurController.findAllBusinesses = async(req, res) => {
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
        const id = userFound.content.user._id
        const businessesResponse = await EntrepreneurService.findAllBusinesses(id);
        
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

EntrepreneurController.deleteByID = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const entrepreneurDeleted = await EntrepreneurService.deleteOneByID(_id); 
        if(!entrepreneurDeleted.success){
            return res.status(404).json(entrepreneurDeleted.content);
        }
        return res.status(200).json(entrepreneurDeleted.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

EntrepreneurController.updateEntrepreneur = async (req, res) => {
    const { _id } = req.body;
    
    if (!verifyId(_id)) {
        return res.status(400).json({
            error: "Error in ID."
        });
    }

    const fieldsVerified = EntrepreneurService.verifyUpdateFields(req.body);
    if (!fieldsVerified.success) {
        return res.status(400).json(fieldsVerified.content);
    }

    try {
        const entrepreneurExists = await EntrepreneurService.findOneEntrepreneurByUser(_id);

        if (!entrepreneurExists.success) {
            return res.status(404).json(entrepreneurExists.content);
        }

        const entrepreneurUpdated = await EntrepreneurService.updateEntrepreneurById(entrepreneurExists.content, fieldsVerified.content);
        
        if (!entrepreneurUpdated.success) {
            return res.status(409).json(entrepreneurUpdated.content);
        }

        return res.status(202).json(entrepreneurUpdated.content);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

module.exports = EntrepreneurController;