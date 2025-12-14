import type { Editor, JSONContent } from '@tiptap/core';
import type { EditorView } from '@tiptap/pm/view';

/**
 * Core editor instance with extended capabilities
 */
export type EditorInstance = Editor;

/**
 * JSON representation of editor content
 */
export type { JSONContent };

/**
 * Upload function type for handling file uploads
 * This is completely customizable - use any storage provider you want
 */
export type UploadFn = (file: File, view: EditorView, pos: number) => void;

/**
 * Image upload configuration
 */
export interface ImageUploadOptions {
  /**
   * Optional validation function to check if file should be uploaded
   * Throw an error or return false to prevent upload
   */
  validateFn?: (file: File) => boolean | undefined;

  /**
   * Upload handler - implement this with YOUR storage solution
   * Can be Vercel Blob, AWS S3, Cloudflare R2, UploadThing, or any custom solution
   *
   * @param file - The file to upload
   * @returns Promise resolving to the URL where the file is accessible
   *
   * @example
   * ```typescript
   * // Using AWS S3
   * onUpload: async (file) => {
   *   const url = await uploadToS3(file);
   *   return url;
   * }
   *
   * // Using UploadThing
   * onUpload: async (file) => {
   *   const result = await uploadFiles({ files: [file] });
   *   return result[0].url;
   * }
   * ```
   */
  onUpload: (file: File) => Promise<string | unknown>;
}

/**
 * Slash command suggestion item
 */
export interface SuggestionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  searchTerms?: string[];
  command?: (props: { editor: Editor; range: Range }) => void;
}

/**
 * Range type from Tiptap
 */
export interface Range {
  from: number;
  to: number;
}
