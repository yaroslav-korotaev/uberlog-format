import type { LogFormat } from 'uberlog';
import formatDate from 'date-fns/lightFormat';
import type { FormatOptions } from './types';
import {
  LEVEL_COLORS,
  createSerializer,
  errorMessage,
} from './utils';

export function human(options?: FormatOptions): LogFormat<string> {
  const serialize = createSerializer(options);
  
  return line => {
    const { time, level, msg, ...rest } = line;
    const { err } = rest;
    const now = new Date(time);
    
    const color = LEVEL_COLORS[level];
    const strLevel = color(level.toUpperCase());
    let str = `[${formatDate(now, 'HH:mm:ss.SSS')}] ${strLevel.padStart(5)}`;
    
    if (msg) {
      str = `${str}: ${msg}`;
    }
    
    if (err) {
      str = `${str}: ${errorMessage(err)}`;
    }
    
    if (Object.keys(rest).length > 0) {
      str = str + '\n' + serialize(rest);
    }
    
    return str + '\n';
  };
}
