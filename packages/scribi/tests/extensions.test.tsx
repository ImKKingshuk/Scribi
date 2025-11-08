/**
 * Extensions Tests
 */

import { describe, expect, test } from '@rstest/core';
import { render, waitFor } from '@testing-library/react';
import {
  CodeBlock,
  EditorContent,
  EditorRoot,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  Underline,
} from '../src/index';

describe('Extensions', () => {
  test('should load StarterKit extension', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).toBeTruthy();
    });
  });

  test('should load Placeholder extension', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[
            StarterKit,
            Placeholder.configure({
              placeholder: 'Test placeholder',
            }),
          ]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).toBeTruthy();
    });
  });

  test('should load CodeBlock extension', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit, CodeBlock]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).toBeTruthy();
    });
  });

  test('should load Underline extension', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit, Underline]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).toBeTruthy();
    });
  });

  test('should load TaskList and TaskItem extensions', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[StarterKit, TaskList, TaskItem]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).toBeTruthy();
    });
  });

  test('should load multiple extensions together', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          extensions={[
            StarterKit,
            Placeholder,
            CodeBlock,
            Underline,
            TaskList,
            TaskItem,
          ]}
          initialContent={{ type: 'doc', content: [] }}
        />
      </EditorRoot>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).toBeTruthy();
    });
  });
});
