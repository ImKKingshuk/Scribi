import type { EditorProviderProps, JSONContent } from '@tiptap/react';
import { EditorProvider } from '@tiptap/react';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

/**
 * Main editor content component
 * Wraps Tiptap's EditorProvider with Scribi-specific configuration
 *
 * @example
 * ```tsx
 * <EditorContent
 *   initialContent={myContent}
 *   extensions={[StarterKit, Placeholder, ...]}
 *   editorProps={{
 *     attributes: {
 *       class: 'prose focus:outline-none',
 *     },
 *   }}
 * >
 *   <EditorBubble />
 *   <EditorCommand />
 * </EditorContent>
 * ```
 */
export type EditorContentProps = Omit<EditorProviderProps, 'content'> & {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly initialContent?: JSONContent;
};

export const EditorContent = forwardRef<HTMLDivElement, EditorContentProps>(
  ({ className, children, initialContent, ...rest }, ref) => (
    <div ref={ref} className={className}>
      <EditorProvider {...rest} content={initialContent}>
        {children}
      </EditorProvider>
    </div>
  ),
);

EditorContent.displayName = 'EditorContent';
