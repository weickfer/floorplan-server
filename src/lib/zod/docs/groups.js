import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { z } from '../index.js';
import { createGroupSchema, editGroupSchema, groupSchema, removeMemberSchema } from "../schemas/group.js";
import { defaultBadResponseSchema, defaultOkResponseSchema } from "./response-schema.js";


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
      200: {
        description: 'Grupo deletado com sucesso.',
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(z.object({}))
          }
        }
      }
    }
  })

  registry.registerPath({
    method: 'patch',
    path: '/v2/groups/{id}/remove-member',
    summary: 'Remover membro',
    description: 'Remover membro de um determinado grupo. Somente o dono do grupo pode realizar essa operação.',
    tags: ['Grupo'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true
      }
    ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: removeMemberSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Membro removido com sucesso.',
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(z.object({}))
          }
        }
      },
      404: {
        description: 'Grupo não existe.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(
              z.string().openapi({ example: 'Grupo não existe' })
            )
          }
        }
      },
      401: {
        description: 'Operação não permitida.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(
              z.string().openapi({ example: 'Somente o dono do grupo pode fazer essa operação' })
            )
          }
        }
      },
    }
  })
  
  registry.registerPath({
    method: 'put',
    path: '/v2/groups/{id}/edit',
    summary: 'Editar Grupo',
    description: 'Editar grupo. Somente o dono do grupo pode realizar essa operação.',
    tags: ['Grupo'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true
      }
    ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: editGroupSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Grupo editado com sucesso.',
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(z.object({}))
          }
        }
      },
      404: {
        description: 'Grupo não existe.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(
              z.string().openapi({ example: 'Grupo não existe' })
            )
          }
        }
      },
      401: {
        description: 'Operação não permitida.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(
              z.string().openapi({ example: 'Somente o dono do grupo pode fazer essa operação' })
            )
          }
        }
      },
    }
  })
}