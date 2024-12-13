import mongoose, { Schema, model } from 'mongoose'

const AttachmentSchema = new Schema({
  name: String,
  vectors: [mongoose.Schema.Types.Mixed],
  publicUrl: String,
})

const AnnotationSchema = new Schema({
  title: String,
  description: String,
  visibility: String,
  priority: String,
  type: {
    type: String,
    default: 'document'
  },
  disciplines: [mongoose.Schema.Types.Mixed],
  attachments: [AttachmentSchema],

  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
});

export const Annotation = model('Annotation', AnnotationSchema)
