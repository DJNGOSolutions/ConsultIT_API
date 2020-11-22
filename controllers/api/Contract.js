const ContractService = require('./../../services/Contract');

const ContractController = {};

ContractController.createNewContract = async (req, res) => {
    const contractChecked = ContractService.checkContractFields(req.body);
    if (!contractChecked.success) {
        return res.status(400).json(contractChecked.content);
    }

    const contractSaved = await ContractService.createContract(contractChecked.content);
    if (!contractSaved.success) {
        return res.status(409).json(contractSaved.content);
    }

    return res.status(200).json(contractSaved.content);
}

module.exports = ContractController;