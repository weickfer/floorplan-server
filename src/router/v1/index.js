import { Router } from "express";
import { annotationsRouter } from "./annotations.js";
import { documentsRouter } from "./documents.js";

export const v1Router = Router()

v1Router.use('/annotations', annotationsRouter)
v1Router.use('/documents', documentsRouter)

