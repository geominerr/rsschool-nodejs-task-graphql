import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { PostDto } from '../types/inputs/post.js';
import { IUser } from './loaders.model.js';

export const loaders = (client: PrismaClient) => ({
  posts: new DataLoader(async (ids: readonly string[]) => {
    const posts = await client.post.findMany({
      where: {
        authorId: { in: [...ids] },
      },
    });

    const postMap = posts.reduce((map, post) => {
      if (!map.has(post.authorId)) {
        map.set(post.authorId, []);
      }

      map.get(post.authorId)?.push(post);

      return map;
    }, new Map<string, PostDto[]>());

    return ids.map((id) => postMap.get(id));
  }),

  profiles: new DataLoader(async (ids: readonly string[]) => {
    const profiles = await client.profile.findMany({
      where: {
        userId: { in: [...ids] },
      },
    });

    const sortedInIdsOrder = ids.map((id) =>
      profiles.find((profile) => profile.userId === id),
    );

    return sortedInIdsOrder;
  }),

  members: new DataLoader(async (ids: readonly string[]) => {
    const memberTypes = await client.memberType.findMany({
      where: {
        id: { in: [...ids] },
      },
    });

    const sortedInIdsOrder = ids.map((id) =>
      memberTypes.find((memberType) => memberType.id === id),
    );

    return sortedInIdsOrder;
  }),

  subscribers: new DataLoader(async (ids: readonly string[]) => {
    const usersSubs = await client.user.findMany({
      where: { id: { in: [...ids] } },
      include: { subscribedToUser: { select: { subscriber: true } } },
    });

    const subscribersMap = usersSubs.reduce((map, user) => {
      const existingSubscribers = map.get(user.id) || [];
      map.set(user.id, [
        ...existingSubscribers,
        ...user.subscribedToUser.map((sub) => sub.subscriber),
      ]);

      return map;
    }, new Map<string, IUser[]>());

    return ids.map((id) => subscribersMap.get(id));
  }),

  userSubscribedTo: new DataLoader(async (ids: readonly string[]) => {
    const authors = await client.user.findMany({
      where: { id: { in: [...ids] } },
      include: { userSubscribedTo: { select: { author: true } } },
    });

    const authorsMap = authors.reduce((map, user) => {
      map.set(
        user.id,
        user.userSubscribedTo.map((sub) => sub.author),
      );

      return map;
    }, new Map<string, IUser[]>());

    return ids.map((id) => authorsMap.get(id));
  }),
});
