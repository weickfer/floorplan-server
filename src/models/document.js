import mongoose, { Schema, model } from 'mongoose'

const DocumentSchema = new Schema({
  filename: String,
  publicUrl: String,
  date: { type: Date, default: Date.now },
  annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Annotation' }],
});

export const Document = model('Document', DocumentSchema)
