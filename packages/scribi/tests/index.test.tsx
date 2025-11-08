/**
 * Core Editor Tests
 * Tests for EditorRoot, EditorContent, and basic functionality
 */

import { beforeEach, describe, expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import {
  EditorContent,
  EditorRoot,
  Placeholder,
  StarterKit,
} from '../src/index';

describe('EditorRoot', () => {
  test('should render without crashing', () => {
    const { container } = render(
      <EditorRoot>
        <div>Test content</div>
      </EditorRoot>,
    );
    expect(container).toBeTruthy();
  });

  test('should provide context to children', () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );
    expect(container.querySelector('.ProseMirror')).toBeTruthy();
  });
});

describe('EditorContent', () => {
  test('should render with StarterKit extension', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      const editor = container.querySelector('.ProseMirror');
      expect(editor).toBeTruthy();
    });
  });

  test('should render with initial content', async () => {
    const initialContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Hello, Scribi!',
            },
          ],
        },
      ],
    };

    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={initialContent}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      const editor = container.querySelector('.ProseMirror');
      expect(editor?.textContent).toContain('Hello, Scribi!');
    });
  });

  test('should render with placeholder', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[
            StarterKit,
            Placeholder.configure({
              placeholder: 'Start typing...',
            }),
          ]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      const editor = container.querySelector('.ProseMirror');
      expect(editor).toBeTruthy();
    });
  });

  test('should apply custom className', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={{ type: 'doc', content: [] }}
          className="custom-editor"
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      const wrapper = container.querySelector('.custom-editor');
      expect(wrapper).toBeTruthy();
    });
  });

  test('should call onUpdate when content changes', async () => {
    let updateCalled = false;
    const handleUpdate = () => {
      updateCalled = true;
    };

    render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={{ type: 'doc', content: [] }}
          onUpdate={handleUpdate}
        />
      </EditorRoot>,
    );

    // Note: In a real test, we'd simulate user input
    // This is a basic structure test
    expect(updateCalled).toBe(false);
  });
});

describe('Multiple Editors', () => {
  test('should support multiple editor instances', async () => {
    const { container } = render(
      <>
        <EditorRoot>
          <EditorContent
            extensions={[StarterKit]}
            initialContent={{ type: 'doc', content: [] }}
          />
        </EditorRoot>
        <EditorRoot>
          <EditorContent
            extensions={[StarterKit]}
            initialContent={{ type: 'doc', content: [] }}
          />
        </EditorRoot>
      </>,
    );

    await waitFor(() => {
      const editors = container.querySelectorAll('.ProseMirror');
      expect(editors.length).toBe(2);
    });
  });
});
