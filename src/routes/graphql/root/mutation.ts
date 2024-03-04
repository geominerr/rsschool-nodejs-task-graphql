import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

import { IContext } from '../loaders/loaders.model.js';
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
      resolve: async (_, { dto }, { prisma }: IContext) => {
        return await prisma.post.create({ data: { ...(dto as PostDto) } });
      },
    },

    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInput } },
      resolve: async (_, { dto }, { prisma }: IContext) => {
        return await prisma.user.create({ data: { ...(dto as UserDto) } });
      },
    },

    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInput } },
      resolve: async (_, { dto }, { prisma }: IContext) => {
        return await prisma.profile.create({ data: { ...(dto as ProfileDto) } });
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }, { prisma }: IContext) => {
        await prisma.post.delete({ where: { id: id as UUID } });

        return true;
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }, { prisma }: IContext) => {
        await prisma.user.delete({ where: { id: id as UUID } });

        return true;
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }, { prisma }: IContext) => {
        await prisma.profile.delete({ where: { id: id as UUID } });

        return true;
      },
    },

    changePost: {
      type: PostType,
      args: { dto: { type: ChangePostInput }, id: { type: UUIDType } },
      resolve: async (_, { dto, id }, { prisma }: IContext) => {
        return await prisma.post.update({
          where: { id: id as UUID },
          data: { ...(dto as ChangePostDto) },
        });
      },
    },

    changeUser: {
      type: UserType,
      args: { dto: { type: ChangeUserInput }, id: { type: UUIDType } },
      resolve: async (_, { dto, id }, { prisma }: IContext) => {
        return await prisma.user.update({
          where: { id: id as UUID },
          data: { ...(dto as ChangeUserDto) },
        });
      },
    },

    changeProfile: {
      type: ProfileType,
      args: { dto: { type: ChangeProfileInput }, id: { type: UUIDType } },
      resolve: async (_, { dto, id }, { prisma }: IContext) => {
        return await prisma.profile.update({
          where: { id: id as UUID },
          data: { ...(dto as ChangeProfileDto) },
        });
      },
    },

    subscribeTo: {
      type: UserType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_, { userId, authorId }, { prisma }: IContext) => {
        return await prisma.subscribersOnAuthors.create({
          data: { subscriberId: userId as UUID, authorId: authorId as UUID },
        });
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_, { userId, authorId }, { prisma }: IContext) => {
        await prisma.subscribersOnAuthors.delete({
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
