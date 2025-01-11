import { Router } from "express";
import { adaptMiddleware } from "../../lib/express/adapters/middleware.js";
import { adaptRoute } from "../../lib/express/adapters/route.js";
import { knexGroupsRepository } from "../../repositories/knex/index.js";
import { authMiddleware } from "../../middlewares/index.js";

import { CreateGroupUseCase } from "../../use-cases/v2/groups/create-group.js";
import { ListGroupsUseCase } from "../../use-cases/v2/groups/list-groups.js";
import { DeleteGroupUseCase } from "../../use-cases/v2/groups/delete-group.js";

const createGroupUseCase = new CreateGroupUseCase(
  knexGroupsRepository
)
const listGroupsUseCase = new ListGroupsUseCase(
  knexGroupsRepository
)
const deleteGroupUseCase = new DeleteGroupUseCase(
  knexGroupsRepository
)

export const groupsRouter = Router()


groupsRouter.post(
  '/', 
  adaptMiddleware(authMiddleware), 
  adaptRoute(createGroupUseCase)
)

groupsRouter.get(
  '/', 
  adaptMiddleware(authMiddleware), 
  adaptRoute(listGroupsUseCase)
)

groupsRouter.delete(
  '/:id', 
  adaptMiddleware(authMiddleware), 
  adaptRoute(deleteGroupUseCase)
)
