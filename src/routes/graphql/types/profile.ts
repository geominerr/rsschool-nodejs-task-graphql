import { GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { UUID } from 'crypto';
import { MemberType, MemberTypeId } from './member.js';
import { IContext } from '../loaders/loaders.model.js';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLFloat },

    userId: {
      type: UUIDType,
    },

    user: {
      type: UserType,
      resolve: async ({ id }, _, { prisma }: IContext) =>
        await prisma.user.findUnique({ where: { id: id as UUID } }),
    },

    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }, _, { loaders }: IContext) =>
        await loaders.members.load(memberTypeId as string),
    },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const ProfileListType = new GraphQLList(ProfileType);
