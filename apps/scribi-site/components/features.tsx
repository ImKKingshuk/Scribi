import { Card, CardContent } from "@/components/ui/card";
import {
  Type,
  Command,
  Upload,
  FileCode,
  Palette,
  CheckSquare,
  Link,
  Code2,
} from "lucide-react";

const features = [
  {
    icon: Type,
    title: "Rich Text Editing",
    description:
      "Bold, italic, underline, strikethrough, code, and more. Full formatting control.",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: Command,
    title: "Slash Commands",
    description:
      "Type / to access a powerful command palette. Quick actions at your fingertips.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Upload,
    title: "Image Uploads",
    description:
      "Drag & drop, paste images. Works with S3, R2, UploadThing, or any storage.",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: FileCode,
    title: "Markdown Support",
    description:
      "Export and import Markdown. Seamless content portability across platforms.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "Bring your own styles. Every feature is opt-in and configurable to your needs.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: CheckSquare,
    title: "Task Lists",
    description:
      "Interactive checkboxes for todo lists. Perfect for notes and documentation.",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Link,
    title: "Links & Embeds",
    description:
      "YouTube embeds, custom links, and more. Rich media support built-in.",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    icon: Code2,
    title: "Syntax Highlighting",
    description:
      "Code blocks with syntax highlighting. Powered by lowlight for 190+ languages.",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 bg-zinc-950">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-200 bg-clip-text text-transparent">
              One Editor, Infinite Possibilities
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to build modern rich text experiences. No
            compromises, no surprises.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
