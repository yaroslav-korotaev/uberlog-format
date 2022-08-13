import type { LogFormat } from 'uberlog';

export type FormatOptions = {
  maxDepth?: number;
};

export type Format = 'human' | 'compact' | 'json';
export type FormatFactory = (options?: FormatOptions) => LogFormat<string>;
export type FormatIndex = { [key in Format]: FormatFactory };
