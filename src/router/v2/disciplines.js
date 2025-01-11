import { Router } from "express";

import { adaptRoute } from '../../lib/express/adapters/route.js'
import { knexDisciplinesRepository } from "../../repositories/knex/index.js";

import { ListDefaultDisciplinesUseCase } from "../../use-cases/v2/disciplines/list-default-disciplines.js";

export const disciplinesRouter = Router()

const listDefaultDisciplines = new ListDefaultDisciplinesUseCase(
  knexDisciplinesRepository
)

disciplinesRouter.get('/', adaptRoute(listDefaultDisciplines))
