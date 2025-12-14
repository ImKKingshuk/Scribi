import { createStore } from 'jotai';

/**
 * Scribi's internal store for managing editor state
 * This is isolated per editor instance to support multiple editors on one page
 */
export const scribiStore = createStore();
