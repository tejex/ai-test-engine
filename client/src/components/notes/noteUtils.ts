export const getWordCount = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).length;

export const getNotePreview = (value: string) => {
  const noteLines = value.trim().split(/\r?\n/).filter(Boolean);
  return noteLines.slice(0, 4).join('\n') || value.trim().slice(0, 220);
};

export const getDialogRows = (value: string) => {
  const lineCount = value.split(/\r?\n/).length;
  return Math.min(Math.max(lineCount + 2, 6), 18);
};
