# Contributing to Scribi

Thank you for your interest in contributing to Scribi! This guide will help you get started.

## Philosophy

Scribi is built by developers, for developers. Our core principles:

1. **Developer-first** - APIs should be intuitive and well-documented
2. **No vendor lock-in** - Support any storage provider, any infrastructure
3. **Privacy-focused** - No analytics, no tracking
4. **Modular** - Everything is opt-in
5. **Modern** - Keep dependencies up-to-date, use latest features

## Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/scribi.git
cd scribi

# Install dependencies
pnpm install

# Start development mode (watch)
pnpm dev

# Build
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Format code
pnpm format
```

## Project Structure

```
scribi/
├── src/
│   ├── components/     # React components (EditorRoot, EditorContent, etc.)
│   ├── extensions/     # Tiptap extensions (StarterKit, Placeholder, etc.)
│   ├── plugins/        # Editor plugins (image upload, etc.)
│   ├── hooks/          # React hooks (useEditor, etc.)
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── tests/              # Test files
└── README.md           # Documentation
```

## Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by Biome)
- Write meaningful comments for complex logic
- Export types alongside implementations

### Adding Features

1. **Extensions** - Add to `src/extensions/`
2. **Components** - Add to `src/components/`
3. **Plugins** - Add to `src/plugins/`

Always:
- Make features opt-in
- Provide TypeScript types
- Add JSDoc comments
- Update exports in `src/index.tsx`

### Documentation

- Update README.md with new features
- Add code examples
- Document all public APIs
- Include usage examples in JSDoc

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test with React 18 and React 19

## Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch (`feature/amazing-feature`)
3. **Make** your changes
4. **Test** thoroughly
5. **Format** code with `pnpm format`
6. **Commit** with clear messages
7. **Push** to your fork
8. **Open** a pull request

### Commit Messages

Use conventional commits:

```
feat: add drag handle support
fix: resolve bubble menu positioning
docs: update installation guide
chore: update dependencies
```

## Questions?

Open an issue or start a discussion. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
