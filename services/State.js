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

StateService.findAllStates = async (page, limit) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try{
        const States = await StateModel.find({}, undefined, {
            skip: page * limit,
            limit: limit,
            sort: [{
                updatedAt: -1
            }]
        }).exec();

        if(!States){
            serviceResponse = {
                success: false,
                content: {
                    error: "States were not found."
                }
            }

            return serviceResponse;
        }

        serviceResponse.content = {
            States,
            count: States.length,
            page,
            limit
        };

        return serviceResponse;       
    }catch(error){
        throw new Error("Internal Server Error.")
    }
}

StateService.deleteOneById = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "State was deleted."
        }
    }
    if(!_id){
        serviceResponse = {
            success: false,
            content: {
                error: "Missing id."
            }
        }

        return serviceResponse;
    }

    try{
        const stateWasDeleted = await StateModel.findByIdAndDelete(_id).exec();
        if(!stateWasDeleted){
            serviceResponse = {
                success: false,
                content: {
                    error: "State could not be deleted."
                }
            }

            return serviceResponse;
        }

        return serviceResponse;
    }catch(error){
        throw new Error("Internal Server Error.")
    }

}

module.exports = StateService;