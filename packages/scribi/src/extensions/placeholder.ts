import PlaceholderBase from '@tiptap/extension-placeholder';

/**
 * Placeholder extension with default styling
 * Shows placeholder text when editor is empty
 */
export const Placeholder = PlaceholderBase.configure({
  placeholder: ({ node }) => {
    if (node.type.name === 'heading') {
      return 'Untitled';
    }
    return "Press '/' for commands...";
  },
  includeChildren: true,
});
