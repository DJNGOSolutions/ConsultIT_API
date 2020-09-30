const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSectorSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    }
});