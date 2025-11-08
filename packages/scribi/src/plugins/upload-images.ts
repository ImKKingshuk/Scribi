import { type EditorState, Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet, type EditorView } from '@tiptap/pm/view';
import type { ImageUploadOptions, UploadFn } from '../types/editor';

const uploadKey = new PluginKey('upload-image');

/**
 * Plugin for handling image uploads in the editor
 * Shows a placeholder while uploading
 */
export const UploadImagesPlugin = ({ imageClass }: { imageClass: string }) =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);

        // Check if the transaction adds or removes any placeholders
        const action = tr.getMeta(uploadKey) as
          | {
              add?: { id: unknown; pos: number; src: string };
              remove?: { id: unknown };
            }
          | undefined;

        if (action?.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement('div');
          placeholder.setAttribute('class', 'img-placeholder');
          const image = document.createElement('img');
          image.setAttribute('class', imageClass);
          image.src = src;
          placeholder.appendChild(image);

          const deco = Decoration.widget(pos + 1, placeholder, { id });
          set = set.add(tr.doc, [deco]);
        } else if (action?.remove) {
          set = set.remove(
            set.find(
              undefined,
              undefined,
              (spec) => spec.id === action.remove?.id,
            ),
          );
        }

        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

function findPlaceholder(state: EditorState, id: unknown): number | null {
  const decos = uploadKey.getState(state) as DecorationSet;
  const found = decos.find(undefined, undefined, (spec) => spec.id === id);
  return found.length ? (found[0]?.from ?? null) : null;
}

/**
 * Creates an upload function with your custom upload handler
 * This is framework/storage agnostic - use whatever you want!
 *
 * @example
 * ```typescript
 * // With AWS S3
 * const uploadFn = createImageUpload({
 *   validateFn: (file) => {
 *     if (file.size > 5 * 1024 * 1024) throw new Error('File too large');
 *     return true;
 *   },
 *   onUpload: async (file) => {
 *     const formData = new FormData();
 *     formData.append('file', file);
 *     const res = await fetch('/api/upload-to-s3', {
 *       method: 'POST',
 *       body: formData
 *     });
 *     const { url } = await res.json();
 *     return url;
 *   }
 * });
 *
 * // With Cloudflare R2
 * const uploadFn = createImageUpload({
 *   onUpload: async (file) => {
 *     const url = await uploadToR2(file);
 *     return url;
 *   }
 * });
 * ```
 */
export const createImageUpload =
  ({ validateFn, onUpload }: ImageUploadOptions): UploadFn =>
  (file, view, pos) => {
    // Validate the file
    const validated = validateFn?.(file);
    if (validated === false) return;

    // Generate a unique ID for this upload
    const id = {};

    // Prepare transaction
    const tr = view.state.tr;
    if (!tr.selection.empty) tr.deleteSelection();

    // Read file as data URL for preview
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Add placeholder with preview
      tr.setMeta(uploadKey, {
        add: {
          id,
          pos,
          src: reader.result,
        },
      });
      view.dispatch(tr);
    };

    // Upload the file
    onUpload(file)
      .then((src) => {
        const { schema } = view.state;
        const placeholderPos = findPlaceholder(view.state, id);

        // If placeholder was deleted, don't insert image
        if (placeholderPos === null) return;

        // Use uploaded URL or fall back to data URL
        const imageSrc = typeof src === 'string' ? src : reader.result;
        const node = schema.nodes.image?.create({ src: imageSrc });

        if (!node) return;

        // Replace placeholder with actual image
        const transaction = view.state.tr
          .replaceWith(placeholderPos, placeholderPos, node)
          .setMeta(uploadKey, { remove: { id } });

        view.dispatch(transaction);
      })
      .catch(() => {
        // Remove placeholder on error
        const transaction = view.state.tr
          .delete(pos, pos)
          .setMeta(uploadKey, { remove: { id } });
        view.dispatch(transaction);
      });
  };

/**
 * Handles image paste events
 */
export const handleImagePaste = (
  view: EditorView,
  event: ClipboardEvent,
  uploadFn: UploadFn,
): boolean => {
  if (event.clipboardData?.files.length) {
    event.preventDefault();
    const [file] = Array.from(event.clipboardData.files);
    const pos = view.state.selection.from;

    if (file) uploadFn(file, view, pos);
    return true;
  }
  return false;
};

/**
 * Handles image drop events
 */
export const handleImageDrop = (
  view: EditorView,
  event: DragEvent,
  moved: boolean,
  uploadFn: UploadFn,
): boolean => {
  if (!moved && event.dataTransfer?.files.length) {
    event.preventDefault();
    const [file] = Array.from(event.dataTransfer.files);
    const coordinates = view.posAtCoords({
      left: event.clientX,
      top: event.clientY,
    });

    // Deduct 1 from pos to prevent extra node creation
    if (file) uploadFn(file, view, (coordinates?.pos ?? 0) - 1);
    return true;
  }
  return false;
};
