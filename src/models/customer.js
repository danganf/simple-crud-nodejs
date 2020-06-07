'use restrict';

const mongoose = require('mongoose');
const MSchema  = mongoose.Schema;

const schema = new MSchema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, index: true, unique: true },
    password: { type: String, required: true, trim: true },
    active: { type: Boolean, required: true, index: true, default: true },
});

module.exports = mongoose.model( 'Customer', schema );