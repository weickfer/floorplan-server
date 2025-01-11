import { Router } from "express";
import { createAnnotation } from "../../use-cases/v1/create-annotation.js";
import { createDocumentAnnotation } from "../../use-cases/v1/create-document-annotation.js";
import { getAnnotationsByDocument } from "../../use-cases/v1/get-annotations.by-document.js";
import { getAnnotationsByType } from "../../use-cases/v1/get-annotations-by-type.js";

export const annotationsRouter = Router()

annotationsRouter.post('/create-signed-url', async (req, res) => {
  const { documentId, type } = req.query
  let response

  if(documentId) {
    response = await createDocumentAnnotation({
      ...req.query,
      ...req.body
    })
  }

  if(type) {
    response = await createAnnotation({
      ...req.query,
      ...req.body
    })
  }

  return res.json(response)
})

annotationsRouter.get('/:documentId', async (req, res) => {
  const { annotations } = await getAnnotationsByDocument(req.params.documentId)

  return res.json({ annotations })
})

annotationsRouter.get('/by-type/:type', async (req, res) => {
  const { annotations } = await getAnnotationsByType(req.params.type)

  return res.json({ annotations })
})
