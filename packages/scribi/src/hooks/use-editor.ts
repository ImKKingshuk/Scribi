import { useCurrentEditor } from '@tiptap/react';
import type { EditorInstance } from '../types/editor';

/**
 * Hook to access the current editor instance
 *
 * @returns Object containing the editor instance and a loading state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { editor } = useEditor();
 *
 *   if (!editor) return null;
 *
 *   return (
 *     <button onClick={() => editor.chain().focus().toggleBold().run()}>
 *       Bold
 *     </button>
 *   );
 * }
 * ```
 */
export function useEditor() {
  const { editor } = useCurrentEditor();

  return {
    editor: editor as EditorInstance | null,
  };
}
