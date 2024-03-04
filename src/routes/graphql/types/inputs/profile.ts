import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';

import { MemberTypeId } from '../member.js';
import { UUIDType } from '../uuid.js';

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
    userId: { type: UUIDType },
  },
});

export type ProfileDto = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
};

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
  },
});

export type ChangeProfileDto = {
  isMale: boolean;
};
