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
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: State
        }]
    },
    city: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: City
        }]
    },
    businessLine: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: BusinessLine
        }]
    },
    businessSector: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: BusinessSector
        }]
    }
});