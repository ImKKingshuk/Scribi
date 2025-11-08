import { Provider } from 'jotai';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import tunnel from 'tunnel-rat';
import { scribiStore } from '../utils/store';
import { EditorCommandTunnelContext } from './editor-command';

/**
 * Root component for Scribi editor
 * Provides context and state management for the editor
 *
 * @example
 * ```tsx
 * <EditorRoot>
 *   <EditorContent {...editorProps}>
 *     <EditorBubble />
 *   </EditorContent>
 * </EditorRoot>
 * ```
 */
export interface EditorRootProps {
  readonly children: ReactNode;
}

export const EditorRoot: FC<EditorRootProps> = ({ children }) => {
  const tunnelInstance = useRef(tunnel()).current;

  return (
    <Provider store={scribiStore}>
      <EditorCommandTunnelContext.Provider value={tunnelInstance}>
        {children}
      </EditorCommandTunnelContext.Provider>
    </Provider>
  );
};
