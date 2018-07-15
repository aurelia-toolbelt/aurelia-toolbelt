import { Logger } from 'aurelia-logging';

const log = require('ololog');

/*
 * An implementation of the Appender interface.
 */
export class ColorfulConsoleAppender {
  /**
  * Appends a debug log.
  *
  * @param logger The source logger.
  * @param rest The data to log.
  */
  debug(logger: Logger, ...rest: any[]): void {

    // @ts-ignore
    log.configure({ indent: { level: 0 }, locate: false, time: { yes: true, format: 'locale' , print: x => (String(x) + ': ').magenta }  })(`DEBUG [${logger.id}]`.darkGray, ...rest);
    }

  /**
  * Appends an info log.
  *
  * @param logger The source logger.
  * @param rest The data to log.
  */
  info(logger: Logger, ...rest: any[]): void {
    // @ts-ignore
    log.configure({ indent: { level: 0 }, locate: false, time: { yes: true, format: 'locale' , print: x => (String(x) + ': ').magenta }  })(`INFO [${logger.id}]`.blue, ...rest);
  }

  /**
  * Appends a warning log.
  *
  * @param logger The source logger.
  * @param rest The data to log.
  */
  warn(logger: Logger, ...rest: any[]): void {
    // @ts-ignore
    log.configure({ indent: { level: 0 }, locate: false, time: { yes: true, format: 'locale' , print: x => (String(x) + ': ').magenta }  })(`WARN [${logger.id}]`.yellow, ...rest);
  }

  /**
  * Appends an error log.
  *
  * @param logger The source logger.
  * @param rest The data to log.
  */
  error(logger: Logger, ...rest: any[]): void {
    // @ts-ignore
    log.configure({ indent: { level: 0 }, locate: false, time: { yes: true, format: 'locale' , print: x => (String(x) + ': ').magenta }  })(`ERROR [${logger.id}]`.bgRed.white, ...rest);
  }
}
