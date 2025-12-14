/**
 * Full-Featured Editor Example
 *
 * This example shows ALL the features of Scribi in one place.
 * Use this as a reference for building your own custom editor!
 */

import { useState } from 'react';
import {
  CharacterCount,
  CodeBlock,
  Color,
  createImageUpload,
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  Highlight,
  handleImageDrop,
  handleImagePaste,
  Image,
  // Types
  type JSONContent,
  Link,
  Markdown,
  Placeholder,
  // Extensions
  StarterKit,
  TaskItem,
  TaskList,
  Underline,
  // Plugins
  UploadImagesPlugin,
  useEditor,
  Youtube,
} from 'scribi';

// Custom upload handler
const uploadFn = createImageUpload({
  validateFn: (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large! Max 5MB');
      return false;
    }
    return true;
  },
  onUpload: async (file) => {
    // Replace with your actual upload logic
    console.log('Uploading:', file.name);

    // Simulate upload
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  },
});

export function FullFeaturedEditor() {
  const [content, setContent] = useState<JSONContent>({
    type: 'doc',
    content: [],
  });

  const extensions = [
    StarterKit,
    Placeholder.configure({
      placeholder: "Type '/' for commands, or start writing...",
    }),
    CodeBlock,
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-600 underline',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-lg max-w-full',
      },
    }),
    TaskList.configure({
      HTMLAttributes: {
        class: 'scribi-task-list',
      },
    }),
    TaskItem.configure({
      HTMLAttributes: {
        class: 'scribi-task-item',
      },
    }),
    CharacterCount,
    Markdown,
    Youtube.configure({
      controls: true,
      HTMLAttributes: {
        class: 'rounded-lg w-full aspect-video',
      },
    }),
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    UploadImagesPlugin({ imageClass: 'rounded-lg' }),
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Scribi Full-Featured Editor</h1>

      <div className="border rounded-lg p-4 bg-white shadow-lg">
        <EditorRoot>
          <EditorContent
            extensions={extensions}
            initialContent={content}
            onUpdate={({ editor }) => {
              setContent(editor.getJSON());
            }}
            editorProps={{
              attributes: {
                class: 'prose prose-lg focus:outline-none min-h-[400px]',
              },
              handleDrop: (view, event, _, moved) =>
                handleImageDrop(view, event as DragEvent, moved, uploadFn),
              handlePaste: (view, event) =>
                handleImagePaste(view, event, uploadFn),
            }}
          >
            {/* Bubble Menu */}
            <EditorBubble className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-lg border">
              <EditorBubbleItem
                onSelect={(editor) => editor.chain().focus().toggleBold().run()}
                isActive={(editor) => editor.isActive('bold')}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <strong>B</strong>
              </EditorBubbleItem>

              <EditorBubbleItem
                onSelect={(editor) =>
                  editor.chain().focus().toggleItalic().run()
                }
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
                onSelect={(editor) =>
                  editor.chain().focus().toggleStrike().run()
                }
                isActive={(editor) => editor.isActive('strike')}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <s>S</s>
              </EditorBubbleItem>

              <EditorBubbleItem
                onSelect={(editor) => editor.chain().focus().toggleCode().run()}
                isActive={(editor) => editor.isActive('code')}
                className="p-2 hover:bg-gray-100 rounded font-mono"
              >
                {'<>'}
              </EditorBubbleItem>

              <div className="w-px h-6 bg-gray-300" />

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

              <EditorBubbleItem
                onSelect={(editor) =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: '#fef08a' })
                    .run()
                }
                isActive={(editor) => editor.isActive('highlight')}
                className="p-2 hover:bg-gray-100 rounded"
              >
                🖍️
              </EditorBubbleItem>
            </EditorBubble>

            {/* Slash Commands */}
            <EditorCommand className="border rounded-lg shadow-lg bg-white p-2 max-h-[300px] overflow-y-auto">
              <EditorCommandList>
                <EditorCommandEmpty className="p-2 text-gray-500">
                  No results found
                </EditorCommandEmpty>

                <EditorCommandItem
                  value="heading-1"
                  onCommand={({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .setHeading({ level: 1 })
                      .run();
                  }}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">H1</span>
                    <div>
                      <div className="font-semibold">Heading 1</div>
                      <div className="text-sm text-gray-500">Big heading</div>
                    </div>
                  </div>
                </EditorCommandItem>

                <EditorCommandItem
                  value="task-list"
                  onCommand={({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .toggleTaskList()
                      .run();
                  }}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>☑</span>
                    <div>
                      <div className="font-semibold">Task List</div>
                      <div className="text-sm text-gray-500">Checkboxes</div>
                    </div>
                  </div>
                </EditorCommandItem>

                <EditorCommandItem
                  value="code-block"
                  onCommand={({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .setCodeBlock()
                      .run();
                  }}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{'</>'}</span>
                    <div>
                      <div className="font-semibold">Code Block</div>
                      <div className="text-sm text-gray-500">
                        Syntax highlighting
                      </div>
                    </div>
                  </div>
                </EditorCommandItem>
              </EditorCommandList>
            </EditorCommand>
          </EditorContent>
        </EditorRoot>
      </div>

      {/* Toolbar */}
      <EditorToolbar />
    </div>
  );
}

// Custom toolbar component
function EditorToolbar() {
  const { editor } = useEditor();

  if (!editor) return null;

  const characterCount = editor.storage.characterCount?.characters() ?? 0;
  const wordCount = editor.storage.characterCount?.words() ?? 0;

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
      <div className="flex gap-4">
        <span>{characterCount} characters</span>
        <span>{wordCount} words</span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            const json = editor.getJSON();
            console.log('Content (JSON):', json);
          }}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Get JSON
        </button>

        <button
          type="button"
          onClick={() => {
            const markdown = editor.storage.markdown.getMarkdown();
            console.log('Content (Markdown):', markdown);
          }}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Get Markdown
        </button>

        <button
          type="button"
          onClick={() => {
            editor.commands.clearContent();
          }}
          className="px-3 py-1 bg-red-200 rounded hover:bg-red-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
