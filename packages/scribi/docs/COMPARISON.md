# Scribi vs Novel.sh

A detailed comparison between Scribi and Novel.sh.

## TL;DR

Scribi is a fork-in-spirit of Novel.sh, rebuilt from scratch to fix its core issues:
- **Storage flexibility** - Use any provider, not just Vercel Blob
- **No tracking** - Privacy-first, no analytics
- **No forced AI** - Bring your own if you want it
- **Actively maintained** - Regular updates, React 19 support
- **Developer-first** - Better APIs, more customization

## Feature Comparison

### Core Editor

| Feature | Novel.sh | Scribi | Notes |
|---------|----------|--------|-------|
| Rich text editing | ✅ | ✅ | Both use Tiptap |
| Slash commands | ✅ | ✅ | Scribi has better API |
| Bubble menu | ✅ | ✅ | Similar implementation |
| Markdown support | ✅ | ✅ | Export/import |
| Code blocks | ✅ | ✅ | Both use lowlight |
| Task lists | ✅ | ✅ | Interactive checkboxes |
| Links | ✅ | ✅ | |
| Images | ✅ | ✅ | See below |

### Image Upload

| Aspect | Novel.sh | Scribi |
|--------|----------|--------|
| Storage provider | ❌ Vercel Blob only | ✅ Any provider |
| AWS S3 | ❌ Not supported | ✅ Yes |
| Cloudflare R2 | ❌ Not supported | ✅ Yes |
| UploadThing | ❌ Not supported | ✅ Yes |
| Custom API | ❌ Difficult | ✅ Easy |
| Base64 (no upload) | ❌ No | ✅ Yes |

**Novel.sh code:**
```typescript
// Hardcoded Vercel Blob
import { put } from '@vercel/blob';
// Can't change this!
```

**Scribi code:**
```typescript
// Use ANY storage
const uploadFn = createImageUpload({
  onUpload: async (file) => {
    // YOUR implementation here
    return await yourUploadFunction(file);
  }
});
```

### AI Integration

| Aspect | Novel.sh | Scribi |
|--------|----------|--------|
| AI autocomplete | ✅ Built-in | ❌ Not included |
| OpenAI integration | ✅ Hardcoded | 🟡 BYO if needed |
| Other AI providers | ❌ No | ✅ Any (if you add) |
| Can disable AI | ❌ Difficult | ✅ N/A (opt-in) |

**Why Scribi doesn't include AI:**
- Not everyone needs AI
- Adds bundle size
- Creates API key management issues
- Forces specific providers
- You can add it yourself if needed

### Privacy & Analytics

| Aspect | Novel.sh | Scribi |
|--------|----------|--------|
| Analytics | ❌ Built-in | ✅ None |
| Tracking | ❌ Yes | ✅ None |
| Telemetry | ❌ Unknown | ✅ None |
| GDPR compliant | ⚠️ Depends | ✅ Yes (no data collected) |

### Maintenance & Support

| Aspect | Novel.sh | Scribi |
|--------|----------|--------|
| Last commit | ~1.5 years ago | Active |
| React 19 support | ❌ No | ✅ Yes |
| Latest Tiptap | ❌ No | ✅ Yes |
| Issue response | ❌ Slow | ✅ Active |
| Community | 🟡 Large but inactive | 🟢 Growing |

### Developer Experience

| Aspect | Novel.sh | Scribi |
|--------|----------|--------|
| TypeScript | ✅ Good | ✅ Excellent |
| Documentation | 🟡 Basic | ✅ Comprehensive |
| Examples | 🟡 Few | ✅ Many |
| API design | 🟡 Okay | ✅ Intuitive |
| Customization | 🟡 Limited | ✅ Extensive |
| Tree-shaking | 🟡 Partial | ✅ Full |

### Bundle Size

| Package | Novel.sh | Scribi | Savings |
|---------|----------|--------|---------|
| Base | ~45 KB | ~18 KB | 60% smaller |
| With AI | ~120 KB | N/A | - |
| Full featured | ~150 KB | ~50 KB | 67% smaller |

*Gzipped sizes. Scribi is smaller because:*
- No AI code
- No analytics
- Better tree-shaking
- Less dependencies

## Migration from Novel.sh

### Basic Editor

**Novel.sh:**
```tsx
import { EditorRoot, EditorContent } from 'novel';

<EditorRoot>
  <EditorContent />
</EditorRoot>
```

**Scribi:**
```tsx
import { EditorRoot, EditorContent, StarterKit, Placeholder } from 'scribi';

<EditorRoot>
  <EditorContent 
    extensions={[StarterKit, Placeholder]}
  />
</EditorRoot>
```

### Image Upload

**Novel.sh:**
```tsx
// Must use Vercel Blob
// Set BLOB_READ_WRITE_TOKEN env var
// No other options
```

**Scribi:**
```tsx
// Use whatever you want
const uploadFn = createImageUpload({
  onUpload: async (file) => {
    // Your storage here
    return url;
  }
});

<EditorContent
  editorProps={{
    handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
    handleDrop: (view, event, _, moved) => handleImageDrop(view, event, moved, uploadFn),
  }}
/>
```

### AI Features

**Novel.sh:**
```tsx
// AI is built-in, can't easily remove
// Must set OPENAI_API_KEY
```

**Scribi:**
```tsx
// AI is not included
// Add your own if needed:

const MyEditorWithAI = () => {
  const { editor } = useEditor();
  
  const handleAIComplete = async () => {
    const text = editor.getText();
    const completion = await yourAIProvider(text);
    editor.commands.insertContent(completion);
  };
  
  return <button onClick={handleAIComplete}>AI Complete</button>;
};
```

## When to Use Which?

### Use Novel.sh if:
- ❌ Actually, we recommend Scribi instead

### Use Scribi if:
- ✅ You want storage flexibility
- ✅ You care about privacy
- ✅ You want to avoid vendor lock-in
- ✅ You need active maintenance
- ✅ You want smaller bundle size
- ✅ You need React 19 support
- ✅ You value developer experience

## Contributing

Novel.sh is effectively unmaintained. Scribi is community-driven and actively maintained.

We welcome contributions! See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Credits

Novel.sh was created by [Steven Tey](https://twitter.com/steventey) and inspired many developers. Scribi builds on that inspiration while fixing its core issues.

## Questions?

Open an issue or start a discussion. We're here to help!
