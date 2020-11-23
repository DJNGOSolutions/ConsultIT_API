const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashFlowSchema = new Schema({
	business: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Business'
	},
	year0: [ Number ],
	year1: [ Number ],
	year2: [ Number ],
	year3: [ Number ],
	year4: [ Number ],
	year5: [ Number ],
	cashFlowYear0: Number,
	cashFlowYear1: Number,
	cashFlowYear2: Number,
	cashFlowYear3: Number,
	cashFlowYear4: Number,
	cashFlowYear5: Number,
	rateOfReturn: Number,
	totalCurrentValue: Number
},{
	timestamps: true
});

module.exports = mongoose.model('CashFlow', CashFlowSchema);