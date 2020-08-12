import 'reflect-metadata';

import './utils/module-alias';
import { startServer } from '@src/server';
import { connect } from '@src/config/typeorm';
import logger from '@src/logger';

(async (): Promise<void> => {
  try {
    connect();
    const server = await startServer();
    server.listen(3000, () => {
      logger.info('> [server] listen on port', 3000);
    });
  } catch (error) {
    logger.error('Falied on startup', error);
  }
})();
