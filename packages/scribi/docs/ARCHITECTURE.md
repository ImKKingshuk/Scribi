# Scribi Architecture

This document explains how Scribi is structured and the design decisions behind it.

## Core Philosophy

Scribi is built on three core principles:

1. **Developer-first** - APIs should be intuitive, well-documented, and type-safe
2. **No vendor lock-in** - Never force users into specific services or providers
3. **Opt-in everything** - Features should be modular and composable

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        EditorRoot                           │
│  (Provides Jotai store and tunnel context)                 │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                    EditorContent                       │ │
│  │  (Wraps Tiptap EditorProvider)                        │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  ProseMirror Document                           │  │ │
│  │  │  - Extensions (StarterKit, Placeholder, etc.)   │  │ │
│  │  │  - Plugins (UploadImages, etc.)                 │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  EditorBubble (Selection toolbar)               │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  EditorCommand (Slash commands)                 │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Layer

### EditorRoot
- Provides Jotai store for state management
- Creates tunnel-rat instance for portaling command palette
- Can support multiple editor instances on one page

### EditorContent
- Thin wrapper around Tiptap's `EditorProvider`
- Accepts extensions, initial content, and editor props
- Renders children (bubble menu, command palette, etc.)

### EditorBubble
- Appears on text selection
- Uses React Portal to render outside editor DOM
- Calculates position based on selection coordinates
- Fully customizable with `EditorBubbleItem` components

### EditorCommand
- Slash command palette
- Uses cmdk for fuzzy search and keyboard navigation
- Uses tunnel-rat to render at correct position
- Integrates with Tiptap's suggestion system

## Extension Layer

Scribi provides pre-configured Tiptap extensions:

### StarterKit
- Basic editing functionality (bold, italic, lists, etc.)
- Pre-configured with sensible defaults
- Can be overridden per editor instance

### Placeholder
- Shows placeholder text when editor is empty
- Different placeholders for different node types

### CodeBlock
- Syntax highlighting with lowlight
- Common languages included by default
- Customizable language set

### Basic Extensions
- Re-exports of common Tiptap extensions
- Underline, Link, Image, Youtube, etc.
- All optional and composable

## Plugin Layer

### UploadImagesPlugin
- Handles image paste and drag & drop
- Shows placeholder during upload
- **NO hardcoded storage** - you provide the upload function
- Supports any storage provider (S3, R2, UploadThing, etc.)

**Key Design Decision:**
```typescript
// Instead of: uploadToVercelBlob(file) - LOCKED IN ❌
// We do: onUpload(file) - YOUR CHOICE ✅
```

This is the core differentiator from Novel.sh.

## State Management

Scribi uses Jotai for minimal, atomic state management:

- `queryAtom` - Current slash command query
- `rangeAtom` - Current text range for commands
- `scribiStore` - Isolated store per editor instance

Why Jotai?
- Minimal bundle size
- Atomic updates (no re-renders)
- Works with concurrent rendering
- Easy to test

## Type System

Full TypeScript support with exported types:

```typescript
export type EditorInstance = Editor;
export type { JSONContent } from "@tiptap/core";
export type UploadFn = (file: File, view: EditorView, pos: number) => void;
export interface ImageUploadOptions { ... }
export interface SuggestionItem { ... }
```

## Comparison with Novel.sh

| Aspect | Novel.sh | Scribi |
|--------|----------|--------|
| Storage | Hardcoded Vercel Blob | Any provider |
| State | Jotai | Jotai |
| Components | Coupled | Composable |
| AI | Built-in (unwanted) | Opt-in (BYO) |
| Analytics | Built-in | None |
| Customization | Limited | Extensive |

## Extension Points

Scribi is designed to be extended:

1. **Custom Extensions** - Add your own Tiptap extensions
2. **Custom Commands** - Create custom slash commands
3. **Custom Plugins** - Add ProseMirror plugins
4. **Custom Components** - Build custom toolbars, panels, etc.
5. **Custom Upload** - Integrate any storage provider

## Performance Considerations

- Tree-shakeable exports (only bundle what you use)
- Lazy-loaded syntax highlighting
- Atomic state updates (no unnecessary re-renders)
- Optimized ProseMirror plugins

## Future Enhancements

Potential additions (all opt-in):

- Collaboration (Yjs/Hocuspocus)
- Comments/annotations
- Version history
- Table support
- Mermaid diagrams
- Math equations (KaTeX)
- Custom blocks
- Mobile toolbar

All additions must follow the core philosophy: developer-first, no lock-in, opt-in.
