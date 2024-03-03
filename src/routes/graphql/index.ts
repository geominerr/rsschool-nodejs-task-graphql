import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

import { createGqlResponseSchema, gqlAppSchema, gqlResponseSchema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const depthLimitValue: number = 5;

  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const documentAST = parse(query);
      const validateErrors = validate(gqlAppSchema, documentAST, [
        depthLimit(depthLimitValue),
      ]);

      if (validateErrors.length) {
        return { errors: validateErrors };
      }

      return await graphql({
        schema: gqlAppSchema,
        source: query,
        variableValues: variables,
        contextValue: prisma,
      });
    },
  });
};

export default plugin;
