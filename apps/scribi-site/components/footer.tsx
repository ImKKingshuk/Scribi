import Link from "next/link";
import { Github, Twitter, Heart } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Comparison", href: "#comparison" },
    { name: "FAQ", href: "#faq" },
  ],
  resources: [
    { name: "Documentation", href: "https://github.com/ImKKingshuk/scribi#readme" },
    { name: "Examples", href: "https://github.com/ImKKingshuk/scribi/tree/main/examples" },
    { name: "Changelog", href: "https://github.com/ImKKingshuk/scribi/blob/main/CHANGELOG.md" },
    { name: "Contributing", href: "https://github.com/ImKKingshuk/scribi/blob/main/CONTRIBUTING.md" },
  ],
  legal: [
    { name: "License (MIT)", href: "https://github.com/ImKKingshuk/scribi/blob/main/LICENSE" },
    { name: "GitHub", href: "https://github.com/ImKKingshuk/scribi" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                Scribi
              </span>
            </Link>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              A developer-first WYSIWYG editor for React. Feature-rich,
              customizable, and framework-agnostic.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/ImKKingshuk/scribi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com/ImKKingshuk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Scribi. MIT License.
          </p>
          <p className="text-sm text-zinc-500 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
            developers, for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
