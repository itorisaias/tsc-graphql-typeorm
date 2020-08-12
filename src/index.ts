import 'reflect-metadata';

import './utils/module-alias';
import logger from '@src/utils/logger';
import { connectDatabase, startServer } from '@src/config';

(async (): Promise<void> => {
  try {
    connectDatabase();
    const server = await startServer();
    server.listen(3000, () => {
      logger.info('> [server] listen on port', 3000);
    });
  } catch (error) {
    logger.error('Falied on startup', error);
  }
})();
