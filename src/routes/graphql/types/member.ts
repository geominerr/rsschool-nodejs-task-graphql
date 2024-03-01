import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { ProfileListType } from './profile.js';
import { PrismaClient } from '@prisma/client';

export const MemberTypeId: GraphQLEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});

export const MemberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },

    profiles: {
      type: ProfileListType,
      resolve: async ({ id }, _, context: PrismaClient) =>
        await context.profile.findMany({ where: { memberTypeId: id as string } }),
    },
  }),
});

export const MemberListType = new GraphQLList(MemberType);
