import type { Editor } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion, { type SuggestionOptions } from '@tiptap/suggestion';
import type { RefObject } from 'react';
import tippy, {
  type GetReferenceClientRect,
  type Instance,
  type Props,
} from 'tippy.js';
import type { SuggestionItem } from '../types/editor';

/**
 * Command extension for slash commands
 * Shows a command palette when user types '/'
 */
export const Command = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      } as SuggestionOptions,
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

/**
 * Creates the render functions for the command palette
 * This handles the lifecycle of the suggestion popup
 */
export const createCommandRenderer = (
  CommandComponent: React.ComponentType<{
    editor: Editor;
    clientRect: DOMRect | GetReferenceClientRect;
  }>,
  elementRef?: RefObject<Element> | null,
) => {
  let component: ReactRenderer | null = null;
  let popup: Instance<Props>[] | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandComponent, {
        props,
        editor: props.editor,
      });

      const { selection } = props.editor.state;
      const parentNode = selection.$from.node(selection.$from.depth);
      const blockType = parentNode.type.name;

      // Don't show command palette in code blocks
      if (blockType === 'codeBlock') {
        return false;
      }

      popup = tippy('body', {
        getReferenceClientRect: () => props.clientRect,
        appendTo: () =>
          elementRef ? (elementRef.current ?? document.body) : document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    },

    onUpdate: (props: {
      editor: Editor;
      clientRect: GetReferenceClientRect;
    }) => {
      component?.updateProps(props);
      popup?.[0]?.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0]?.hide();
        return true;
      }

      // Forward keyboard events to the command component
      return (component?.ref as any)?.onKeyDown?.(props) ?? false;
    },

    onExit: () => {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
};

/**
 * Helper to create suggestion items
 * Just a type-safe identity function
 */
export const createSuggestionItems = (
  items: SuggestionItem[],
): SuggestionItem[] => items;

/**
 * Handles keyboard navigation in command palette
 * Returns true if the event should be handled by the command palette
 */
export const handleCommandNavigation = (event: KeyboardEvent): boolean => {
  if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
    const slashCommand = document.querySelector('#scribi-slash-command');
    if (slashCommand) {
      return true;
    }
  }
  return false;
};
