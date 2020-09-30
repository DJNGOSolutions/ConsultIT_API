const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultantTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});