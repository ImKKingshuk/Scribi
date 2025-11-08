/**
 * Basic Editor Example
 *
 * This example shows the minimal setup required for Scribi.
 * Perfect for getting started quickly!
 */

import { EditorContent, EditorRoot, Placeholder, StarterKit } from 'scribi';

export function BasicEditor() {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[StarterKit, Placeholder]}
        initialContent={{
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Start typing here...',
                },
              ],
            },
          ],
        }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[300px] p-4',
          },
        }}
      />
    </EditorRoot>
  );
}
