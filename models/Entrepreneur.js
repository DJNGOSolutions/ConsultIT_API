const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const EntrepreneurSchema = new Schema({
    user:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: User
        }]
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    photo: String,
    birthdate: {
        type: Date,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    postalAddress: {
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
    businesses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            rel: Business
        }]
    }
});