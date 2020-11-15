const EntrepreneurService = require('../../services/Entrepreneur');
const { verifyID } = require('./../../utils/MongoUtils');
const UserService = require('../../services/User');
const { verifyTypeNumber } = require('../../utils/MiscUtils');


const EntrepreneurController = {};

EntrepreneurController.findAll = async(req, res) => {
    const { page = 0, limit = 10 } = req.query;
    
    if(!verifyTypeNumber(page, limit)){
        return res.status(403).json({error: "Mistype query."});
    }

    try{
        const entrepreneurResponse = await EntrepreneurService.findAll(parseInt(page), parseInt(limit));
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
        const user = userFound.content.user;
        console.log("El usuario es " + user);
        const businessesResponse = await EntrepreneurService.findAllBusinesses(user._id);
        if(!businessesResponse.success){
            return res.status(204).json(businessesResponse.content);
        }
        return res.status(200).json(businessesResponse.content);
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
    
    if (!verifyID(_id)) {
        return res.status(400).json({
            error: "Error in ID"
        });
    }

    const fieldsVerified = EntrepreneurService.verifyUpdateFields(req.body);
    if(!fieldsVerified.success) {
        return res.status(400).json(fieldsVerified.content);
    }

    try {
        const entrepreneurExists = await EntrepreneurService.findOneEntrepreneurByUser(user)

        if (!entrepreneurExists.success) {
            return res.status(404).json(entrepreneurExists.content);
        }

        const entrepreneurUpdated = await EntrepreneurService.updateEntrepreneurById(entrepreneurExists, req.body);

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