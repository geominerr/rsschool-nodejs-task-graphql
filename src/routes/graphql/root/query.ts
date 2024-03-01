import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';

import { UserListType, UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { UUID } from 'crypto';
import { PostListType, PostType } from '../types/post.js';
import { MemberListType, MemberType, MemberTypeId } from '../types/member.js';
import { ProfileListType, ProfileType } from '../types/profile.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }, context: PrismaClient) =>
        await context.user.findUnique({
          where: {
            id: id as UUID,
          },
        }),
    },

    users: {
      type: UserListType,
      resolve: async (_, __, context: PrismaClient) => await context.user.findMany(),
    },

    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }, context: PrismaClient) =>
        await context.post.findUnique({
          where: {
            id: id as UUID,
          },
        }),
    },

    posts: {
      type: PostListType,
      resolve: async (_, __, context: PrismaClient) => {
        return await context.post.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeId } },
      resolve: async (_, { id }, context: PrismaClient) =>
        await context.memberType.findUnique({
          where: {
            id: id as UUID,
          },
        }),
    },

    memberTypes: {
      type: MemberListType,
      resolve: async (_, __, context: PrismaClient) =>
        await context.memberType.findMany(),
    },

    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }, context: PrismaClient) =>
        await context.profile.findUnique({
          where: {
            id: id as UUID,
          },
        }),
    },

    profiles: {
      type: ProfileListType,
      resolve: async (_, __, context: PrismaClient) => await context.profile.findMany(),
    },
  }),
});
