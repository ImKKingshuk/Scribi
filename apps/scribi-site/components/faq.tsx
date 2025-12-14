import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Scribi?",
    answer:
      "Scribi is a developer-first WYSIWYG editor for React. It's feature-rich, customizable, and framework-agnostic. Built on top of Tiptap, it provides all the power you need without the vendor lock-in.",
  },
  {
    question: "How is Scribi different from Novel.sh?",
    answer:
      "Scribi is inspired by Novel.sh but rebuilt to be truly developer-first. Key differences: use ANY storage provider (not just Vercel Blob), no forced analytics or AI features, active maintenance, React 19 support, and a fully tree-shakeable bundle.",
  },
  {
    question: "What storage providers can I use?",
    answer:
      "Any! Scribi doesn't lock you into a specific storage solution. Use AWS S3, Cloudflare R2, UploadThing, your own API, or even base64 encoding. You provide the upload function, we handle the rest.",
  },
  {
    question: "Is Scribi production-ready?",
    answer:
      "Yes! Scribi is built with TypeScript, fully tested, and actively maintained. It uses the battle-tested Tiptap editor under the hood, which powers millions of editors worldwide.",
  },
  {
    question: "Do I need to style the editor?",
    answer:
      "Scribi is unstyled by default, giving you complete control over the appearance. Use Tailwind's typography plugin, your own CSS, or any styling solution you prefer.",
  },
  {
    question: "Can I use Scribi with Next.js?",
    answer:
      "Absolutely! Scribi works great with Next.js (both App Router and Pages Router), Create React App, Vite, Remix, and any other React framework.",
  },
  {
    question: "Is Scribi open source?",
    answer:
      "Yes! Scribi is MIT licensed and open source. Contributions are welcome – check out our GitHub repository to get involved.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-32 bg-zinc-900/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-200 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-lg text-zinc-400">
            Everything you need to know about Scribi.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border border-zinc-800 rounded-xl bg-zinc-900/50 backdrop-blur-sm px-6 data-[state=open]:border-zinc-700"
            >
              <AccordionTrigger className="text-left text-white hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
