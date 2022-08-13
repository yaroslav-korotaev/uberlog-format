export * from './types';
export * from './utils';
export * from './human';
export * from './compact';
export * from './json';

import { human } from './human';
import { compact } from './compact';
import { json } from './json';
import type { FormatIndex } from './types';

export const FORMATS: FormatIndex = { human, compact, json };
