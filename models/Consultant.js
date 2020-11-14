const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const ConsultantSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        rel: User
    }, 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ""
    },
    birthdate: {
        type: Date,
        required: true
    },
    referencePrice: {
        type: Number,
        required: true
    },
    historicAveragePrice: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0.00
    },
    consultantType: {
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
    }
});

module.exports = mongoose.model("Consultant", ConsultantSchema);