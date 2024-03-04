import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostListType } from './post.js';
import { UUID } from 'crypto';
import { IContext } from '../loaders/loaders.model.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }, _, { loaders }: IContext) =>
        await loaders.profiles.load(id as UUID),
    },

    posts: {
      type: PostListType,
      resolve: async ({ id }, __, { loaders }: IContext) =>
        await loaders.posts.load(id as UUID),
    },

    userSubscribedTo: {
      type: UserListType,
      resolve: async ({ id }, __, { loaders }: IContext) =>
        await loaders.userSubscribedTo.load(id as UUID),
    },

    subscribedToUser: {
      type: UserListType,
      resolve: async ({ id }, __, { loaders }: IContext) =>
        await loaders.subscribers.load(id as UUID),
    },
  }),
});

export const UserListType = new GraphQLList(UserType);
