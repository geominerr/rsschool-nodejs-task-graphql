import { GraphQLObjectType, GraphQLNonNull } from 'graphql';

import { UserListType, UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { UUID } from 'crypto';
import { PostListType, PostType } from '../types/post.js';
import { MemberListType, MemberType, MemberTypeId } from '../types/member.js';
import { ProfileListType, ProfileType } from '../types/profile.js';
import { IContext } from '../loaders/loaders.model.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }, { prisma }: IContext) =>
        await prisma.user.findUnique({
          where: {
            id: id as UUID,
          },
        }),
    },

    users: {
      type: UserListType,
      resolve: async (_, __, { prisma}: IContext) => {

        const res = await prisma.user.findMany();
        return res;
      },
    },

    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }, { prisma }: IContext) =>
        await prisma.post.findUnique({
          where: {
            id: id as UUID,
          },
        }),
    },

    posts: {
      type: PostListType,
      resolve: async (_, __, { prisma }: IContext) => {
        return await prisma.post.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeId } },
      resolve: async (_, { id }, { prisma }: IContext) =>
        await prisma.memberType.findUnique({
          where: {
            id: id as string,
          },
        }),
    },

    memberTypes: {
      type: MemberListType,
      resolve: async (_, __, { prisma }: IContext) => await prisma.memberType.findMany(),
    },

    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }, { prisma }: IContext) =>
        await prisma.profile.findUnique({
          where: {
            id: id as UUID,
          },
        }),
    },

    profiles: {
      type: ProfileListType,
      resolve: async (_, __, { prisma }: IContext) => await prisma.profile.findMany(),
    },
  }),
});
