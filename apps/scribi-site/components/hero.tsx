"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, Sparkles } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCommand = "npm install scribi";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-6 px-4 py-1.5 border-zinc-700 bg-zinc-900/50 backdrop-blur-sm"
        >
          <Sparkles className="w-3 h-3 mr-2 text-yellow-400" />
          <span className="text-zinc-300">Developer-First WYSIWYG Editor</span>
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            The All-in-One
          </span>
          <br />
          <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent">
            Rich Text Editor
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Feature-rich, customizable, and framework-agnostic. No vendor lock-in.
          No forced features. Use <span className="text-white">any</span>{" "}
          storage provider.
        </p>

        {/* Install Command */}
        <div
          id="get-started"
          className="inline-flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-xl px-6 py-4 mb-8 backdrop-blur-sm group hover:border-zinc-700 transition-colors"
        >
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
            <a href="#how-it-works">Get Started</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-6 text-base"
            asChild
          >
            <a
              href="https://github.com/ImKKingshuk/scribi"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {[
            "✅ No Vendor Lock-in",
            "✅ TypeScript Ready",
            "✅ React 19 Support",
            "✅ Fully Customizable",
            "✅ Tree-Shakeable",
          ].map((feature) => (
            <span
              key={feature}
              className="text-sm text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-zinc-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
