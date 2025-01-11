import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { z } from '../index.js'
import { defaultOkResponseSchema } from "./response-schema.js";
import { createGroupSchema, groupSchema } from "../schemas/group.js";


/**
 * 
 * @param {OpenAPIRegistry} registry 
 */
export function groupsDoc(registry) {
  registry.registerPath({
    method: 'post',
    path: '/v2/groups',
    summary: 'Criar um grupo',
    description: `Endpoint responsável pela criação de um novo grupo no sistema.`,
    tags: ["Grupo"],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createGroupSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Anotação criada com sucesso.',
        content: {
          'application/json': {
            schema: defaultOkResponseSchema(z.object({})),
          },
        },
      },
    },
  })
  
  registry.registerPath({
    method: 'get',
    path: '/v2/groups',
    summary: 'Listar grupos',
    description: `Esta rota retorna uma lista de grupos do projeto que o usuário faz parte.`,
    tags: ["Grupo"],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: defaultOkResponseSchema(
              z.array(groupSchema)
            ),
          },
        },
      },
    },
  })

  registry.registerPath({
    method: 'delete',
    path: '/v2/groups/{id}',
    summary: 'Deletar um grupo',
    description: 'Rota para deletar um grupo.',
    tags: ['Grupo'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true
      }
    ],
    responses: {
      204: {
        description: 'Grupo deletado com sucesso.',
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(z.object({}))
          }
        }
      }
    }
  })
}