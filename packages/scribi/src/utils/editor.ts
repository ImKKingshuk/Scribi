import type { Editor, Range } from '@tiptap/core';

/**
 * Gets the text before the current cursor position
 * Useful for slash commands and autocomplete
 */
export function getPrevText(
  editor: Editor,
  { chars, offset = 0 }: { chars: number; offset?: number },
): string {
  const { from } = editor.state.selection;
  const textBefore = editor.state.doc.textBetween(
    Math.max(0, from - chars),
    from - offset,
    '\n',
  );
  return textBefore;
}

/**
 * Gets all content from the editor as plain text
 */
export function getAllContent(editor: Editor): string {
  return editor.state.doc.textContent;
}

/**
 * Gets the text within a specific range
 */
export function getTextInRange(editor: Editor, range: Range): string {
  return editor.state.doc.textBetween(range.from, range.to, '\n');
}
