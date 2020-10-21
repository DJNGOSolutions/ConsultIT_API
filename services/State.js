const StateModel = require('./../models/State');

const StateService = {};

StateService.createNewState = async ({ name }) => {

    let serviceResponse = {
        success: true,
        content: {
            message: "State was saved correctly."
        }
    }

    if (!name) {
        serviceResponse = {
            success: false,
            content: {
                error: "Name field was empty."
            }
        }

        return serviceResponse;
    }

    try{
        const newState = new StateModel({name});
        const stateSaved = await newState.save();

        if (!stateSaved) {
            serviceResponse = {
                success: false,
                content: {
                    message: "State could not be saved."
                }
            }

            return serviceResponse;
        }

        return serviceResponse;

    }catch(error){
        throw new error("Internal Server Error.")
    }
}

module.exports = StateService;