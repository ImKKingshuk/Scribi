# Scribi API Reference

Complete API documentation for Scribi.

## Components

### EditorRoot

Root component that provides context for the editor.

```tsx
import { EditorRoot } from 'scribi';

<EditorRoot>
  {/* Editor components */}
</EditorRoot>
```

**Props:** None

**Purpose:**
- Provides Jotai store for state management
- Creates tunnel context for command palette
- Supports multiple editor instances on one page

---

### EditorContent

Main editor component that wraps Tiptap's EditorProvider.

```tsx
import { EditorContent, StarterKit } from 'scribi';

<EditorContent
  extensions={[StarterKit]}
  initialContent={{ type: 'doc', content: [] }}
  editorProps={{
    attributes: { class: 'prose' }
  }}
  onUpdate={({ editor }) => console.log(editor.getJSON())}
/>
```

**Props:**
- `extensions: Extension[]` - Array of Tiptap extensions **(required)**
- `initialContent?: JSONContent` - Initial editor content
- `editorProps?: EditorProps` - Props passed to ProseMirror
- `onUpdate?: (props) => void` - Called when content changes
- `onTransaction?: (props) => void` - Called on every transaction
- `onFocus?: (props) => void` - Called when editor gains focus
- `onBlur?: (props) => void` - Called when editor loses focus
- `onDestroy?: () => void` - Called when editor is destroyed
- `className?: string` - CSS class for wrapper div
- `children?: ReactNode` - Child components (bubble menu, etc.)

---

### EditorBubble

Bubble menu that appears on text selection.

```tsx
import { EditorBubble, EditorBubbleItem } from 'scribi';

<EditorBubble className="flex gap-1 p-2">
  <EditorBubbleItem
    onSelect={(editor) => editor.chain().focus().toggleBold().run()}
    isActive={(editor) => editor.isActive('bold')}
  >
    Bold
  </EditorBubbleItem>
</EditorBubble>
```

**Props:**
- `className?: string` - CSS classes
- `tippyOptions?: object` - Tippy.js options
- `children: ReactNode` - Bubble menu items

---

### EditorBubbleItem

Individual item in the bubble menu.

**Props:**
- `onSelect?: (editor: Editor) => void` - Called when clicked
- `isActive?: (editor: Editor) => boolean` - Whether item is active
- `className?: string` - CSS classes
- `children: ReactNode` - Button content

---

### EditorCommand

Slash command palette.

```tsx
import { 
  EditorCommand, 
  EditorCommandList, 
  EditorCommandItem,
  EditorCommandEmpty 
} from 'scribi';

<EditorCommand className="border rounded">
  <EditorCommandList>
    <EditorCommandEmpty>No results</EditorCommandEmpty>
    <EditorCommandItem
      value="heading"
      onCommand={({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
      }}
    >
      Heading 1
    </EditorCommandItem>
  </EditorCommandList>
</EditorCommand>
```

**Props:**
- `className?: string` - CSS classes
- `children: ReactNode` - Command list

---

### EditorCommandList

Container for command items.

**Props:**
- `className?: string` - CSS classes
- `children: ReactNode` - Command items

---

### EditorCommandItem

Individual command item.

**Props:**
- `value: string` - Search value **(required)**
- `onCommand: (props) => void` - Called when selected **(required)**
- `className?: string` - CSS classes
- `children: ReactNode` - Item content

---

### EditorCommandEmpty

Empty state for command palette.

**Props:**
- `className?: string` - CSS classes
- `children: ReactNode` - Empty message

---

## Hooks

### useEditor

Access the current editor instance.

```tsx
import { useEditor } from 'scribi';

function MyComponent() {
  const { editor } = useEditor();
  
  if (!editor) return null;
  
  return (
    <button onClick={() => editor.chain().focus().toggleBold().run()}>
      Bold
    </button>
  );
}
```

**Returns:**
- `{ editor: EditorInstance | null }`

**Editor methods:**
- `editor.chain()` - Chain commands
- `editor.getJSON()` - Get content as JSON
- `editor.getHTML()` - Get content as HTML
- `editor.getText()` - Get content as plain text
- `editor.isEmpty` - Check if empty
- `editor.isActive(name)` - Check if mark/node is active
- `editor.can()` - Check if command can run
- `editor.commands.*` - Execute commands

