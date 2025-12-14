/**
 * Scribi - A developer-first WYSIWYG editor
 *
 * No vendor lock-in. No forced features. Just a powerful editor.
 *
 * @example
 * ```tsx
 * import { EditorRoot, EditorContent, StarterKit, Placeholder } from 'scribi';
 *
 * function MyEditor() {
 *   return (
 *     <EditorRoot>
 *       <EditorContent
 *         extensions={[StarterKit, Placeholder]}
 *         initialContent={{ type: 'doc', content: [] }}
 *       />
 *     </EditorRoot>
 *   );
 * }
 * ```
 */

// ============================================================================
// Core Components
// ============================================================================

export type { EditorContentProps } from './components/editor-content';
export { EditorContent } from './components/editor-content';
export { EditorRoot } from './components/editor-root';

// ============================================================================
// Bubble Menu (Selection Toolbar)
// ============================================================================

export { EditorBubble, EditorBubbleItem } from './components/editor-bubble';

// ============================================================================
// Command Palette (Slash Commands)
// ============================================================================

export {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
} from './components/editor-command';

// ============================================================================
// Hooks
// ============================================================================

export { useEditor } from './hooks/use-editor';

// ============================================================================
// Extensions
// ============================================================================

export {
  CharacterCount,
  Color,
  Highlight,
  HorizontalRule,
  Image,
  Link,
  Markdown,
  TaskItem,
  TaskList,
  TextStyle,
  Underline,
  Youtube,
} from './extensions/basic';
export { CodeBlock, createLowlight } from './extensions/code-block';
export { Placeholder } from './extensions/placeholder';
export {
  Command,
  createCommandRenderer,
  createSuggestionItems,
  handleCommandNavigation,
} from './extensions/slash-command';
export { StarterKit } from './extensions/starter-kit';

// ============================================================================
// Plugins (Image Upload, etc.)
// ============================================================================

export {
  createImageUpload,
  handleImageDrop,
  handleImagePaste,
  UploadImagesPlugin,
} from './plugins/upload-images';

// ============================================================================
// Utilities
// ============================================================================

export { queryAtom, rangeAtom } from './utils/atoms';
export { getAllContent, getPrevText, getTextInRange } from './utils/editor';
export { scribiStore } from './utils/store';
export { getUrlFromString, isValidUrl } from './utils/url';

// ============================================================================
// Types
// ============================================================================

export type {
  EditorInstance,
  ImageUploadOptions,
  JSONContent,
  Range,
  SuggestionItem,
  UploadFn,
} from './types/editor';
