import StarterKitBase from '@tiptap/starter-kit';

/**
 * Scribi's default StarterKit configuration
 * Provides basic editing functionality
 *
 * Re-exported from Tiptap with sensible defaults
 * You can override these options when initializing the editor
 */
export const StarterKit = StarterKitBase.configure({
  bulletList: {
    HTMLAttributes: {
      class: 'scribi-list-disc',
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: 'scribi-list-decimal',
    },
  },
  listItem: {
    HTMLAttributes: {
      class: 'scribi-list-item',
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: 'scribi-blockquote',
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: 'scribi-code-block',
    },
  },
  code: {
    HTMLAttributes: {
      class: 'scribi-code',
    },
  },
  horizontalRule: {
    HTMLAttributes: {
      class: 'scribi-hr',
    },
  },
  heading: {
    levels: [1, 2, 3, 4, 5, 6],
    HTMLAttributes: {
      class: 'scribi-heading',
    },
  },
});
