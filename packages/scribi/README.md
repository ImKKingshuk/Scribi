# Scribi

> A developer-first WYSIWYG editor for React. Feature-rich, customizable, and framework-agnostic.


[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Why Scribi?

Inspired by Novel.sh but built with developers in mind:

✅ **No vendor lock-in** - Use ANY storage provider (S3, R2, UploadThing, etc.)  
✅ **No forced features** - No analytics, no tracking, no unwanted AI  
✅ **Truly customizable** - Every feature is opt-in and configurable  
✅ **Modern & maintained** - Built with React 19, TypeScript 5, latest dependencies  
✅ **Developer-first** - Clear APIs, comprehensive docs, full TypeScript support  
✅ **Lightweight** - Only bundle what you need

## Features

- 📝 **Rich text editing** - Bold, italic, underline, strikethrough, code, and more
- 🎨 **Advanced formatting** - Headings, lists, blockquotes, code blocks with syntax highlighting
- ⌨️ **Slash commands** - Type `/` to access a command palette
- 🔗 **Links & embeds** - YouTube embeds, custom links
- ✅ **Task lists** - Interactive checkboxes
- 🖼️ **Images** - Drag & drop, paste, with customizable upload handlers
- 💬 **Bubble menu** - Format text on selection
- 📊 **Character count** - Track document length
- 🎯 **Markdown support** - Export and import Markdown
- 🎨 **Fully customizable** - Bring your own styles

## Installation

```bash
npm install scribi
# or
pnpm add scribi
# or
yarn add scribi
```

## Quick Start

```tsx
import { EditorRoot, EditorContent, StarterKit, Placeholder } from 'scribi';

function MyEditor() {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[StarterKit, Placeholder]}
        initialContent={{ type: 'doc', content: [] }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[200px] p-4',
          },
        }}
      />
    </EditorRoot>
  );
}
```

## Complete Example with All Features

```tsx
import {
  EditorRoot,
  EditorContent,
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandList,
  EditorCommandItem,
  EditorCommandEmpty,
  useEditor,
  // Extensions
  StarterKit,
  Placeholder,
  CodeBlock,
  Underline,
  Link,
  TaskList,
  TaskItem,
  CharacterCount,
  Markdown,
  // Plugins
  UploadImagesPlugin,
  createImageUpload,
  handleImageDrop,
  handleImagePaste,
} from 'scribi';

// Your custom upload handler - use ANY storage!
const uploadFn = createImageUpload({
  validateFn: (file) => {
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File too large (max 5MB)');
    }
    return true;
  },
  onUpload: async (file) => {
    // Upload to YOUR storage solution
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const { url } = await response.json();
    return url;
  },
});

function MyEditor() {
  const extensions = [
    StarterKit,
    Placeholder,
    CodeBlock,
    Underline,
    Link,
    TaskList,
    TaskItem,
    CharacterCount,
    Markdown,
    UploadImagesPlugin({ imageClass: 'rounded-lg' }),
  ];

  return (
    <EditorRoot>
      <EditorContent
        extensions={extensions}
        initialContent={{ type: 'doc', content: [] }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[400px] p-6',
          },
          handleDrop: (view, event, _, moved) => 
            handleImageDrop(view, event as DragEvent, moved, uploadFn),
          handlePaste: (view, event) => 
            handleImagePaste(view, event, uploadFn),
        }}
      >
        <EditorBubble className="flex gap-1 p-1 bg-white rounded-lg shadow-lg">
          <EditorBubbleItem
            onSelect={(editor) => editor.chain().focus().toggleBold().run()}
            isActive={(editor) => editor.isActive('bold')}
          >
            Bold
          </EditorBubbleItem>
          <EditorBubbleItem
            onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
            isActive={(editor) => editor.isActive('italic')}
          >
            Italic
          </EditorBubbleItem>
        </EditorBubble>

        <EditorCommand className="border rounded-lg shadow-lg bg-white">
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
      </EditorContent>
    </EditorRoot>
  );
}
```

## Image Upload Examples

### AWS S3

```tsx
const uploadFn = createImageUpload({
  onUpload: async (file) => {
    const s3Url = await uploadToS3(file);
    return s3Url;
  }
});
```

### UploadThing

```tsx
import { uploadFiles } from '@uploadthing/react';

const uploadFn = createImageUpload({
  onUpload: async (file) => {
    const result = await uploadFiles({ files: [file] });
    return result[0].url;
  }
});
```

### Cloudflare R2

```tsx
const uploadFn = createImageUpload({
  onUpload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload-r2', {
      method: 'POST',
      body: formData,
    });
    
    const { url } = await response.json();
    return url;
  }
});
```

### Base64 (No Upload)

```tsx
const uploadFn = createImageUpload({
  onUpload: async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
});
```

## Accessing the Editor Instance

```tsx
import { useEditor } from 'scribi';

function SaveButton() {
  const { editor } = useEditor();
  
  const handleSave = () => {
    if (!editor) return;
    
    const json = editor.getJSON();
    const html = editor.getHTML();
    const markdown = editor.storage.markdown.getMarkdown();
    
    // Save to your backend
    saveContent({ json, html, markdown });
  };
  
  return <button onClick={handleSave}>Save</button>;
}
```

## Styling

Scribi is unstyled by default. Add your own styles or use Tailwind's typography plugin:

```tsx
// With Tailwind
<EditorContent
  editorProps={{
    attributes: {
      class: 'prose prose-lg dark:prose-invert focus:outline-none max-w-none',
    },
  }}
/>
```

## API Reference

### Components

#### `EditorRoot`
Root component that provides context for the editor.

#### `EditorContent`
Main editor component. Accepts all Tiptap `EditorProvider` props.

**Props:**
- `initialContent?: JSONContent` - Initial editor content
- `extensions: Extension[]` - Tiptap extensions to use
- `editorProps?: EditorProps` - Props passed to the editor
- `onUpdate?: (props: EditorEvents['update']) => void` - Called on content change

#### `EditorBubble`
Bubble menu that appears on text selection.

#### `EditorCommand`
Slash command palette.

### Extensions

All Tiptap extensions are available:

- `StarterKit` - Basic editing functionality
- `Placeholder` - Placeholder text
- `CodeBlock` - Code blocks with syntax highlighting
- `Underline` - Underline formatting
- `Link` - Link support
- `Image` - Image support
- `TaskList` & `TaskItem` - Task lists
- `CharacterCount` - Character counting
- `Markdown` - Markdown import/export
- And more...

### Hooks

#### `useEditor()`
Access the current editor instance.

```tsx
const { editor } = useEditor();
```

## Comparison with Novel.sh

| Feature | Novel.sh | Scribi |
|---------|----------|--------|
| Storage flexibility | ❌ Vercel Blob only | ✅ Any storage |
| Analytics/Tracking | ❌ Built-in | ✅ None (privacy-first) |
| AI Integration | ❌ Forced | ✅ Optional (bring your own) |
| Maintenance | ❌ Inactive (1.5+ years) | ✅ Active |
| React 19 Support | ❌ | ✅ |
| TypeScript | ✅ | ✅ |
| Customization | ⚠️ Limited | ✅ Fully customizable |
| Bundle size | ⚠️ Larger | ✅ Smaller (tree-shakeable) |

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Watch mode
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Format code
pnpm format
```

## Contributing

Contributions are welcome! This is a community-driven project built by developers, for developers.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Credits

Built on top of [Tiptap](https://tiptap.dev/), the headless editor framework for web artisans.

Inspired by [Novel.sh](https://novel.sh/) by Steven Tey, but rebuilt to be truly developer-first.

---

**Made with ❤️ by developers, for developers**
