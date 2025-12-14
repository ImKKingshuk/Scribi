import { CodeBlock } from "./code-block";

const steps = [
  {
    step: 1,
    title: "Install the Package",
    description: "Add Scribi to your React project with your package manager.",
    code: `npm install scribi
# or
bun add scribi`,
    language: "bash",
  },
  {
    step: 2,
    title: "Create Your Editor",
    description:
      "Import the components and set up a basic editor in seconds.",
    code: `import { EditorRoot, EditorContent, StarterKit, Placeholder } from 'scribi';

function MyEditor() {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[StarterKit, Placeholder]}
        initialContent={{ type: 'doc', content: [] }}
        editorProps={{
          attributes: {
            class: 'prose prose-lg focus:outline-none min-h-[200px] p-4',
          },
        }}
      />
    </EditorRoot>
  );
}`,
    language: "tsx",
  },
  {
    step: 3,
    title: "Add Custom Features",
    description:
      "Enable slash commands, bubble menus, image uploads, and more.",
    code: `import { EditorBubble, EditorCommand, UploadImagesPlugin } from 'scribi';

<EditorContent extensions={[StarterKit, UploadImagesPlugin()]}>
  <EditorBubble>
    {/* Your formatting toolbar */}
  </EditorBubble>
  <EditorCommand>
    {/* Your slash command menu */}
  </EditorCommand>
</EditorContent>`,
    language: "tsx",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 bg-zinc-900/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-200 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Get started in minutes. Three simple steps to a powerful editor.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              {/* Step Number */}
              <div className="flex items-start gap-3 md:gap-6">
                <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-sm md:text-xl font-bold text-white border border-zinc-700">
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-2xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-400 mb-4 md:mb-6">{item.description}</p>
                  <CodeBlock
                    code={item.code}
                    language={item.language}
                    filename={
                      item.language === "bash" ? "terminal" : "MyEditor.tsx"
                    }
                  />
                </div>
              </div>

              {/* Connector Line */}
              {item.step < steps.length && (
                <div className="absolute left-4 md:left-6 top-12 md:top-16 w-px h-full bg-gradient-to-b from-zinc-700 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
