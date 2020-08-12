import { join } from 'path';
import { createConnection, ConnectionOptions } from 'typeorm';

import logger from '@src/utils/logger';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'graphqltsorm',
  entities: [join(__dirname, '../entities/**/**{.ts,.js}')],
  synchronize: true,
};

export async function connectDatabase(): Promise<void> {
  await createConnection(config);

  logger.info('> [database] connected');
}
