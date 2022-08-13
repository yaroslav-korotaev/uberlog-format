import { inspectify } from 'inspectify';
import type { LogFormat } from 'uberlog';
import type { FormatOptions } from './types';

export function json(options?: FormatOptions): LogFormat<string> {
  return line => JSON.stringify(inspectify(line, options)) + '\n';
}
