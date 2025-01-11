import { Router } from "express";

import { adaptRoute } from "../../lib/express/adapters/route.js";
import { adaptMiddleware } from "../../lib/express/adapters/middleware.js";

import { knexAnnotationsRepository, knexAttachmentsRepository, knexGroupsRepository, knexProjectDisciplinesRepository } from "../../repositories/knex/index.js";
import { authMiddleware } from "../../middlewares/index.js";

import { CreateAnnotationUseCase } from "../../use-cases/v2/annotations/create-annotation.js";
import { ListAnnotationsUseCase } from "../../use-cases/v2/annotations/list-annotations.js";
import { DeleteAnnotationUseCase } from "../../use-cases/v2/annotations/delete-annotation.js";
import { storageProvider } from "../../providers/index.js";
import { ListAnnotationsByObjectUseCase } from "../../use-cases/v2/annotations/list-annotations-by-object.js";

const createAnnotations = new CreateAnnotationUseCase(
  knexAnnotationsRepository,
  knexProjectDisciplinesRepository,
  knexAttachmentsRepository,
  knexGroupsRepository,
  storageProvider,
)
const listAnnotations = new ListAnnotationsUseCase(
  knexAnnotationsRepository
)
const listAnnotationsByObjectUseCase = new ListAnnotationsByObjectUseCase(
  knexAnnotationsRepository
)
const deleteAnnotationUseCase = new DeleteAnnotationUseCase(
  knexAnnotationsRepository,
  knexAttachmentsRepository,
  storageProvider,
)

export const annotationsRouter = Router()


annotationsRouter.post(
  '/',
  adaptMiddleware(authMiddleware),
  adaptRoute(createAnnotations)
)

annotationsRouter.get(
  '/',
  adaptMiddleware(authMiddleware),
  adaptRoute(listAnnotations)
)

annotationsRouter.get(
  '/:objectId',
  adaptMiddleware(authMiddleware),
  adaptRoute(listAnnotationsByObjectUseCase)
)

annotationsRouter.delete(
  '/:id',
  adaptMiddleware(authMiddleware),
  adaptRoute(deleteAnnotationUseCase)
)
