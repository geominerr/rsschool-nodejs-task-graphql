import { GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';
import { MemberType, MemberTypeId } from './member.js';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLFloat },

    user: {
      type: UserType,
      resolve: async ({ id }, _, context: PrismaClient) =>
        await context.user.findUnique({ where: { id: id as UUID } }),
    },

    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }, _, context: PrismaClient) =>
        await context.memberType.findUnique({ where: { id: memberTypeId as string } }),
    },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const ProfileListType = new GraphQLList(ProfileType);
