# Scribi Examples

This directory contains comprehensive examples showing how to use Scribi in different scenarios.

## Examples

### 1. Basic Editor (`basic-editor.tsx`)
The simplest possible setup. Perfect for getting started.

```tsx
import { BasicEditor } from './basic-editor';

function App() {
  return <BasicEditor />;
}
```

### 2. Editor with Bubble Menu (`with-bubble-menu.tsx`)
Shows how to add a formatting toolbar that appears on text selection.

Features:
- Bold, italic, underline, strikethrough
- Link insertion
- Appears on text selection
- Fully customizable styling

### 3. Editor with Image Upload (`with-image-upload.tsx`)
Demonstrates image upload with multiple storage providers.

Includes examples for:
- Custom API endpoints
- AWS S3
- Cloudflare R2
- Base64 (no upload)

### 4. Editor with Slash Commands (`with-slash-commands.tsx`)
Shows how to implement a command palette triggered by `/`.

Features:
- Headings (H1, H2, etc.)
- Lists (bullet, numbered, task)
- Code blocks
- Blockquotes
- Fully searchable

### 5. Full-Featured Editor (`full-featured-editor.tsx`)
The complete example with ALL features enabled.

Includes:
- Bubble menu with rich formatting
- Slash commands
- Image upload (drag & drop, paste)
- Character/word count
- Content export (JSON, Markdown)
- Custom toolbar

## Running Examples

To use these examples in your project:

1. Copy the example file to your project
2. Install required dependencies (if using Tailwind CSS)
3. Import and use the component

```tsx
import { FullFeaturedEditor } from './examples/full-featured-editor';

function App() {
  return (
    <div className="container mx-auto py-8">
      <FullFeaturedEditor />
    </div>
  );
}
```

## Customization

All examples are fully customizable. You can:
- Change styling (className props)
- Add/remove extensions
- Modify keyboard shortcuts
- Create custom commands
- Add your own toolbar buttons

## Need Help?

Check the main [README.md](../README.md) for full API documentation.
