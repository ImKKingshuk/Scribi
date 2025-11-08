/**
 * Editor with Slash Commands Example
 *
 * Shows how to implement a command palette that appears when typing '/'.
 */

import {
  CodeBlock,
  Command,
  createCommandRenderer,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
} from 'scribi';

export function EditorWithSlashCommands() {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[
          StarterKit,
          Placeholder.configure({
            placeholder: "Type '/' for commands...",
          }),
          CodeBlock,
          TaskList,
          TaskItem,
          Command.configure({
            suggestion: {
              char: '/',
              command: ({ editor, range, props }) => {
                props.command({ editor, range });
              },
            },
          }),
        ]}
        initialContent={{ type: 'doc', content: [] }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[300px] p-4',
          },
        }}
      >
        {/* Command palette */}
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
                  <div className="text-sm text-gray-500">
                    Big section heading
                  </div>
                </div>
              </div>
            </EditorCommandItem>

            <EditorCommandItem
              value="heading-2"
              onCommand={({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setHeading({ level: 2 })
                  .run();
              }}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">H2</span>
                <div>
                  <div className="font-semibold">Heading 2</div>
                  <div className="text-sm text-gray-500">
                    Medium section heading
                  </div>
                </div>
              </div>
            </EditorCommandItem>

            <EditorCommandItem
              value="bullet-list"
              onCommand={({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleBulletList()
                  .run();
              }}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>•</span>
                <div>
                  <div className="font-semibold">Bullet List</div>
                  <div className="text-sm text-gray-500">Unordered list</div>
                </div>
              </div>
            </EditorCommandItem>

            <EditorCommandItem
              value="numbered-list"
              onCommand={({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleOrderedList()
                  .run();
              }}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>1.</span>
                <div>
                  <div className="font-semibold">Numbered List</div>
                  <div className="text-sm text-gray-500">Ordered list</div>
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
                  <div className="text-sm text-gray-500">
                    List with checkboxes
                  </div>
                </div>
              </div>
            </EditorCommandItem>

            <EditorCommandItem
              value="code-block"
              onCommand={({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setCodeBlock().run();
              }}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono">{'</>'}</span>
                <div>
                  <div className="font-semibold">Code Block</div>
                  <div className="text-sm text-gray-500">
                    Syntax highlighted code
                  </div>
                </div>
              </div>
            </EditorCommandItem>

            <EditorCommandItem
              value="blockquote"
              onCommand={({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleBlockquote()
                  .run();
              }}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>"</span>
                <div>
                  <div className="font-semibold">Quote</div>
                  <div className="text-sm text-gray-500">Block quote</div>
                </div>
              </div>
            </EditorCommandItem>
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
}
