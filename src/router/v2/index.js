import { Router } from "express";

import { annotationsRouter } from "./annotations.js";
import { groupsRouter } from "./groups.js";
import { projectsRouter } from "./projects.js";
import { disciplinesRouter } from "./disciplines.js";

export const v2Router = Router()

v2Router.use('/annotations', annotationsRouter)
v2Router.use('/groups', groupsRouter)
v2Router.use('/projects', projectsRouter)
v2Router.use('/disciplines', disciplinesRouter)
