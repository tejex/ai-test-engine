import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

const docxMimeType =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const getExtension = (fileName: string) => {
  const extension = fileName.split(".").pop();
  return extension?.toLowerCase() || "";
};

const extractTxtText = (file: File) => file.text();

const extractDocxText = async (file: File) => {
  const mammoth = await import("mammoth/mammoth.browser");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.default.extractRawText({ arrayBuffer });
  return result.value;
};

const extractPdfText = async (file: File) => {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

  const arrayBuffer = await file.arrayBuffer();
  const document = await pdfjs.getDocument({
    data: new Uint8Array(arrayBuffer),
  }).promise;

  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (pageText) {
      pages.push(pageText);
    }
  }

  return pages.join("\n\n");
};

export const supportedNoteFileTypes = [
  ".txt",
  ".md",
  ".pdf",
  ".docx",
  "text/plain",
  "text/markdown",
  "application/pdf",
  docxMimeType,
].join(",");

export async function extractNoteTextFromFile(file: File) {
  const extension = getExtension(file.name);

  if (file.type === "text/plain" || file.type === "text/markdown" || extension === "txt" || extension === "md") {
    return extractTxtText(file);
  }

  if (file.type === "application/pdf" || extension === "pdf") {
    return extractPdfText(file);
  }

  if (file.type === docxMimeType || extension === "docx") {
    return extractDocxText(file);
  }

  throw new Error(`Unsupported file type: ${file.name}`);
}
