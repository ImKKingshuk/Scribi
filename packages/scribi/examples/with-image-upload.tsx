/**
 * Editor with Image Upload Example
 *
 * Demonstrates how to add image upload functionality with YOUR storage provider.
 * This example shows multiple storage options!
 */

import {
  createImageUpload,
  EditorContent,
  EditorRoot,
  handleImageDrop,
  handleImagePaste,
  Image,
  Placeholder,
  StarterKit,
  UploadImagesPlugin,
} from 'scribi';

// Example 1: Upload to your own API
const uploadToCustomAPI = createImageUpload({
  validateFn: (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File too large! Max 5MB');
      return false;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type! Only images allowed');
      return false;
    }

    return true;
  },
  onUpload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const { url } = await response.json();
    return url;
  },
});

// Example 2: Using AWS S3 (pseudo-code)
const uploadToS3 = createImageUpload({
  onUpload: async (file) => {
    // Your S3 upload logic here
    const s3Response = await uploadToAWSS3(file);
    return s3Response.url;
  },
});

// Example 3: Using Cloudflare R2 (pseudo-code)
const uploadToR2 = createImageUpload({
  onUpload: async (file) => {
    // Your R2 upload logic here
    const r2Response = await uploadToCloudflareR2(file);
    return r2Response.url;
  },
});

// Example 4: Base64 encoding (no upload, stores in document)
const useBase64 = createImageUpload({
  onUpload: async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  },
});

export function EditorWithImageUpload() {
  // Choose your upload method
  const uploadFn = uploadToCustomAPI; // or uploadToS3, uploadToR2, useBase64

  return (
    <EditorRoot>
      <EditorContent
        extensions={[
          StarterKit,
          Placeholder,
          Image.configure({
            HTMLAttributes: {
              class: 'rounded-lg max-w-full',
            },
          }),
          UploadImagesPlugin({ imageClass: 'rounded-lg' }),
        ]}
        initialContent={{ type: 'doc', content: [] }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[300px] p-4',
          },
          // Handle image drops
          handleDrop: (view, event, _, moved) =>
            handleImageDrop(view, event as DragEvent, moved, uploadFn),
          // Handle image paste
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
        }}
      />
    </EditorRoot>
  );
}

// Server-side example (Next.js API route)
/*
// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  // Upload to your storage
  const blob = await put(file.name, file, { access: 'public' });
  
  return NextResponse.json({ url: blob.url });
}
*/
