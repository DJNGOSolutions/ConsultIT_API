const { verifyTypeNumber } = require('../../utils/MiscUtils');
const StateService = require('./../../services/State');

const StateController = {};

StateController.addNewState = async (req, res) => {
    try{

        const NewStateWasCreated = await StateService.createNewState(req.body);

        if (!NewStateWasCreated) {
            return res.status(409).json(NewStateWasCreated.content);
        }

        return res.status(200).json(NewStateWasCreated.content);

    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

StateController.findAll = async (req, res) => {
    const { page = 0, limit = 14 } = req.query;

    if(!verifyTypeNumber(page, limit)){
        return res.status(403).json({
            error: "Mistype query."
        })
    }

    try{
        const States = await StateService.findAllStates(parseInt(page), parseInt(limit));
        return res.status(200).json(States.content);
        
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
    
}

StateController.delete = async (req, res) => {
    const { _id } = req.body;

    if(!_id){
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const stateWasDeleted = await StateService.deleteOneById(_id);
        if(!stateWasDeleted.success){
            return res.status(409).json(stateWasDeleted.content);
        }

        return res.status(200).json(stateWasDeleted.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

module.exports = StateController;