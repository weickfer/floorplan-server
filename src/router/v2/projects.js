import { Router } from "express";
import { adaptMiddleware } from "../../lib/express/adapters/middleware.js";
import { adaptRoute } from "../../lib/express/adapters/route.js";
import { knexAnnotationsRepository, knexDisciplinesRepository, knexProjectDisciplinesRepository, knexProjectsRepository } from "../../repositories/knex/index.js";

import { CreateProjectUseCase } from "../../use-cases/v2/projects/create-project.js";
import { DeleteProjectUseCase } from "../../use-cases/v2/projects/delete-project.js";
import { AddDefaultDisciplinesToProjectUseCase } from "../../use-cases/v2/projects/add-default-disciplines-to-project.js";
import { AddCustomDisciplineToProjectUseCase } from "../../use-cases/v2/projects/add-custom-discipline-to-project.js";

import { authMiddleware, serverAuthMiddleware } from "../../middlewares/index.js";
import { storageProvider } from "../../providers/index.js";
import { GetProjectUseCase } from "../../use-cases/v2/projects/get-project.js";

const createProject = new CreateProjectUseCase(
  knexProjectsRepository,
)
const deleteProjectUseCase = new DeleteProjectUseCase(
  knexProjectsRepository,
  knexAnnotationsRepository,
  storageProvider,
)
const addDefaultDisciplinesToProjectUseCase = new AddDefaultDisciplinesToProjectUseCase(
  knexDisciplinesRepository,
  knexProjectDisciplinesRepository,
)
const addCustomDisciplineToProjectUseCase = new AddCustomDisciplineToProjectUseCase(
  knexProjectDisciplinesRepository,
)
const getProjectUseCase = new GetProjectUseCase(knexProjectsRepository)

export const projectsRouter = Router()

projectsRouter.post('/', adaptMiddleware(serverAuthMiddleware), adaptRoute(createProject))
projectsRouter.get('/', adaptMiddleware(authMiddleware), adaptRoute(getProjectUseCase))
projectsRouter.delete('/:externalProjectId', adaptMiddleware(serverAuthMiddleware), adaptRoute(deleteProjectUseCase))

projectsRouter.post('/disciplines', adaptMiddleware(authMiddleware), adaptRoute(addDefaultDisciplinesToProjectUseCase))
projectsRouter.post('/disciplines/custom', adaptMiddleware(authMiddleware), adaptRoute(addCustomDisciplineToProjectUseCase))