import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';

import { PostType } from '../types/post.js';
import { UserType } from '../types/user.js';
import { ProfileType } from '../types/profile.js';

import {
  CreateUserInput,
  UserDto,
  ChangeUserInput,
  ChangeUserDto,
} from '../types/inputs/user.js';
import {
  CreatePostInput,
  PostDto,
  ChangePostInput,
  ChangePostDto,
} from '../types/inputs/post.js';
import {
  CreateProfileInput,
  ProfileDto,
  ChangeProfileInput,
  ChangeProfileDto,
} from '../types/inputs/profile.js';
import { UUIDType } from '../types/uuid.js';
import { UUID } from 'crypto';

export const MutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInput } },
      resolve: async (_, { dto }, context: PrismaClient) => {
        return await context.post.create({ data: { ...(dto as PostDto) } });
      },
    },

    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInput } },
      resolve: async (_, { dto }, context: PrismaClient) => {
        return await context.user.create({ data: { ...(dto as UserDto) } });
      },
    },

    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInput } },
      resolve: async (_, { dto }, context: PrismaClient) => {
        return await context.profile.create({ data: { ...(dto as ProfileDto) } });
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }, context: PrismaClient) => {
        await context.post.delete({ where: { id: id as UUID } });

        return true;
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }, context: PrismaClient) => {
        await context.user.delete({ where: { id: id as UUID } });

        return true;
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }, context: PrismaClient) => {
        await context.profile.delete({ where: { id: id as UUID } });

        return true;
      },
    },

    changePost: {
      type: PostType,
      args: { dto: { type: ChangePostInput }, id: { type: UUIDType } },
      resolve: async (_, { dto, id }, context: PrismaClient) => {
        return await context.post.update({
          where: { id: id as UUID },
          data: { ...(dto as ChangePostDto) },
        });
      },
    },

    changeUser: {
      type: UserType,
      args: { dto: { type: ChangeUserInput }, id: { type: UUIDType } },
      resolve: async (_, { dto, id }, context: PrismaClient) => {
        return await context.user.update({
          where: { id: id as UUID },
          data: { ...(dto as ChangeUserDto) },
        });
      },
    },

    changeProfile: {
      type: ProfileType,
      args: { dto: { type: ChangeProfileInput }, id: { type: UUIDType } },
      resolve: async (_, { dto, id }, context: PrismaClient) => {
        return await context.profile.update({
          where: { id: id as UUID },
          data: { ...(dto as ChangeProfileDto) },
        });
      },
    },

    subscribeTo: {
      type: UserType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_, { userId, authorId }, context: PrismaClient) => {
        return await context.subscribersOnAuthors.create({
          data: { subscriberId: userId as UUID, authorId: authorId as UUID },
        });
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_, { userId, authorId }, context: PrismaClient) => {
        await context.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId as UUID,
              authorId: authorId as UUID,
            },
          },
        });

        return true;
      },
    },
  }),
});
