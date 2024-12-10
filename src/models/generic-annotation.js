const mongoose = require('mongoose');

const GenericAnnotationSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    url: String,
    vectors: [mongoose.Schema.Types.Mixed],
    date: { type: Date, default: Date.now },
    type: String,
});

module.exports = mongoose.model('GenericAnnotation', GenericAnnotationSchema);