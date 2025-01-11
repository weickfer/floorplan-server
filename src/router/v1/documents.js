import { Router } from "express";
import { createDocument } from "../../use-cases/v1/create-document.js";
import { Document } from "../../models/document.js";

export const documentsRouter = Router()

documentsRouter.post('/create-signed-url', async (req, res) => {
  const response = await createDocument(req.body)

  return res.json({
    signedUrl: response.signedUrl
  })
})

documentsRouter.get('/', async (_, res) => {
  const documents = await Document.find()

  return res.json(documents)
})
