import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: {
      type: UUIDType,
    },
    author: {
      type: UserType,
      resolve: async ({ authorId }, _, context: PrismaClient) =>
        await context.user.findUnique({ where: { id: authorId as UUID } }),
    },
  }),
});

export const PostListType = new GraphQLList(PostType);
