import { z } from '../index.js'

const createDisciplineSchema = z.object({
  disciplineId: z.string().uuid(),
  deadline: z.string().openapi({ example: '2025-01-07' }), // Formato ISO-8601
  completedIn: z.string().transform((value) => (value.trim() === "" ? undefined : value)).openapi({ example: '2025-01-06' }),
  status: z.string().openapi({ example: 'c', description: 'Status da disciplina' }),
}).openapi('CreateDiscipline');

const createAttachmentSchema = z.object({
  name: z.string().nonempty().openapi({ example: 'parada.jpg' }),
  vectors: z.array(
    z.object({}).passthrough().openapi({
      example: {
        x: 10,
        y: 1,
        radius: 10,
        type: "circle"
      }
    })
  ).openapi({ description: 'Lista de vetores associados ao anexo' }),
}).openapi('CreateAttachment');

export const createAnnotationSchema = z.object({
  objectId: z.string().openapi({ description: 'Identificador único do objeto analisado' }),
  title: z.string().openapi({ example: 'Parada' }),
  description: z.string().openapi({ example: 'Falta terminar a parte de acessibilidade' }),
  visibility: z.enum(['public', 'draft', 'group', 'admin']).openapi({ description: 'Nível de visibilidade da anotação' }),
  groupId: z.string().uuid().optional().openapi({ example: '62f058a0-4b71-49f6-bb41-f9dab75e92cb', description: "Id do Grupo que poderá visualizar a anotação" }),
  priority: z.enum(['low', 'medium', 'high']).openapi({ description: 'Prioridade da anotação' }),
  disciplines: z.array(createDisciplineSchema).openapi({ description: 'Lista de disciplinas' }),
  attachments: z.array(createAttachmentSchema).openapi({ description: 'Lista de anexos' }),
}).openapi('CreateAnnotation');

const disciplineSchema = createDisciplineSchema.extend({
  id: z.string().uuid(),
  slug: z.string(),
}).openapi('Discipline')
const attachmentSchema = createAttachmentSchema.extend({
  id: z.string().uuid(),
  publicUrl: z.string().url(),
}).openapi('Attachment')

const annotation = createAnnotationSchema.extend({
  id: z.string().uuid(),
  disciplines: z.array(disciplineSchema).openapi({ description: 'Lista de disciplinas' }),
  attachments: z.array(attachmentSchema).openapi({ description: 'Lista de anexos' }),
}).openapi('Annotation')

export const listAnnotations = z.array(annotation)

export const deleteAnnotationSchema = z.object({
  id: z.string().uuid().openapi({
    description: 'O ID único da anotação'
  }),
}).openapi('DeleteAnnotationParams')
