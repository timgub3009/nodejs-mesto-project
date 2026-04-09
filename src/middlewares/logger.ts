/**
 * @module middlewares/logger
 * @description Middleware для логирования запросов и ошибок.
 */

import pino from 'pino';
import path from 'path';
import { pinoHttp } from 'pino-http';

/** Путь, где размещается папка с логами. */
const logsDir = path.join(process.cwd(), 'logs');

/** Логгер запросов, собирающий логи в файле `requests.log`. */
export const requestsLogger = pinoHttp(
  {
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.destination({
    dest: path.join(logsDir, 'requests.log'),
    mkdir: true,
  }),
);

/** Логгер ошибок, собирающий логи в файле `errors.log`. */
export const errorsLogger = pinoHttp(
  {
    level: 'error',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.destination({
    dest: path.join(logsDir, 'errors.log'),
    mkdir: true,
  }),
);
