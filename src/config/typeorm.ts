import { join } from 'path';
import { createConnection } from 'typeorm';

export async function connect(): Promise<void> {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'graphqltsorm',
    entities: [join(__dirname, '../models/**/**.ts')],
    synchronize: true,
  });

  console.log('> [database] connected');
}
