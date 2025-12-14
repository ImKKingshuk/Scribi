import { Check, X } from "lucide-react";

const features = [
  {
    name: "Storage Flexibility",
    scribi: true,
    novel: false,
    scribiNote: "Any storage provider",
    novelNote: "Vercel Blob only",
  },
  {
    name: "Analytics/Tracking",
    scribi: false,
    novel: true,
    scribiNote: "None (privacy-first)",
    novelNote: "Built-in",
  },
  {
    name: "AI Integration",
    scribi: true,
    novel: true,
    scribiNote: "Optional (bring your own)",
    novelNote: "Forced integration",
  },
  {
    name: "Active Maintenance",
    scribi: true,
    novel: false,
    scribiNote: "Actively maintained",
    novelNote: "Inactive 1.5+ years",
  },
  {
    name: "React 19 Support",
    scribi: true,
    novel: false,
    scribiNote: "Full support",
    novelNote: "Not supported",
  },
  {
    name: "TypeScript",
    scribi: true,
    novel: true,
    scribiNote: "Full support",
    novelNote: "Supported",
  },
  {
    name: "Customization",
    scribi: true,
    novel: false,
    scribiNote: "Fully customizable",
    novelNote: "Limited",
  },
  {
    name: "Bundle Size",
    scribi: true,
    novel: false,
    scribiNote: "Tree-shakeable",
    novelNote: "Larger bundle",
  },
];

export function Comparison() {
  return (
    <section id="comparison" className="relative py-32 bg-zinc-950">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-200 bg-clip-text text-transparent">
              Why Scribi?
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            See how Scribi compares to Novel.sh – the inspiration for this
            project, rebuilt to be truly developer-first.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/50 backdrop-blur-sm overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-3 bg-zinc-900 border-b border-zinc-800 min-w-[320px]">
            <div className="p-2 md:p-4 text-xs md:text-sm font-medium text-zinc-400">Feature</div>
            <div className="p-2 md:p-4 text-center">
              <span className="text-sm md:text-lg font-bold text-white">Scribi</span>
            </div>
            <div className="p-2 md:p-4 text-center">
              <span className="text-sm md:text-lg font-medium text-zinc-400">
                Novel.sh
              </span>
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`grid grid-cols-3 min-w-[320px] ${
                index < features.length - 1 ? "border-b border-zinc-800/50" : ""
              } hover:bg-zinc-800/20 transition-colors`}
            >
              <div className="p-2 md:p-4 text-xs md:text-sm text-zinc-300">{feature.name}</div>
              <div className="p-2 md:p-4 flex flex-col items-center justify-center">
                {feature.scribi ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                ) : (
                  <X className="w-4 h-4 md:w-5 md:h-5 text-zinc-600" />
                )}
                <span className="hidden md:block text-xs text-zinc-500 mt-1 text-center">
                  {feature.scribiNote}
                </span>
              </div>
              <div className="p-2 md:p-4 flex flex-col items-center justify-center">
                {feature.novel ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
                ) : (
                  <X className="w-4 h-4 md:w-5 md:h-5 text-red-400/60" />
                )}
                <span className="hidden md:block text-xs text-zinc-500 mt-1 text-center">
                  {feature.novelNote}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
