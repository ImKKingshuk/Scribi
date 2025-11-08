/**
 * Plugins Tests
 */

import { describe, expect, test } from '@rstest/core';
import { createImageUpload } from '../src/plugins/upload-images';

describe('Image Upload Plugin', () => {
  describe('createImageUpload', () => {
    test('should create an upload function', () => {
      const uploadFn = createImageUpload({
        onUpload: async (_file) => {
          return 'https://example.com/image.jpg';
        },
      });

      expect(uploadFn).toBeDefined();
      expect(typeof uploadFn).toBe('function');
    });

    test('should create upload function with validation', () => {
      const uploadFn = createImageUpload({
        validateFn: (file) => {
          return file.size < 1024 * 1024; // 1MB
        },
        onUpload: async (_file) => {
          return 'https://example.com/image.jpg';
        },
      });

      expect(uploadFn).toBeDefined();
      expect(typeof uploadFn).toBe('function');
    });

    test('should accept custom onUpload function', () => {
      let uploadCalled = false;

      const uploadFn = createImageUpload({
        onUpload: async (file) => {
          uploadCalled = true;
          return `https://example.com/${file.name}`;
        },
      });

      expect(uploadFn).toBeDefined();
      expect(uploadCalled).toBe(false); // Not called yet
    });
  });
});

describe('Upload Function Examples', () => {
  test('should handle AWS S3 style upload', () => {
    const uploadFn = createImageUpload({
      onUpload: async (file) => {
        // Simulate S3 upload
        const key = `uploads/${Date.now()}-${file.name}`;
        return `https://bucket.s3.amazonaws.com/${key}`;
      },
    });

    expect(uploadFn).toBeDefined();
  });

  test('should handle Cloudflare R2 style upload', () => {
    const uploadFn = createImageUpload({
      onUpload: async (file) => {
        // Simulate R2 upload
        const key = `uploads/${file.name}`;
        return `https://pub-xxx.r2.dev/${key}`;
      },
    });

    expect(uploadFn).toBeDefined();
  });

  test('should handle base64 encoding', () => {
    const uploadFn = createImageUpload({
      onUpload: async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      },
    });

    expect(uploadFn).toBeDefined();
  });

  test('should handle custom API upload', () => {
    const uploadFn = createImageUpload({
      validateFn: (file) => {
        // Validate file size
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('File too large');
        }
        return true;
      },
      onUpload: async (file) => {
        // Simulate custom API
        const formData = new FormData();
        formData.append('file', file);

        // In real code, this would be a fetch call
        return `https://api.example.com/files/${file.name}`;
      },
    });

    expect(uploadFn).toBeDefined();
  });
});
