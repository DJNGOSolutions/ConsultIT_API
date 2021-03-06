const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessLineSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("BusinessLine", BusinessLineSchema);