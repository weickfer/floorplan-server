import { Annotation } from "../models/annotation.js";

export async function getAnnotationsByType(type) {
  const annotations = await Annotation.find({
    type
  })

  return {
    annotations
  }
}