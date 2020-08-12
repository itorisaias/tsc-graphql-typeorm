import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';

import { resolvers } from '@src/graphql/resolvers';

const app = express();

export async function startServer(): Promise<Application> {
  try {
    const schema = await buildSchema({
      resolvers: resolvers as NonEmptyArray<Function>,
    });
    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(5)],
      context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({ app, path: '/graphql' });

    return app;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
