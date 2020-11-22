const ContractModel = require('./../models/Contract');
const { verifyId } = require('./../utils/MongoUtils');

const ContractService = {};

ContractService.checkContractFields = ({ entrepreneurId, consultantId, contractDate, contractTime, cost, rating, comments }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!entrepreneurId && !consultantId) {
        serviceResponse = {
            success: false,
            content: {
                error: "Missing participants of the contract."
            }
        }

        return serviceResponse;
    }

    if (!verifyId(entrepreneurId) && !verifyId(consultantId)) {
        serviceResponse = {
            success: false,
            content: {
                error: "One or both ids are not valid."
            }
        }

        return serviceResponse;
    }

    if(contractDate) serviceResponse.content.contractDate = contractDate;
    if(contractTime) serviceResponse.content.contractTime = contractTime;
    if(cost) serviceResponse.content.cost = cost;
    if(rating) serviceResponse.content.rating = rating;
    if(comments) serviceResponse.content.comments = comments;

    return serviceResponse;
}

ContractService.createContract = async ({ entrepreneurId, consultantId, contractDate, contractTime, cost, rating, comments }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "New contract created."
        }
    }

    if (!contractSpecifications) {
        serviceResponse = {
            success: false,
            content: {
                error: "There are no specifications for this contract."
            }
        }

        return serviceResponse;
    }

    const newContract = new ContractModel({ 
        entrepreneurId,
        consultantId,
        contractDate,
        contractTime,
        cost,
        rating,
        comments,
    });

    if (!newContract) {
        serviceResponse = {
            success: false,
            content: {
                error: "Something went wrong with the new contract."
            }
        }

        return serviceResponse;
    }

    const newContractSaved = await newContract.save();

    if (!newContractSaved) {
        serviceResponse = {
            success: false,
            content: {
                error: "The new contract could not be saved."
            }
        }

        return serviceResponse;
    } else {
        serviceResponse.contract = newContractSaved;
    }

    return serviceResponse;
}

module.exports = ContractService;