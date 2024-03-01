import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PrismaClient } from '@prisma/client';
import { PostListType } from './post.js';

import { UUID } from 'crypto';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }, _, context: PrismaClient) =>
        await context.profile.findUnique({ where: { userId: id as UUID } }),
    },

    posts: {
      type: PostListType,
      resolve: async ({ id }, __, context: PrismaClient) =>
        await context.post.findMany({ where: { authorId: id as UUID } }),
    },

    userSubscribedTo: {
      type: UserListType,
      resolve: async ({ id }, __, context: PrismaClient) =>
        (
          await context.subscribersOnAuthors.findMany({
            where: {
              subscriberId: id as UUID,
            },
            select: { author: true },
          })
        ).map((res) => res.author),
    },

    subscribedToUser: {
      type: UserListType,
      resolve: async ({ id }, __, context: PrismaClient) =>
        (
          await context.subscribersOnAuthors.findMany({
            where: {
              authorId: id as UUID,
            },
            select: { subscriber: true },
          })
        ).map((res) => res.subscriber),
    },
  }),
});

export const UserListType = new GraphQLList(UserType);
