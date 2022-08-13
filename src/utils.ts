import util from 'util';
import chalk from 'chalk';
import type { LogLevel } from 'uberlog';

export type Serializer = (value: any) => string;

export const LEVEL_COLORS: { [key in LogLevel]: chalk.Chalk } = {
  silent: chalk,
  trace: chalk.gray,
  debug: chalk.blue,
  info: chalk.green,
  warn: chalk.yellow,
  error: chalk.red,
  fatal: chalk.bgRed.white,
};

export const SEVERE_LEVELS: LogLevel[] = ['trace', 'debug', 'warn', 'error', 'fatal'];

export type CreateSerializerOptions = {
  maxDepth?: number;
};

export function createSerializer(options?: CreateSerializerOptions): Serializer {
  return value => util.inspect(value, {
    depth: options?.maxDepth ?? 20,
    colors: true,
    breakLength: 120,
  });
}

export function errorMessage(error: Error): string {
  if (error.cause) {
    return `${error.message}: ${errorMessage(error.cause)}`;
  }
  
  return error.message;
}

export type CompactErrorLike = {
  message?: string;
  cause?: CompactErrorLike;
  [key: string]: any;
};

export function compactError(err: Error | undefined): CompactErrorLike | undefined {
  if (!err) {
    return undefined;
  }
  
  return Object.assign({
    message: err.message,
    cause: compactError(err.cause),
  }, err);
}

export function join(a: string | undefined, b: string | undefined): string {
  if (a && b) {
    return `${a}: ${b}`;
  } else {
    return a || b || '';
  }
}
