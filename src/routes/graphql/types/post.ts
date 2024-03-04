import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { UUID } from 'crypto';
import { IContext } from '../loaders/loaders.model.js';

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
      resolve: async ({ authorId }, _, { prisma }: IContext) =>
      
        await prisma.user.findUnique({ where: { id: authorId as UUID } }),
    },
  }),
});

export const PostListType = new GraphQLList(PostType);
