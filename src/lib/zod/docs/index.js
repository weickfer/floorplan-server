import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { annotationsDoc } from "./annotations.js";
import { groupsDoc } from "./groups.js";
import { projectsDoc } from "./projects.js";

const registry = new OpenAPIRegistry()

registry.registerComponent('securitySchemes', 'AccessTokenAuth', {
  type: 'apiKey',
  in: 'header',
  name: 'x-access-token',
  description: 'Forneça o token de acesso',
});

registry.registerComponent('securitySchemes', 'ParentPlatformAuth', {
  type: 'apiKey',
  in: 'header',
  name: 'x-platform-token',
  description: 'Acesso restrito à plataforma. Forneça a chave da plataforma no cabeçalho.',
});

annotationsDoc(registry)
groupsDoc(registry)
projectsDoc(registry)

const generator = new OpenApiGeneratorV3(registry.definitions);
const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'API de Anotações',
    version: '1.0.0',
  },
  servers: [{ url: '/' }],
  security: [{ AccessTokenAuth: [] }]
});

export { openApiDocument }
