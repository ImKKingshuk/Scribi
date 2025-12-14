"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-700" />
          </div>
          {filename && (
            <span className="text-[10px] md:text-xs text-zinc-500 font-mono truncate max-w-[100px] md:max-w-none">{filename}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1 md:p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors flex-shrink-0"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-400" />
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-3 md:p-4 overflow-x-auto">
        <pre className="text-xs md:text-sm leading-relaxed whitespace-pre">
          <code className={`language-${language} text-zinc-300`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
