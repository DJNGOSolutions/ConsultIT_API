const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
    entrepreneur: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Entrepreneur"
    },
    consultant: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "User"
    },
    contractDate: {
        type: Date,
        default: "Sin indicar"
    },
    contractTime: {
        type: String,
        default: "Sin indicar"
    },
    cost: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    comments: {
        type: String,
        default: "Sin indicar"
    },
    entrepreneurConfirmation: {
        type: Boolean,
        default: true
    },
    consultantConfirmation: {
        type: Number,
        default: 0
        // 0 = uncheck, 1 = check, 2 = denied
    },
});

module.exports = mongoose.model("Contract", ContractSchema);