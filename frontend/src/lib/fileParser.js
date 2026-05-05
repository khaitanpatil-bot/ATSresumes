import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set worker for pdfjs to work in Vite
// We use a blob to avoid needing a separate file in the public dir
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export const extractTextFromFile = async (file) => {
  const extension = file.name.split('.').pop().toLowerCase();

  if (extension === 'txt') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  if (extension === 'pdf') {
    return parsePDFText(file);
  }

  if (extension === 'docx') {
    return parseDOCXText(file);
  }

  throw new Error('Unsupported file type. Please upload a .txt, .pdf, or .docx file.');
};

const parsePDFText = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error('Failed to parse PDF file');
  }
};

const parseDOCXText = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error('Failed to parse DOCX file');
  }
};
