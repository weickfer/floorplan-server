import { Router } from "express";
import { adaptMiddleware } from "../../lib/express/adapters/middleware.js";
import { adaptRoute } from "../../lib/express/adapters/route.js";
import { authMiddleware } from "../../middlewares/index.js";
import { knexGroupsRepository } from "../../repositories/knex/index.js";

import { CreateGroupUseCase } from "../../use-cases/v2/groups/create-group.js";
import { DeleteGroupUseCase } from "../../use-cases/v2/groups/delete-group.js";
import { EditGroupUseCase } from "../../use-cases/v2/groups/edit-group.js";
import { ListGroupsUseCase } from "../../use-cases/v2/groups/list-groups.js";
import { RemoveMemberUseCase } from "../../use-cases/v2/groups/remove-member.js";

const createGroupUseCase = new CreateGroupUseCase(
  knexGroupsRepository
)
const listGroupsUseCase = new ListGroupsUseCase(
  knexGroupsRepository
)
const deleteGroupUseCase = new DeleteGroupUseCase(
  knexGroupsRepository
)
const removeMemberUseCase = new RemoveMemberUseCase(
  knexGroupsRepository
)
const editGroupUseCase = new EditGroupUseCase(
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

groupsRouter.patch(
  '/:id/remove-member',
  adaptMiddleware(authMiddleware),
  adaptRoute(removeMemberUseCase)
)

groupsRouter.put(
  '/:id/edit',
  adaptMiddleware(authMiddleware),
  adaptRoute(editGroupUseCase)
)
