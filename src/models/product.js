'use restrict';

const mongoose = require('mongoose');
const MSchema  = mongoose.Schema;

const schema = new MSchema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: [true, 'Slug obrigatória'], trim: true, index: true, unique: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
    tags: [ { type: String, required: true } ],
});

module.exports = mongoose.model( 'Product', schema );