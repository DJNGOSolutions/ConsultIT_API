const BusinessService = require("../../services/Business");

const BusinessController = {};

BusinessController.test = async (req, res) => {
    const result = BusinessService.test();
    return res.status(400).json(result.content);
}

module.exports = BusinessController;