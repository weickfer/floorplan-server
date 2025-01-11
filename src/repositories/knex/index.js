import { KnexAnnotationsRepository } from "./annotations.js";
import { KnexAttachmentsRepository } from "./attachments.js";
import { KnexDisciplinesRepository } from "./disciplines.js";
import { KnexGroupsRepository } from "./groups.js";
import { KnexProjectDisciplinesRepository } from "./project-disciplines.js";
import { KnexProjectsRepository } from "./projects.js";

export const knexAnnotationsRepository = new KnexAnnotationsRepository()
export const knexAttachmentsRepository = new KnexAttachmentsRepository()
export const knexDisciplinesRepository = new KnexDisciplinesRepository()
export const knexProjectDisciplinesRepository = new KnexProjectDisciplinesRepository()
export const knexGroupsRepository = new KnexGroupsRepository()
export const knexProjectsRepository = new KnexProjectsRepository()
