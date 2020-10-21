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

module.exports = StateController;