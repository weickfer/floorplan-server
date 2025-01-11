import { knexProjectsRepository } from "../repositories/knex/index.js";
import { AuthMiddleware } from "./auth.js";
import { ServerAuthMiddleware } from "./server-auth.js";

export const authMiddleware = new AuthMiddleware(knexProjectsRepository)
export const serverAuthMiddleware = new ServerAuthMiddleware()
