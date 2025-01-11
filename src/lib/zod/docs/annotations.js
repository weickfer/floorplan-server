import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { z } from '../index.js'
import { createAnnotationSchema, listAnnotations } from "../schemas/annotation.js";
import { defaultBadResponseSchema, defaultOkResponseSchema } from "./response-schema.js";


/**
 * 
 * @param {OpenAPIRegistry} registry 
 */
export function annotationsDoc(registry) {
  registry.registerPath({
    method: 'post',
    path: '/v2/annotations',
    summary: 'Criar uma nova anotação',
    description: `Endpoint responsável pela criação de uma nova anotação no sistema. 
    Após a criação bem-sucedida, o serviço retorna uma lista de URLs únicas associadas a cada anexo, 
    que deverão ser utilizadas para realizar o upload dos arquivos no cliente. 
    Essas URLs são temporárias e específicas para o processo de upload.`,
    tags: ["Anotação"],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createAnnotationSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Anotação criada com sucesso.',
        content: {
          'application/json': {
            schema: defaultOkResponseSchema(z.object({
              signedUrls: z.record(z.string().url())
            })),
          },
        },
      },
      400: {
        description: "Caso **visibility** é igual a group, o campo **groupId** é obrigatório.",
        content: {
          'application/json': {
            schema: defaultBadResponseSchema(z.string().openapi({
              example: "'groupId' deveria estar incluso quando visibility é 'group'"
            }))
          }
        }
      },
      404: {
        description: "Disciplinas inclusas não existem, ou grupo inserido não existe/sem membros.",
        content: {
          'application/json': {
            schema: defaultBadResponseSchema(z.string().openapi({
              example: "Alguma informação inserida não exite no banco dados."
            }))
          }
        }
      },
      409: {
        content: {
          'application/json': {
            schema: defaultBadResponseSchema(z.string().openapi({
              example: "Você não pertence a esse grupo"
            }))
          }
        }
      }
    },
  })
  
  registry.registerPath({
    method: 'get',
    path: '/v2/annotations',
    summary: 'Obter anotações',
    description: 'Esta rota retorna uma lista de anotações, levando em consideração a visibilidade de cada um. As anotações podem ser públicas, rascunho ou restritos a determinados grupos de usuários, e a resposta será ajustada conforme as permissões do usuário autenticado.',
    tags: ["Anotação"],
    responses: {
      200: {
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(listAnnotations)
          }
        }
      }
    }
  })
  
  registry.registerPath({
    method: 'get',
    path: '/v2/annotations/{objectId}',
    summary: 'Obter anotações de um objeto',
    description: 'Esta rota retorna uma lista de anotações, levando em consideração a visibilidade de cada um. As anotações podem ser públicas, rascunho ou restritos a determinados grupos de usuários, e a resposta será ajustada conforme as permissões do usuário autenticado.',
    parameters: [
      {
        name: 'objectId',
        in: 'path',
        required: true
      }
    ],
    tags: ["Anotação"],
    responses: {
      200: {
        content: {
          "application/json": {
            schema: defaultOkResponseSchema(listAnnotations)
          }
        }
      }
    }
  })
  
  registry.registerPath({
    method: 'delete',
    path: '/v2/annotations/{id}',
    summary: 'Deletar uma anotação',
    description: `Rota para deletar uma anotação.`,
    tags: ["Anotação"],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true
      }
    ],
    responses: {
      204: {
        description: 'Anotação deletada com sucesso.',
        content: {
          'application/json': {
            schema: defaultOkResponseSchema(
              z.object({})
            ),
          },
        },
      },
      401: {
        description: 'Você precisa ser o autor dessa anotação para deletá-la.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(
              z.string().openapi({ example: 'Somente o autor da anotação pode deletá-la' })
            )
          }
        }
      },
      404: {
        description: 'Anotação não existente.',
        content: {
          "application/json": {
            schema: defaultBadResponseSchema(
              z.string().openapi({ example: 'Anotação não existe' })
            )
          }
        }
      },
    },
  })
}