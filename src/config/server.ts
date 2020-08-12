import express, { Application } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';
import expressPino from 'express-pino-logger';

import { resolvers } from '@src/graphql/resolvers';
import logger from '@src/utils/logger';

const app = express();

app.use(express.json());
app.use(
  expressPino({
    logger,
  })
);
app.use(cors({ origin: '*' }));

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
    logger.error(error);
    throw error;
  }
}
