import type { LogFormat } from 'uberlog';
import type { FormatOptions } from './types';
import {
  LEVEL_COLORS,
  SEVERE_LEVELS,
  createSerializer,
  errorMessage,
  compactError,
  join,
} from './utils';

export function compact(options?: FormatOptions): LogFormat<string> {
  const serialize = createSerializer(options);
  
  return line => {
    const { time, level, msg, ...rest } = line;
    const { err, ...restWithoutErr } = rest;
    
    let str = join(msg, err && errorMessage(err));
    
    const hasPayload = Object.keys(rest).length > 0;
    
    if ((str || hasPayload) && SEVERE_LEVELS.includes(level)) {
      const color = LEVEL_COLORS[level];
      str = join(color(level), str);
    }
    
    if (hasPayload) {
      if (str) {
        str += '\n';
      }
      
      str += serialize(err ? { err: compactError(err), ...restWithoutErr } : rest);
    }
    
    return str + '\n';
  };
}
