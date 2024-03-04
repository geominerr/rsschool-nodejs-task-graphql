import { GraphQLInputObjectType, GraphQLString } from 'graphql';

import { UUIDType } from '../uuid.js';

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export type PostDto = {
  title: string;
  content: string;
  authorId: string;
};

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
  },
});

export type ChangePostDto = {
  title: string;
};
