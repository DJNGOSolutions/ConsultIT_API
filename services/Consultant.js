const ConsultantModel = require("../models/Consultant");
const debug = require("debug")("log");

const ConsultantService = {};

ConsultantService.verifyCreateFields = ({ firstName, lastName, birthdate, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType }) => {

};

module.exports = ConsultantService;