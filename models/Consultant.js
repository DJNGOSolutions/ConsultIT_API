const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    referencePrice: {
        type: Boolean,
        required: true
    },
    historicAveragePrice: {
        type: Boolean,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    averageRating: {
        type: Boolean,
        default: 0.00
    },
    consultantType: {
        type: String,
        required: true
    }
});