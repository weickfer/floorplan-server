import { Annotation } from "../models/annotation.js";

export async function getAnnotationsByDocument(documentId) {
  const annotations = await Annotation.find({
    document: documentId
  })

  return {
    annotations
  }
}