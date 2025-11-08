import { Command } from 'cmdk';
import { useAtomValue } from 'jotai';
import {
  createContext,
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import type tunnel from 'tunnel-rat';
import { queryAtom, rangeAtom } from '../utils/atoms';

/**
 * Context for the command tunnel (for portaling the command palette)
 */
export const EditorCommandTunnelContext = createContext<
  ReturnType<typeof tunnel> | undefined
>(undefined);

/**
 * Internal component that renders the command palette outside the editor
 */
export const EditorCommandOut: FC<{
  clientRect?: DOMRect;
}> = ({ clientRect }) => {
  const tunnelInstance = useContext(EditorCommandTunnelContext);
  if (!tunnelInstance) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: clientRect?.top ?? 0,
        left: clientRect?.left ?? 0,
      }}
    >
      <tunnelInstance.Out />
    </div>
  );
};

/**
 * Command palette component
 * Shows available commands when user types '/'
 *
 * @example
 * ```tsx
 * <EditorCommand className="border rounded-lg shadow-lg">
 *   <EditorCommandList>
 *     <EditorCommandEmpty>No results found</EditorCommandEmpty>
 *     <EditorCommandItem
 *       value="heading"
 *       onCommand={({ editor, range }) => {
 *         editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
 *       }}
 *     >
 *       <Heading1 size={16} />
 *       Heading 1
 *     </EditorCommandItem>
 *   </EditorCommandList>
 * </EditorCommand>
 * ```
 */
export const EditorCommand: FC<
  HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
  }
> = ({ children, className }) => {
  const tunnelInstance = useContext(EditorCommandTunnelContext);
  const query = useAtomValue(queryAtom);
  const commandId = useId();

  if (!tunnelInstance) {
    throw new Error('EditorCommand must be used within EditorRoot');
  }

  return (
    <tunnelInstance.In>
      <Command
        id={commandId}
        className={className}
        shouldFilter={false}
        loop
        value={query}
      >
        {children}
      </Command>
    </tunnelInstance.In>
  );
};

/**
 * Container for command items
 */
export const EditorCommandList: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Command.List className={className} {...rest}>
      {children}
    </Command.List>
  );
};

/**
 * Empty state for command palette
 */
export const EditorCommandEmpty: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return <Command.Empty {...rest}>{children}</Command.Empty>;
};

/**
 * Individual command item
 *
 * @example
 * ```tsx
 * <EditorCommandItem
 *   value="bold"
 *   onCommand={({ editor, range }) => {
 *     editor.chain().focus().deleteRange(range).toggleBold().run();
 *   }}
 * >
 *   <Bold size={16} />
 *   Bold
 * </EditorCommandItem>
 * ```
 */
export const EditorCommandItem: FC<{
  value: string;
  onCommand: ({ editor, range }: { editor: any; range: any }) => void;
  children: ReactNode;
  className?: string;
}> = ({ value, onCommand, children, className, ...rest }) => {
  const range = useAtomValue(rangeAtom);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    // Get editor instance from parent
    const editorElement = document.querySelector('.ProseMirror');
    if (editorElement) {
      setEditor((editorElement as any).__editor);
    }
  }, []);

  return (
    <Command.Item
      value={value}
      onSelect={() => {
        if (editor) {
          onCommand({ editor, range });
        }
      }}
      className={className}
      {...rest}
    >
      {children}
    </Command.Item>
  );
};
