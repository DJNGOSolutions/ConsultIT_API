const { saveCashFlow } = require('./../../services/CashFlow');
const CashFlowService = require('./../../services/CashFlow');

const CashFlowController = {};

CashFlowController.calculateCashFlow = (req, res) => {
    const verifiedFields = CashFlowService.verifyCalculateCashFlowFields(req.body);
    if (!verifiedFields.success) {
        return res.status(403).json(verifiedFields.content);
    }

    const calculatedCashFlow = CashFlowService.calculateCashFlow(req.body);
    if (!calculatedCashFlow.success) {
        return res.status(400).json(calculatedCashFlow.content);
    }

    return res.status(200).json(calculatedCashFlow.content);
}

CashFlowController.saveCashFlow = async (req, res) => {
    const verifiedFields = CashFlowService.verifySaveCashFlowFields(req.body);
    if (!verifiedFields.success) {
        return res.status(403).json(verifiedFields.content);
    }

    const savedCashFlow = await CashFlowService.saveCashFlow(req.body);
    if (!savedCashFlow.success) {
        return res.status(400).json(savedCashFlow.content);
    }

    return res.status(200).json(savedCashFlow.content);
}

module.exports = CashFlowController;