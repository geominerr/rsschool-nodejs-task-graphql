import { PrismaClient } from '@prisma/client';
import { loaders } from './loaders.js';

export interface IContext {
  prisma: PrismaClient;
  loaders: ReturnType<typeof loaders>;
}

export interface IUser {
  id: string;
  name: string;
}
