const BusinessSectorService = require('../../services/BusinessSector');
const { verifyTypeNumber } = require('../../utils/MiscUtils');

const BusinessSectorController = {};

BusinessSectorController.create = async (req, res) => {
    const fieldsWereVerified = BusinessSectorService.verifyCreateFields(req.body);
    if(!fieldsWereVerified.success) {
        return res.status(403).json(fieldsWereVerified.content);
    }

    try{
        const newBusinessSectorWasCreated = await BusinessSectorService.createNewBusinessSector(req.body);
        if(!newBusinessSectorWasCreated.success){
            return res.status(409).json(newBusinessSectorWasCreated.content);
        }

        return res.status(200).json(newBusinessSectorWasCreated.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        });
    }
}

BusinessSectorController.findAll = async (req, res) => {
    const { page = 0, limit = 10 } = req.query;
    if(!verifyTypeNumber(page, limit)){
        return res.status(403).json({
            error: "Mistype in query"
        });
    }

    try{
        const BusinessSectorList = await BusinessSectorService.findAll(parseInt(page), parseInt(limit));
        if(!BusinessSectorList.success){
            return res.status(409).json(BusinessSectorList.content);
        }

        return res.status(200).json(BusinessSectorList.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

BusinessSectorController.delete = async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const businessSectorWasDeleted = await BusinessSectorService.deleteOneByID(_id);
        if (!businessSectorWasDeleted.success) {
            return res.status(409).json(businessSectorWasDeleted.content);
        }

        return res.status(200).json(businessSectorWasDeleted.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

module.exports = BusinessSectorController;