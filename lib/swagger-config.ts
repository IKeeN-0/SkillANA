import { createSwaggerSpec } from 'next-swagger-doc';
import { schemas } from './swagger-schema';

export const getApiDocs = () =>
  createSwaggerSpec({
    apiFolder: 'lib', // ← make sure this is correct
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SkillAna Project API',
        version: '1.0.0',
        description: 'API documentation for SkillAna Project',
      },

      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local development server',
        },
      ],

      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: schemas,
      },

      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });