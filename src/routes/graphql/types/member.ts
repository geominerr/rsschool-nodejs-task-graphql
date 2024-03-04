import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { ProfileListType } from './profile.js';
import { IContext } from '../loaders/loaders.model.js';

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
      resolve: async ({ id }, _, { prisma }: IContext) =>
        await prisma.profile.findMany({ where: { memberTypeId: id as string } }),
    },
  }),
});

export const MemberListType = new GraphQLList(MemberType);
