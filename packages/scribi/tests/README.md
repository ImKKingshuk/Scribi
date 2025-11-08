# Scribi Tests

This directory contains all tests for the Scribi editor.

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test tests/utils.test.ts
```

## Test Files

### `index.test.tsx`
Core editor component tests:
- EditorRoot rendering
- EditorContent with extensions
- Initial content loading
- Multiple editor instances
- Event handlers

### `utils.test.ts`
Utility function tests:
- URL validation (`isValidUrl`)
- URL parsing (`getUrlFromString`)

### `extensions.test.tsx`
Extension loading tests:
- StarterKit
- Placeholder
- CodeBlock
- Underline
- TaskList & TaskItem
- Multiple extensions together

### `plugins.test.ts`
Plugin functionality tests:
- Image upload plugin
- Upload function creation
- Validation functions
- Storage provider examples (S3, R2, base64, custom API)

### `hooks.test.tsx`
React hooks tests:
- `useEditor` hook
- Editor instance access
- Editor methods availability

## Test Structure

All tests follow this pattern:

```tsx
import { expect, test, describe } from '@rstest/core';
import { render, waitFor } from '@testing-library/react';

describe('Feature Name', () => {
  test('should do something', async () => {
    const { container } = render(<Component />);
    
    await waitFor(() => {
      expect(something).toBeTruthy();
    });
  });
});
```

## Writing New Tests

When adding new features, create corresponding tests:

1. **Component tests** - Test rendering and props
2. **Extension tests** - Test extension loading
3. **Plugin tests** - Test plugin functionality
4. **Utility tests** - Test helper functions
5. **Integration tests** - Test complete workflows

## Test Coverage Goals

- ✅ Core components (EditorRoot, EditorContent)
- ✅ All extensions load properly
- ✅ Hooks work correctly
- ✅ Utilities function as expected
- ✅ Plugins handle various scenarios
- 🔄 User interactions (future)
- 🔄 Content manipulation (future)
- 🔄 Command execution (future)

## Testing Philosophy

1. **Unit Tests** - Test individual components/functions
2. **Integration Tests** - Test component interactions
3. **Snapshot Tests** - Capture component output (future)
4. **E2E Tests** - Test complete user workflows (future)

## Mocking

For tests that need to mock browser APIs:

```tsx
// Mock File API
global.File = class MockFile {
  constructor(public name: string, public size: number) {}
} as any;

// Mock FileReader
global.FileReader = class MockFileReader {
  readAsDataURL() {}
  onload = null;
} as any;
```

## Continuous Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Release builds

## Debugging Tests

```bash
# Run tests with verbose output
pnpm test --verbose

# Run tests with coverage
pnpm test --coverage

# Debug specific test
pnpm test --inspect-brk tests/utils.test.ts
```

## Common Issues

**Tests timing out?**
- Increase timeout with `await waitFor(() => {}, { timeout: 5000 })`

**Editor not rendering?**
- Ensure extensions array is provided
- Check that EditorRoot wraps EditorContent

**Async issues?**
- Always use `waitFor` for async checks
- Don't forget `async/await`

## Contributing

When adding tests:
1. Follow existing patterns
2. Use descriptive test names
3. Test both success and failure cases
4. Keep tests focused and simple
5. Document complex test setups

## Resources

- [Rstest Documentation](https://rstest.rs/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Tiptap Testing Guide](https://tiptap.dev/guide/testing)
