/**
 * Hooks Tests
 */

import { describe, expect, test } from '@rstest/core';
import { render, waitFor } from '@testing-library/react';
import { EditorContent, EditorRoot, StarterKit, useEditor } from '../src/index';

describe('useEditor Hook', () => {
  test('should return editor instance', async () => {
    let editorInstance: any = null;

    function TestComponent() {
      const { editor } = useEditor();
      editorInstance = editor;
      return null;
    }

    render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={{ type: 'doc', content: [] }}
        >
          <TestComponent />
        </EditorContent>
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(editorInstance).toBeTruthy();
    });
  });

  test('should provide editor methods', async () => {
    let editorInstance: any = null;

    function TestComponent() {
      const { editor } = useEditor();
      editorInstance = editor;
      return null;
    }

    render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={{ type: 'doc', content: [] }}
        >
          <TestComponent />
        </EditorContent>
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(editorInstance).toBeTruthy();
      expect(typeof editorInstance?.getJSON).toBe('function');
      expect(typeof editorInstance?.getHTML).toBe('function');
      expect(typeof editorInstance?.getText).toBe('function');
    });
  });

  test('should return null when used outside EditorContent', () => {
    let editorInstance: any;

    function TestComponent() {
      const { editor } = useEditor();
      editorInstance = editor;
      return <div>Test</div>;
    }

    render(<TestComponent />);

    expect(editorInstance).toBe(null);
  });
});
