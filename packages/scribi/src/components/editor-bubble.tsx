import { useCurrentEditor } from '@tiptap/react';
import {
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

/**
 * Bubble menu that appears when text is selected
 * Provides quick access to formatting options
 *
 * @example
 * ```tsx
 * <EditorBubble className="flex gap-1 p-1 bg-white rounded-lg shadow-lg">
 *   <EditorBubbleItem
 *     onSelect={(editor) => editor.chain().focus().toggleBold().run()}
 *     isActive={(editor) => editor.isActive('bold')}
 *   >
 *     <Bold size={16} />
 *   </EditorBubbleItem>
 *   <EditorBubbleItem
 *     onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
 *     isActive={(editor) => editor.isActive('italic')}
 *   >
 *     <Italic size={16} />
 *   </EditorBubbleItem>
 * </EditorBubble>
 * ```
 */
export const EditorBubble: FC<
  HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    tippyOptions?: Record<string, unknown>;
  }
> = ({ children, className, tippyOptions, ...rest }) => {
  const { editor } = useCurrentEditor();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updatePosition = () => {
      const { state } = editor;
      const { selection } = state;
      const { from, to } = selection;

      // Hide if no selection
      if (from === to) {
        setIsVisible(false);
        return;
      }

      // Get selection coordinates
      const start = editor.view.coordsAtPos(from);
      const end = editor.view.coordsAtPos(to);

      // Calculate bubble position
      const left = (start.left + end.left) / 2;
      const top = start.top - 50; // Position above selection

      setPosition({ top, left });
      setIsVisible(true);
    };

    // Update on selection change
    editor.on('selectionUpdate', updatePosition);
    editor.on('update', updatePosition);

    return () => {
      editor.off('selectionUpdate', updatePosition);
      editor.off('update', updatePosition);
    };
  }, [editor]);

  if (!isVisible || !editor) return null;

  const bubble = (
    <div
      ref={bubbleRef}
      className={className}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        transform: 'translateX(-50%)',
        zIndex: 50,
      }}
      {...rest}
    >
      {children}
    </div>
  );

  return createPortal(bubble, document.body);
};

/**
 * Individual item in the bubble menu
 *
 * @example
 * ```tsx
 * <EditorBubbleItem
 *   onSelect={(editor) => editor.chain().focus().toggleBold().run()}
 *   isActive={(editor) => editor.isActive('bold')}
 * >
 *   <Bold size={16} />
 * </EditorBubbleItem>
 * ```
 */
export const EditorBubbleItem: FC<
  HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    onSelect?: (editor: any) => void;
    isActive?: (editor: any) => boolean;
  }
> = ({ children, onSelect, isActive, className, ...rest }) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const active = isActive?.(editor) ?? false;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(editor)}
      className={`${className} ${active ? 'is-active' : ''}`}
      data-active={active}
      {...rest}
    >
      {children}
    </button>
  );
};
