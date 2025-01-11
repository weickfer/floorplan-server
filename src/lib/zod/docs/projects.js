import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { z } from '../index.js'
import { defaultBadResponseSchema, defaultOkResponseSchema } from "./response-schema.js";
import { createProjectSchema } from "../schemas/project.js";
import { addCustomDisciplinesSchema, addDefaultDisciplinesSchema, disciplineSchema } from "../schemas/discipline.js";

/**
 * 
 * @param {OpenAPIRegistry} registry 
 */
export function projectsDoc(registry) {
  registry.registerPath({
    method: 'get',
    path: '/v2/disciplines',
    tags: ['Projeto'],
    summary: 'Lista disciplinas padrões',
    description: 'Lista todas as disciplinas padrões.',
    responses: {
      200: {
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(
              z.array(disciplineSchema)
            )
          }
        }
      }
    }
  })
  
  registry.registerPath({
    method: 'get',
    path: '/v2/projects',
    tags: ['Projeto'],
    summary: 'Obter Projeto',
    description: 'Obter informações relacionadas ao projeto.',
    responses: {
      200: {
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(
              z.object({})
            )
          }
        }
      }
    }
  })
  
  registry.registerPath({
    method: 'post',
    path: '/v2/projects/disciplines',
    summary: 'Associar disciplinas padrões ao projeto',
    tags: ['Projeto'],
    request: {
      body: {
        content: {
          "application/json": {
            schema: addDefaultDisciplinesSchema
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Disciplinas adicionadas com sucesso.',
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(z.object({}))
          }
        }
      },
      409:{
        description: 'Disciplinas inseridas não existem.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(
              z.string().openapi({ example: 'Algumas disciplinas inseridas não exitem' })
            )
          }
        }
      }
    }
  })
  
  registry.registerPath({
    method: 'post',
    path: '/v2/projects/disciplines/custom',
    summary: 'Adicionar disciplina customizada',
    tags: ['Projeto'],
    request: {
      body: {
        content: {
          "application/json": {
            schema: addCustomDisciplinesSchema,
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Disciplinas adicionadas com sucesso.',
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(z.object({}))
          }
        }
      }
    }
  })

  registry.registerPath({
    method: 'post',
    path: '/v2/projects',
    summary: 'Criar um projeto ',
    security: [{ ParentPlatformAuth: [] }],
    description: `Endpoint responsável pela criação de um novo grupo no sistema.`,
    tags: ["Somente para servidores autorizados"],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createProjectSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Projeto criado com sucesso.',
        content: {
          'application/json': {
            schema: defaultOkResponseSchema(z.object({})),
          },
        },
      },
      409: {
        description: 'Existe um projeto já cadastrado com este ID.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(z.string().openapi({
              example: 'Projeto já cadastrado na base de dados'
            }))
          }
        }
      }
    },
  })

  registry.registerPath({
    method: 'delete',
    path: '/v2/projects/{externalProjectId}',
    summary: 'Deletar um projeto',
    security: [{ ParentPlatformAuth: [] }],
    description: 'Rota para deletar um projeto e todos seus relacionados.',
    tags: ['Somente para servidores autorizados'],
    parameters: [
      {
        name: 'externalProjectId',
        in: 'path',
        required: true
      }
    ],
    responses: {
      204: {
        description: 'Projeto deletado com sucesso.',
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(z.object({}))
          }
        }
      }
    }
  })
}