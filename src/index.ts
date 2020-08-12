import 'reflect-metadata';
import './utils/module-alias';
import { startServer } from '@src/server';
import { connect } from '@src/config/typeorm';

async function main() {
  connect();
  const server = await startServer();
  server.listen(3000, () => {
    console.log('> [server] listen on port', 3000);
  });
}

main();
