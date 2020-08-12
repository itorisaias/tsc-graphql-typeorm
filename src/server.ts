import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PingResolver } from './graphql/ping';
import { ProductResolver } from './graphql/resolvers/ProductResolver';

const app = express();

export async function startServer(): Promise<Application> {
  try {
    const schema = await buildSchema({
      resolvers: [PingResolver, ProductResolver],
    });
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({ app, path: '/graphql' });

    return app;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
