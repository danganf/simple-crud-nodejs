'use restrict';

const mongoose = require('mongoose');
const MSchema  = mongoose.Schema;

const schema = new MSchema({
    number: { type: String, required: true, trim: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    staus:{ type: String, required: true, enum: ['created', 'done'], default: 'created' },
    createDate: { type: Date, require: true, default: Date.now },
    items: [{
        qty: {type: Number, required: true, default: 1},
        price: {type: Number, required: true},
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    }]
});

module.exports = mongoose.model( 'Order', schema );