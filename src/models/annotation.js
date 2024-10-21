const mongoose = require('mongoose');

const AnnotationSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    url: String,
    vectors: [mongoose.Schema.Types.Mixed],
    date: { type: Date, default: Date.now },
    sheet: { type: mongoose.Schema.Types.ObjectId, ref: 'Sheet' },
});

module.exports = mongoose.model('Annotation', AnnotationSchema);