/**
 * Editor with Bubble Menu Example
 *
 * Shows how to add a formatting toolbar that appears when text is selected.
 */

import {
  EditorBubble,
  EditorBubbleItem,
  EditorContent,
  EditorRoot,
  Link,
  Placeholder,
  StarterKit,
  Underline,
} from 'scribi';

export function EditorWithBubbleMenu() {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[StarterKit, Placeholder, Underline, Link]}
        initialContent={{ type: 'doc', content: [] }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[300px] p-4',
          },
        }}
      >
        {/* Bubble menu appears when text is selected */}
        <EditorBubble className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-lg border">
          <EditorBubbleItem
            onSelect={(editor) => editor.chain().focus().toggleBold().run()}
            isActive={(editor) => editor.isActive('bold')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <strong>B</strong>
          </EditorBubbleItem>

          <EditorBubbleItem
            onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
            isActive={(editor) => editor.isActive('italic')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <em>I</em>
          </EditorBubbleItem>

          <EditorBubbleItem
            onSelect={(editor) =>
              editor.chain().focus().toggleUnderline().run()
            }
            isActive={(editor) => editor.isActive('underline')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <u>U</u>
          </EditorBubbleItem>

          <EditorBubbleItem
            onSelect={(editor) => editor.chain().focus().toggleStrike().run()}
            isActive={(editor) => editor.isActive('strike')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <s>S</s>
          </EditorBubbleItem>

          <EditorBubbleItem
            onSelect={(editor) => {
              const url = prompt('Enter URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            isActive={(editor) => editor.isActive('link')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            🔗
          </EditorBubbleItem>
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
}
