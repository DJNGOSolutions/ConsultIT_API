const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    legalName: {
        type: String,
        required: true,
        unique: true,
    },
    comercialName: String,
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    businessLine: {
        type: String,
        required: true
    },
    businessSector: {
        type: String,
        required: true
    }
});