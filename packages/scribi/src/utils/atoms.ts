import { atom } from 'jotai';
import type { Range } from '../types/editor';

/**
 * Atom for storing the current query in the slash command
 */
export const queryAtom = atom<string>('');

/**
 * Atom for storing the current range in the slash command
 */
export const rangeAtom = atom<Range>({
  from: 0,
  to: 0,
});