See [Tiptap docs](https://tiptap.dev/api/editor) for full API.

---

## Extensions

### StarterKit

Basic editing functionality.

```tsx
import { StarterKit } from 'scribi';

<EditorContent extensions={[StarterKit]} />
```

**Includes:**
- Bold, italic, strike, code
- Headings (H1-H6)
- Paragraphs
- Bullet lists
- Ordered lists
- Blockquotes
- Code blocks
- Hard breaks
- Horizontal rules

**Configure:**
```tsx
StarterKit.configure({
  heading: {
    levels: [1, 2, 3]
  },
  codeBlock: false, // Disable code blocks
})
```

---

### Placeholder

Shows placeholder text when editor is empty.

```tsx
import { Placeholder } from 'scribi';

<EditorContent 
  extensions={[
    Placeholder.configure({
      placeholder: 'Start typing...'
    })
  ]} 
/>
```

---

### CodeBlock

Code blocks with syntax highlighting.

```tsx
import { CodeBlock } from 'scribi';

<EditorContent extensions={[CodeBlock]} />
```

**Configure:**
```tsx
import { CodeBlock, createLowlight } from 'scribi';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

const lowlight = createLowlight();
lowlight.register('javascript', javascript);
lowlight.register('python', python);

CodeBlock.configure({ lowlight })
```

---

### Basic Extensions

Pre-configured Tiptap extensions.

```tsx
import { 
  Underline,
  Link,
  Image,
  Youtube,
  TaskList,
  TaskItem,
  Color,
  Highlight,
  CharacterCount,
  Markdown
} from 'scribi';

<EditorContent 
  extensions={[
    Underline,
    Link.configure({ openOnClick: false }),
    Image,
    TaskList,
    TaskItem,
    Markdown
  ]} 
/>
```

---

## Plugins

### UploadImagesPlugin

Handles image uploads with custom storage.

```tsx
import { 
  UploadImagesPlugin,
  createImageUpload,
  handleImageDrop,
  handleImagePaste
} from 'scribi';

const uploadFn = createImageUpload({
  validateFn: (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large');
      return false;
    }
    return true;
  },
  onUpload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { 
      method: 'POST', 
      body: formData 
    });
    const { url } = await res.json();
    return url;
  }
});

<EditorContent
  extensions={[
    UploadImagesPlugin({ imageClass: 'rounded-lg' })
  ]}
  editorProps={{
    handleDrop: (view, event, _, moved) => 
      handleImageDrop(view, event as DragEvent, moved, uploadFn),
    handlePaste: (view, event) => 
      handleImagePaste(view, event, uploadFn),
  }}
/>
```

**Functions:**

#### createImageUpload

Creates an upload function.

**Parameters:**
- `validateFn?: (file: File) => boolean | void` - Validation
- `onUpload: (file: File) => Promise<string>` - Upload handler

**Returns:** `UploadFn`

#### handleImageDrop

Handles drag & drop.

**Parameters:**
- `view: EditorView`
- `event: DragEvent`
- `moved: boolean`
- `uploadFn: UploadFn`

#### handleImagePaste

Handles paste events.

**Parameters:**
- `view: EditorView`
- `event: ClipboardEvent`
- `uploadFn: UploadFn`

---

## Utilities

### URL Utilities

```tsx
import { isValidUrl, getUrlFromString } from 'scribi';

isValidUrl('https://example.com'); // true
isValidUrl('not a url'); // false

getUrlFromString('example.com'); // 'https://example.com'
getUrlFromString('https://example.com'); // 'https://example.com'
```

### Editor Utilities

```tsx
import { getPrevText, getAllContent, getTextInRange } from 'scribi';

const prevText = getPrevText(editor, { chars: 100 });
const allText = getAllContent(editor);
const rangeText = getTextInRange(editor, { from: 0, to: 10 });
```

---

## Types

```tsx
import type {
  EditorInstance,
  JSONContent,
  UploadFn,
  ImageUploadOptions,
  SuggestionItem,
  Range
} from 'scribi';
```

### EditorInstance

```typescript
type EditorInstance = Editor; // Tiptap Editor
```

### JSONContent

```typescript
interface JSONContent {
  type: string;
  content?: JSONContent[];
  attrs?: Record<string, any>;
  text?: string;
  marks?: Array<{
    type: string;
    attrs?: Record<string, any>;
  }>;
}
```

### UploadFn

```typescript
type UploadFn = (file: File, view: EditorView, pos: number) => void;
```

### ImageUploadOptions

```typescript
interface ImageUploadOptions {
  validateFn?: (file: File) => boolean | void;
  onUpload: (file: File) => Promise<string | unknown>;
}
```

### SuggestionItem

```typescript
interface SuggestionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  searchTerms?: string[];
  command?: (props: { editor: Editor; range: Range }) => void;
}
```

---

## Advanced Usage

### Custom Extensions

```tsx
import { Extension } from '@tiptap/core';

const MyExtension = Extension.create({
  name: 'myExtension',
  // ... your extension code
});

<EditorContent extensions={[StarterKit, MyExtension]} />
```

### Custom Commands

```tsx
import { createSuggestionItems } from 'scribi';

const customCommands = createSuggestionItems([
  {
    title: 'Custom Block',
    description: 'Insert a custom block',
    icon: '🎨',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent({
        type: 'customBlock',
        attrs: { /* ... */ }
      }).run();
    }
  }
]);
```

### Multiple Editors

```tsx
function App() {
  return (
    <>
      <EditorRoot>
        <EditorContent extensions={[StarterKit]} />
      </EditorRoot>
      
      <EditorRoot>
        <EditorContent extensions={[StarterKit]} />
      </EditorRoot>
    </>
  );
}
```

Each `EditorRoot` has its own isolated state.

---

## See Also

- [Examples](../examples/)
- [Architecture](./ARCHITECTURE.md)
- [Comparison with Novel.sh](./COMPARISON.md)
- [Tiptap Documentation](https://tiptap.dev/)
