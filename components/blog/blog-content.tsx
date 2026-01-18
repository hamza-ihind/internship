'use client';

export interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  // Convert markdown to HTML-like structure with proper IDs for headings
  const processedContent = content
    .split('\n')
    .map((line, index) => {
      // H2 headings
      if (line.startsWith('## ')) {
        const text = line.substring(3);
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return `<h2 id="${id}" key="${index}" class="text-3xl font-bold mt-12 mb-6 scroll-mt-24">${text}</h2>`;
      }
      // H3 headings
      if (line.startsWith('### ')) {
        const text = line.substring(4);
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return `<h3 id="${id}" key="${index}" class="text-2xl font-bold mt-8 mb-4 scroll-mt-24">${text}</h3>`;
      }
      // H4 headings
      if (line.startsWith('#### ')) {
        const text = line.substring(5);
        return `<h4 key="${index}" class="text-xl font-semibold mt-6 mb-3">${text}</h4>`;
      }
      // Bold text
      line = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold">$1</strong>'
      );
      // Italic text
      line = line.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
      // Code blocks
      if (line.startsWith('```')) {
        return '<pre class="bg-muted border rounded-lg p-4 overflow-x-auto my-6"><code>';
      }
      if (line === '```') {
        return '</code></pre>';
      }
      // Inline code
      line = line.replace(
        /`(.*?)`/g,
        '<code class="bg-muted text-primary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
      );
      // Blockquotes
      if (line.startsWith('> ')) {
        return `<blockquote class="border-l-4 border-primary bg-muted/50 py-2 px-4 my-6 italic">${line.substring(
          2
        )}</blockquote>`;
      }
      // Links
      line = line.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
      );
      // Unordered lists
      if (line.startsWith('- ')) {
        return `<li class="my-2">${line.substring(2)}</li>`;
      }
      // Ordered lists (numbered)
      if (/^\d+\.\s/.test(line)) {
        return `<li class="my-2">${line.replace(/^\d+\.\s/, '')}</li>`;
      }
      // Checkmarks
      line = line.replace(/✅/g, '<span class="text-green-500">✅</span>');
      line = line.replace(/❌/g, '<span class="text-red-500">❌</span>');
      line = line.replace(/⏳/g, '<span class="text-yellow-500">⏳</span>');
      line = line.replace(/🔄/g, '<span class="text-blue-500">🔄</span>');

      // Empty lines
      if (line.trim() === '') {
        return '<br />';
      }

      // Regular paragraphs
      if (!line.startsWith('<')) {
        return `<p class="mb-6 leading-relaxed">${line}</p>`;
      }

      return line;
    })
    .join('\n');

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
