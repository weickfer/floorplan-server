const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
    filename: String,
    url: String,
    date: { type: Date, default: Date.now },
    annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Annotation' }],
});

module.exports = mongoose.model('Sheet', SheetSchema);