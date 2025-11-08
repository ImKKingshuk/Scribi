import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

/**
 * Code block with syntax highlighting using lowlight
 * Supports common languages by default
 *
 * You can customize the languages by passing your own lowlight instance
 */
const lowlight = createLowlight(common);

export const CodeBlock = CodeBlockLowlight.configure({
  lowlight,
  HTMLAttributes: {
    class: 'scribi-code-block',
  },
});

export { lowlight, createLowlight };
