export function chunkText(text: string, size = 500) {
  const words = text.split(" ");
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }

  return chunks;
}