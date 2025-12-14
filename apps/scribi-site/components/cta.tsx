"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import Link from "next/link";

export function CTA() {
  const [copied, setCopied] = useState(false);
  const installCommand = "npm install scribi";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-32 bg-zinc-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Ready to Build
          </span>
          <br />
          <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent">
            Something Amazing?
          </span>
        </h2>

        <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
          Start building your next-generation rich text experience today. Free,
          open source, and developer-first.
        </p>

        {/* Install Command */}
        <div className="inline-flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-xl px-6 py-4 mb-10 backdrop-blur-sm group hover:border-zinc-700 transition-colors">
          <code className="text-zinc-300 font-mono text-sm md:text-base">
            <span className="text-zinc-500">$</span> {installCommand}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            aria-label="Copy install command"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-400" />
            )}
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-8 py-6 text-base"
            asChild
          >
            <Link href="#how-it-works">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-6 text-base"
            asChild
          >
            <Link
              href="https://github.com/ImKKingshuk/scribi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
