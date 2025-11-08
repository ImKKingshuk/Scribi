# Getting Started with Scribi

This guide will help you get up and running with Scribi in minutes.

## Installation

```bash
npm install scribi
# or
pnpm add scribi
# or
yarn add scribi
```

## Quick Start (2 minutes)

### 1. Basic Editor

Create your first editor:

```tsx
import { EditorRoot, EditorContent, StarterKit, Placeholder } from 'scribi';

export function MyEditor() {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[StarterKit, Placeholder]}
        initialContent={{ type: 'doc', content: [] }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[300px] p-4',
          },
        }}
      />
    </EditorRoot>
  );
}
```

That's it! You now have a fully functional rich text editor.

### 2. Add Styling (Tailwind CSS)

If using Tailwind CSS, add the typography plugin:

```bash
npm install @tailwindcss/typography
```

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### 3. Save Content

Access the editor instance to save content:

```tsx
import { useEditor } from 'scribi';

function SaveButton() {
  const { editor } = useEditor();
  
  const handleSave = () => {
    if (!editor) return;
    
    const json = editor.getJSON();
    const html = editor.getHTML();
    
    // Save to your backend
    fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({ json, html }),
    });
  };
  
  return <button onClick={handleSave}>Save</button>;
}

export function MyEditor() {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[StarterKit]}
        initialContent={{ type: 'doc', content: [] }}
      />
      <SaveButton />
    </EditorRoot>
  );
}
```

## Next Steps

### Add a Bubble Menu

Format text on selection:

```tsx
import { EditorBubble, EditorBubbleItem } from 'scribi';

<EditorContent extensions={[StarterKit]}>
  <EditorBubble className="flex gap-1 p-1 bg-white rounded-lg shadow-lg">
    <EditorBubbleItem
      onSelect={(editor) => editor.chain().focus().toggleBold().run()}
      isActive={(editor) => editor.isActive('bold')}
    >
      <strong>B</strong>
    </EditorBubbleItem>
    
    <EditorBubbleItem
      onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
      isActive={(editor) => editor.isActive('italic')}
    >
      <em>I</em>
    </EditorBubbleItem>
  </EditorBubble>
</EditorContent>
```

### Add Slash Commands

Type `/` to show a command palette:

```tsx
import { 
  EditorCommand, 
  EditorCommandList, 
  EditorCommandItem,
  Command 
} from 'scribi';

<EditorContent 
  extensions={[
    StarterKit,
    Command
  ]}
>
  <EditorCommand className="border rounded-lg shadow-lg bg-white p-2">
    <EditorCommandList>
      <EditorCommandItem
        value="heading"
        onCommand={({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
        }}
      >
        <div>Heading 1</div>
      </EditorCommandItem>
    </EditorCommandList>
  </EditorCommand>
</EditorContent>
```

### Add Image Upload

Use ANY storage provider:

```tsx
import { 
  UploadImagesPlugin,
  createImageUpload,
  handleImageDrop,
  handleImagePaste,
  Image
} from 'scribi';

const uploadFn = createImageUpload({
  onUpload: async (file) => {
    // Upload to YOUR storage
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

<EditorContent
  extensions={[
    StarterKit,
    Image,
    UploadImagesPlugin({ imageClass: 'rounded-lg' }),
  ]}
  editorProps={{
    handleDrop: (view, event, _, moved) => 
      handleImageDrop(view, event as DragEvent, moved, uploadFn),
    handlePaste: (view, event) => 
      handleImagePaste(view, event, uploadFn),
  }}
/>
```

## Common Recipes

### Read-only Mode

```tsx
<EditorContent
  editable={false}
  extensions={[StarterKit]}
  initialContent={savedContent}
/>
```

### Character Count

```tsx
import { CharacterCount } from 'scribi';

<EditorContent 
  extensions={[
    StarterKit,
    CharacterCount
  ]} 
/>

// In your component:
const { editor } = useEditor();
const count = editor?.storage.characterCount?.characters() ?? 0;
```

### Markdown Export

```tsx
import { Markdown } from 'scribi';

<EditorContent 
  extensions={[
    StarterKit,
    Markdown
  ]} 
/>

// Export:
const markdown = editor.storage.markdown.getMarkdown();
```

### Custom Placeholder

```tsx
import { Placeholder } from 'scribi';

<EditorContent
  extensions={[
    StarterKit,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return 'Enter a title...';
        }
        return 'Start writing...';
      },
    }),
  ]}
/>
```

## Troubleshooting

### Styles not applying

Make sure you're using a CSS framework or adding custom styles:

```tsx
// With Tailwind
className="prose prose-lg"

// Or custom CSS
.ProseMirror {
  min-height: 300px;
  outline: none;
}

.ProseMirror p {
  margin: 1em 0;
}
```

### Images not uploading

Check that:
1. Your `onUpload` function returns a URL
2. The URL is accessible
3. CORS is configured if uploading to external storage

```tsx
onUpload: async (file) => {
  console.log('Uploading:', file.name);
  const url = await yourUploadFunction(file);
  console.log('Uploaded to:', url);
  return url; // Must return the URL!
}
```

### TypeScript errors

Make sure you have the correct peer dependencies:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

## Next Steps

- Check out the [examples](../examples/) directory
- Read the [API documentation](./API.md)
- See [architecture details](./ARCHITECTURE.md)
- Compare with [Novel.sh](./COMPARISON.md)

## Need Help?

- Open an issue on GitHub
- Check existing issues
- Read the documentation

## Resources

- [Tiptap Documentation](https://tiptap.dev/) - Scribi is built on Tiptap
- [ProseMirror Guide](https://prosemirror.net/docs/guide/) - Understanding the editor model
- [Examples Directory](../examples/) - Complete working examples
