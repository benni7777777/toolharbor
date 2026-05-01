import type { Tool, ToolContent, FAQ } from '@/types/tool';
import type { ToolSeoProfile } from '@/lib/seo/profiles';

export interface RelatedToolReason {
  toolId: string;
  reason: string;
}

export interface ToolEditorialContent {
  summary: string;
  whatItDoes: string[];
  whenToUse: string[];
  practicalExamples: string[];
  privacyNotes: string[];
  commonMistakes: string[];
  troubleshooting: string[];
  responsibleUse?: string[];
  relatedGuideSlugs: string[];
  relatedToolReasons: RelatedToolReason[];
  faq: FAQ[];
}

type ToolEditorialOverride = Partial<Omit<ToolEditorialContent, 'summary' | 'whenToUse'>> & {
  summary?: string;
  whenToUse?: string[];
};

const GUIDE_BY_TOOL: Record<string, string[]> = {
  'merge-pdf': ['how-to-merge-pdf-files'],
  'split-pdf': ['how-to-merge-pdf-files'],
  'organize-pdf': ['how-to-merge-pdf-files'],
  'compress-pdf': ['how-to-compress-a-pdf-without-losing-readability'],
  'repair-pdf': ['how-to-compress-a-pdf-without-losing-readability'],
  'jpg-to-pdf': ['how-to-convert-jpg-to-pdf'],
  'image-to-pdf': ['how-to-convert-jpg-to-pdf'],
  'png-to-pdf': ['how-to-convert-jpg-to-pdf'],
  'pdf-to-jpg': ['how-to-convert-jpg-to-pdf'],
  'sign-pdf': ['how-to-sign-a-pdf-online-safely'],
  'digital-sign-pdf': ['how-to-sign-a-pdf-online-safely'],
  'form-filler': ['how-to-sign-a-pdf-online-safely'],
  'encrypt-pdf': ['how-to-protect-a-pdf-with-a-password'],
  'decrypt-pdf': ['how-to-protect-a-pdf-with-a-password'],
  'change-permissions': ['how-to-protect-a-pdf-with-a-password'],
  'remove-restrictions': ['how-to-protect-a-pdf-with-a-password'],
  'remove-metadata': ['how-to-remove-pdf-metadata-before-sharing'],
  'sanitize-pdf': ['how-to-remove-pdf-metadata-before-sharing', 'browser-based-pdf-tools-and-privacy'],
  'find-and-redact': ['how-to-redact-sensitive-information-in-a-pdf'],
  'ocr-pdf': ['browser-based-pdf-tools-and-privacy'],
  'pdf-reader': ['browser-based-pdf-tools-and-privacy'],
};

const RESPONSIBLE_USE_BY_TOOL: Record<string, string[]> = {
  'encrypt-pdf': [
    'Only protect documents you own or have permission to secure.',
    'Do not use encryption to hide unlawful activity or avoid disclosure duties that apply to the document.',
  ],
  'decrypt-pdf': [
    'Only decrypt PDFs when you have the password and permission to unlock the file.',
    'This tool is not intended to bypass access controls or rights that apply to someone else\'s document.',
  ],
  'remove-restrictions': [
    'Only remove restrictions from PDFs you own or are authorized to modify.',
    'Respect copyright, contractual, and access-control rules that apply to the file.',
  ],
  'find-and-redact': [
    'Redact only documents you are authorized to prepare or share.',
    'Important legal, regulatory, or disclosure workflows should be reviewed by a qualified person before filing.',
  ],
  'remove-metadata': [
    'Metadata cleanup does not replace a full privacy review of visible content, attachments, comments, or file names.',
    'Keep an original copy until the cleaned output has been checked.',
  ],
  'ocr-pdf': [
    'Use OCR only on documents you are allowed to process.',
    'Verify recognized text before relying on it for legal, financial, medical, or regulatory work.',
  ],
  'sign-pdf': [
    'This is not legal advice. Confirm that a visible signature is acceptable for your specific document and recipient.',
    'Do not sign blank, incomplete, or unauthorized documents.',
  ],
  'digital-sign-pdf': [
    'Certificate-based signing requirements vary by recipient and jurisdiction.',
    'Verify certificate trust and document requirements before using the signed file in a high-stakes workflow.',
  ],
};

const TOOL_EDITORIAL_OVERRIDES: Record<string, ToolEditorialOverride> = {
  'merge-pdf': {
    whatItDoes: [
      'Combines multiple source PDFs into one output while preserving the order you choose before export.',
      'Keeps the workflow focused on document assembly, so it is useful for packets, reports, scan batches, and supporting documents.',
      'Leaves page content unchanged unless the source files already contain different page sizes, rotations, or annotations.',
    ],
    commonMistakes: [
      'Merging files before checking version names such as final, final-v2, and signed-copy.',
      'Forgetting to open the merged output and verify the first page of each section.',
      'Using merge when only a few pages are needed from a larger file; extract or split first in that case.',
    ],
    troubleshooting: [
      'If the output order looks wrong, return to the file list and drag sources into the exact sequence before exporting again.',
      'If one file fails to merge, open it separately or try Repair PDF before adding it back to the merge.',
    ],
    faq: [
      {
        question: 'Will merging PDFs change the page content?',
        answer: 'The merge workflow is intended to join pages into one file, not rewrite the text or images on each page. Always review the output because source files can contain different page sizes, rotations, or annotations.',
      },
    ],
  },
  'compress-pdf': {
    whatItDoes: [
      'Reduces PDF size by optimizing document data and images where the file allows it.',
      'Helps with email attachments, upload portals, slower connections, and storage limits.',
      'Keeps the original document structure visible, but stronger compression can reduce image quality.',
    ],
    commonMistakes: [
      'Trying to force an exact target size when the PDF content cannot shrink that far without quality loss.',
      'Compressing a damaged PDF before repairing it.',
      'Sending the compressed file without checking signatures, small text, and scanned pages at normal zoom.',
    ],
    troubleshooting: [
      'If the file barely shrinks, it may already be optimized or mostly text-based.',
      'If pages become hard to read, use a lighter compression setting or remove unnecessary pages instead.',
    ],
    faq: [
      {
        question: 'Can PDF compression guarantee a specific file size?',
        answer: 'No. The final size depends on images, fonts, page objects, and how the source PDF was created. Compress again only if readability remains acceptable.',
      },
    ],
  },
  'jpg-to-pdf': {
    whatItDoes: [
      'Turns one or more JPG images into PDF pages in the order you choose.',
      'Works well for photographed forms, receipts, scanned pages, and image evidence that must be uploaded as one document.',
      'Creates a PDF wrapper around the images rather than recognizing or editing the text inside each photo.',
    ],
    commonMistakes: [
      'Leaving phone photos in the wrong order before exporting.',
      'Using low-quality images when small text must remain readable.',
      'Forgetting that visible details in a photo are still visible after conversion.',
    ],
    troubleshooting: [
      'If the PDF is too large, compress the final PDF after confirming the images are readable.',
      'If a page is sideways, rotate the source image or use a PDF rotation tool after conversion.',
    ],
    faq: [
      {
        question: 'Does JPG to PDF make scanned text editable?',
        answer: 'No. Converting JPG images to PDF creates document pages from the images. Use OCR later if you need recognized or searchable text.',
      },
    ],
  },
  'pdf-to-jpg': {
    whatItDoes: [
      'Exports selected PDF pages as JPG images for upload forms, support tickets, previews, or image workflows.',
      'Creates image files from the rendered page appearance instead of preserving editable PDF structure.',
      'Is useful when the destination accepts images but the source file is still a PDF.',
    ],
    commonMistakes: [
      'Expecting exported JPG files to keep selectable text or form fields.',
      'Choosing JPG when the page contains sharp diagrams that would be better as PNG.',
      'Forgetting that each exported page may become a separate image file.',
    ],
    troubleshooting: [
      'If text looks soft, try a higher export scale or use PDF to PNG for lossless output.',
      'If only a few pages are needed, select those pages before export to avoid unnecessary files.',
    ],
    faq: [
      {
        question: 'Will PDF to JPG preserve searchable text?',
        answer: 'No. JPG output is image-based. Use PDF to DOCX, OCR PDF, or another text-focused export if selectable text matters.',
      },
    ],
  },
  'split-pdf': {
    whatItDoes: [
      'Separates one PDF into smaller outputs by page selection or range.',
      'Helps when only part of a long document should be sent, uploaded, or archived.',
      'Keeps the selected pages intact while leaving the original file unchanged on your device.',
    ],
    commonMistakes: [
      'Entering page ranges without checking whether the PDF page labels match the actual page positions.',
      'Splitting when the real task is simply deleting unwanted pages from one final file.',
      'Forgetting to rename output files clearly after creating several parts.',
    ],
    troubleshooting: [
      'If the wrong pages appear, check the page thumbnails and adjust the range using actual page positions.',
      'If you need one cleaned PDF rather than several outputs, use Delete Pages or Organize PDF.',
    ],
    faq: [
      {
        question: 'Should I split or extract pages?',
        answer: 'Use Split PDF when one document needs to become multiple smaller files. Use Extract Pages when a selected set of pages should become its own output.',
      },
    ],
  },
  'sign-pdf': {
    whatItDoes: [
      'Places a visible signature on a PDF by drawing, typing, or using an uploaded signature image.',
      'Supports everyday approval and form workflows where a visible signature is accepted by the recipient.',
      'Does not automatically make a document legally sufficient or certificate-validated.',
    ],
    commonMistakes: [
      'Signing before filling required form fields.',
      'Placing the signature over important text or outside the expected signing box.',
      'Assuming every recipient accepts a visible signature instead of a certificate-based signature.',
    ],
    troubleshooting: [
      'If the signature is hard to read, recreate it with stronger contrast or place it on a clearer part of the page.',
      'If a recipient requires certificate validation, use a digital signature workflow rather than a visible signature only.',
    ],
    faq: [
      {
        question: 'Is this the same as a certificate-based digital signature?',
        answer: 'No. Sign PDF is for visible signatures. Use Digital Sign PDF when a certificate-backed signature is required, and confirm requirements with the recipient.',
      },
    ],
  },
  'encrypt-pdf': {
    whatItDoes: [
      'Adds password protection to a PDF so opening the output requires the password you choose.',
      'Can help control access before sending, storing, or archiving sensitive documents.',
      'Does not remove visible private content or hidden metadata by itself.',
    ],
    commonMistakes: [
      'Sending the encrypted PDF and password in the same message.',
      'Forgetting the password before verifying that the recipient can open the file.',
      'Using encryption instead of redaction when information should not be disclosed at all.',
    ],
    troubleshooting: [
      'If the encrypted file will not open, confirm the exact password and try another PDF viewer.',
      'If the PDF still shows sensitive content after opening, redact or remove it before encrypting again.',
    ],
    faq: [
      {
        question: 'Does encryption remove sensitive information?',
        answer: 'No. Encryption controls access to the file. Use redaction and metadata cleanup when information should be removed before sharing.',
      },
    ],
  },
  'decrypt-pdf': {
    whatItDoes: [
      'Removes an opening password from a PDF after you provide the correct password.',
      'Prepares authorized files for follow-up editing, conversion, compression, or archiving.',
      'Does not bypass unknown passwords or rights that apply to someone else\'s document.',
    ],
    commonMistakes: [
      'Trying to unlock a file without the correct permission or password.',
      'Deleting the protected original before verifying the decrypted output.',
      'Assuming decryption removes all permission flags or document policy requirements.',
    ],
    troubleshooting: [
      'If the password is rejected, check capitalization, copied spaces, and whether the file uses a separate owner password.',
      'If another tool still cannot process the file, try Repair PDF or check whether the PDF has additional restrictions.',
    ],
    faq: [
      {
        question: 'Can this remove a password without knowing it?',
        answer: 'No. Decrypt PDF is for documents you are authorized to unlock with the correct password.',
      },
    ],
  },
  'remove-metadata': {
    whatItDoes: [
      'Removes or minimizes common PDF document properties such as author, title, producer, and creation metadata.',
      'Helps before publishing, sending resumes, sharing client reports, or distributing drafts created from private templates.',
      'Focuses on hidden document properties, not visible text, images, comments, or attachments.',
    ],
    commonMistakes: [
      'Treating metadata cleanup as redaction of visible content.',
      'Forgetting that file names, bookmarks, comments, or attachments may still reveal sensitive details.',
      'Skipping a properties check in a PDF viewer after export.',
    ],
    troubleshooting: [
      'If metadata still appears, try a broader sanitize workflow and check the output in more than one PDF viewer.',
      'If visible information remains, use redaction rather than another metadata pass.',
    ],
    faq: [
      {
        question: 'Is removing metadata enough before publishing a PDF?',
        answer: 'Not always. It reduces hidden document properties, but visible content, comments, attachments, and file names should still be reviewed separately.',
      },
    ],
  },
  'ocr-pdf': {
    whatItDoes: [
      'Recognizes text in scanned or image-based PDF pages so the content can become searchable or easier to export.',
      'Helps with archives, photographed forms, scanned statements, and documents where text cannot currently be selected.',
      'Produces results that depend on scan quality, language, handwriting, layout, and image clarity.',
    ],
    commonMistakes: [
      'Running OCR on a PDF that already has selectable text.',
      'Assuming OCR output is perfect without checking names, numbers, and tables.',
      'Using low-quality photographed pages when a clearer scan is available.',
    ],
    troubleshooting: [
      'If recognition is weak, try a clearer source scan, deskew the pages, or increase contrast before OCR.',
      'If the PDF is damaged, repair it before attempting recognition.',
    ],
    faq: [
      {
        question: 'Can OCR make every scanned PDF perfectly searchable?',
        answer: 'No. OCR quality depends on the source image, layout, language, and scan condition. Always verify important recognized text.',
      },
    ],
  },
  'pdf-to-docx': {
    whatItDoes: [
      'Exports PDF content into a DOCX-style document when text needs to be revised in a word processor.',
      'Works best on PDFs that already contain selectable text and simple layouts.',
      'May require cleanup when the source has scans, multi-column layouts, unusual fonts, or complex tables.',
    ],
    commonMistakes: [
      'Expecting a complex designed PDF to convert into a perfectly editable Word document.',
      'Using DOCX export when only a page image or preview is needed.',
      'Skipping OCR before export when the source PDF is a scan.',
    ],
    troubleshooting: [
      'If the output is mostly images or missing text, run OCR first or use a clearer source.',
      'If layout matters more than editing, export to images instead of DOCX.',
    ],
    faq: [
      {
        question: 'Why does my DOCX need cleanup after conversion?',
        answer: 'PDFs are final-layout documents. Converting them into editable word-processing structure can require cleanup, especially for scans, columns, tables, and custom fonts.',
      },
    ],
  },
  'extract-pages': {
    whatItDoes: [
      'Saves selected pages from a PDF into a new output without editing the rest of the source file.',
      'Works well for signature pages, appendices, selected statements, and evidence extracts.',
      'Keeps extracted pages in their original visual quality as long as the source PDF is valid.',
    ],
    commonMistakes: [
      'Confusing extraction with deletion. Extraction saves selected pages; deletion removes selected pages from a final document.',
      'Using printed page numbers instead of actual PDF page positions.',
      'Forgetting to check whether extracted pages need to be merged with another document afterward.',
    ],
    troubleshooting: [
      'If the output includes the wrong pages, verify the page range against thumbnails instead of printed labels.',
      'If the source will not process, try Repair PDF before extracting pages.',
    ],
    faq: [
      {
        question: 'Does extracting pages change the original PDF?',
        answer: 'No. The workflow creates a new output from selected pages. Keep the original until you confirm the extracted file is correct.',
      },
    ],
  },
  'rotate-pdf': {
    whatItDoes: [
      'Rotates PDF pages so sideways scans, landscape sheets, or mixed-orientation pages read correctly.',
      'Can apply rotation to selected pages instead of forcing the entire document into one orientation.',
      'Changes page orientation metadata or page rendering, not the written content itself.',
    ],
    commonMistakes: [
      'Rotating every page when only a few scanned sheets are sideways.',
      'Confusing visual rotation in a viewer with saved rotation in the exported file.',
      'Skipping print preview when the final PDF will be printed.',
    ],
    troubleshooting: [
      'If a page still opens sideways, export again and confirm the rotation was applied to that page before downloading.',
      'If page size looks wrong after rotation, inspect the file with page dimensions or organize tools.',
    ],
    faq: [
      {
        question: 'Can I rotate only selected PDF pages?',
        answer: 'Yes, when the tool flow supports page selection. Use selected-page rotation for mixed scans instead of changing the whole document.',
      },
    ],
  },
  'add-watermark': {
    whatItDoes: [
      'Adds visible text or image watermarks to PDF pages for draft, confidential, approved, or branded copies.',
      'Lets users adjust placement, opacity, and rotation so the watermark is visible without blocking the document.',
      'Creates visible page content; it is not the same as password protection or access control.',
    ],
    commonMistakes: [
      'Using a watermark as a security feature when encryption or permissions are needed.',
      'Placing dark watermarks over small text or form fields.',
      'Forgetting to save an unwatermarked original for future edits.',
    ],
    troubleshooting: [
      'If the watermark is too strong, reduce opacity or move it away from important text.',
      'If you only need page numbering or headers, use those dedicated tools instead.',
    ],
    faq: [
      {
        question: 'Does a watermark protect a PDF from copying?',
        answer: 'No. A watermark is visible labeling. Use encryption, permissions, or a controlled sharing process when access control matters.',
      },
    ],
  },
  'page-numbers': {
    whatItDoes: [
      'Adds visible page numbers to PDFs so recipients can reference pages consistently.',
      'Supports documents that need review copies, filing packets, handouts, or printed binders.',
      'Is separate from PDF internal page labels, which may not match printed page numbers.',
    ],
    commonMistakes: [
      'Starting numbering at the wrong page when a cover sheet should be skipped.',
      'Placing numbers over footer text, signatures, or form fields.',
      'Assuming page numbers update automatically after later deleting pages.',
    ],
    troubleshooting: [
      'If numbering starts too early, set an offset or skip cover pages before export.',
      'If numbers overlap content, adjust placement or margins and export again.',
    ],
    faq: [
      {
        question: 'Can page numbers skip a cover page?',
        answer: 'Use the available start-page or offset controls when the document needs a cover page, title page, or appendix numbering style.',
      },
    ],
  },
  'delete-pages': {
    whatItDoes: [
      'Removes unwanted pages from a PDF and exports a cleaned copy.',
      'Helps remove blank scans, duplicate pages, outdated appendices, or pages that should not be included in a submission.',
      'Keeps the remaining page order intact unless you also use an organize workflow.',
    ],
    commonMistakes: [
      'Deleting pages without keeping an original copy.',
      'Using printed page numbers instead of actual PDF page positions.',
      'Deleting pages that should have been extracted into a separate output.',
    ],
    troubleshooting: [
      'If the wrong page was removed, restore from the original and repeat the selection carefully.',
      'If several structural edits are needed, use Organize PDF or PDF Multi Tool instead of repeating single actions.',
    ],
    faq: [
      {
        question: 'Does Delete Pages overwrite my original file?',
        answer: 'No. It creates a new output. Keep the original until the cleaned PDF has been checked.',
      },
    ],
  },
  'pdf-reader': {
    whatItDoes: [
      'Opens a PDF in the browser for inspection before or after another document action.',
      'Helps verify page order, readability, signatures, annotations, and exported results.',
      'Is useful as a review step even when no editing is needed.',
    ],
    commonMistakes: [
      'Downloading an output without opening it at least once.',
      'Checking only the first page of a long document.',
      'Assuming a PDF that opens in one viewer will look identical in every recipient environment.',
    ],
    troubleshooting: [
      'If a PDF does not open, try Repair PDF or verify that the download completed correctly.',
      'If a page looks wrong after editing, return to the original and repeat the specific tool step.',
    ],
    faq: [
      {
        question: 'Why use a reader if I already downloaded the file?',
        answer: 'Opening the file is the fastest way to catch page order, readability, rotation, signature, and redaction issues before sharing.',
      },
    ],
  },
  'find-and-redact': {
    whatItDoes: [
      'Finds and hides visible sensitive content such as names, addresses, account numbers, pricing, or internal notes.',
      'Supports a review workflow before sharing documents outside their original context.',
      'Should be paired with output verification and metadata cleanup when privacy is important.',
    ],
    commonMistakes: [
      'Covering text visually without verifying that the exported PDF no longer exposes it.',
      'Relying only on search in scanned PDFs where text may be image-based.',
      'Forgetting metadata, comments, attachments, bookmarks, and file names.',
    ],
    troubleshooting: [
      'If search misses visible text, inspect the page manually or run OCR first when appropriate.',
      'If redaction marks cover too much, work from a copy and use narrower selections.',
    ],
    faq: [
      {
        question: 'Is redaction the same as removing metadata?',
        answer: 'No. Redaction addresses visible page content. Metadata cleanup addresses hidden document properties. Sensitive documents may need both.',
      },
    ],
  },
  'repair-pdf': {
    whatItDoes: [
      'Attempts to recover a usable PDF from a file that will not open or behaves incorrectly.',
      'Can help before compression, conversion, splitting, or other workflows that require a valid source file.',
      'Creates a healthier output when recovery is possible, but cannot guarantee every damaged file can be fixed.',
    ],
    commonMistakes: [
      'Running conversion or compression repeatedly on a corrupt source before trying repair.',
      'Deleting the original damaged file before confirming the repaired output contains the expected pages.',
      'Assuming repair will recover missing bytes from an incomplete download.',
    ],
    troubleshooting: [
      'If repair fails, download the source again or try opening it in another viewer to confirm the file is complete.',
      'If repair succeeds but content is missing, use the best available original rather than relying on partial recovery.',
    ],
    faq: [
      {
        question: 'Can every broken PDF be repaired?',
        answer: 'No. Repair can fix many malformed files, but severely incomplete or corrupted PDFs may not contain enough data to recover.',
      },
    ],
  },
};

function humanizeList(items: string[], fallback: string): string {
  const clean = items.filter(Boolean);
  if (clean.length === 0) {
    return fallback;
  }
  if (clean.length === 1) {
    return clean[0];
  }
  return `${clean.slice(0, -1).join(', ')} and ${clean[clean.length - 1]}`;
}

function humanizeFeature(feature: string): string {
  return feature.replace(/-/g, ' ');
}

function fallbackRelatedReasons(tool: Tool): RelatedToolReason[] {
  return tool.relatedTools.map((toolId) => ({
    toolId,
    reason: `Use this adjacent tool when the job moves beyond ${tool.id.replace(/-/g, ' ')} into a related PDF workflow.`,
  }));
}

function fallbackFaq(tool: Tool, content: ToolContent): FAQ[] {
  const toolName = content.title || tool.id.replace(/-/g, ' ');
  return [
    {
      question: `What should I check before sharing output from ${toolName}?`,
      answer:
        'Open the downloaded file and verify page order, readability, visible edits, and any privacy-sensitive details before sending or filing it.',
    },
    {
      question: `Does ${toolName} upload my document to OpenToolsKit servers?`,
      answer:
        'OpenToolsKit is designed around browser-side processing where applicable. Some browser features, third-party links, or unsupported file types can have different boundaries, so review the privacy page for details.',
    },
  ];
}

export function getToolEditorialContent(
  tool: Tool,
  content: ToolContent,
  profile: ToolSeoProfile
): ToolEditorialContent {
  const override = TOOL_EDITORIAL_OVERRIDES[tool.id] ?? {};
  const toolName = content.title || tool.id.replace(/-/g, ' ');
  const featureList = humanizeList(tool.features.map(humanizeFeature), 'the selected PDF operation');
  const inputList = humanizeList(profile.inputs, 'the supported input file');
  const outputList = humanizeList(profile.outputs, 'a downloadable output file');

  const fallback: ToolEditorialContent = {
    summary: profile.fastAnswer,
    whatItDoes: [
      `${toolName} works with ${inputList} and produces ${outputList}.`,
      `The workflow focuses on ${featureList}, so the page gives users a direct path for this specific document job.`,
      'The tool interface is paired with visible guidance so users can understand the expected result before choosing files.',
    ],
    whenToUse: profile.bestFor,
    practicalExamples: profile.examples.map((example) => `${example.title}: start with ${example.input} and check that the output matches ${example.output}.`),
    privacyNotes: [
      'Use this tool only on documents you own or have permission to process.',
      'OpenToolsKit is designed around browser-side processing where applicable, but you should still inspect the downloaded result before sharing it.',
      'Keep the original file until the output has been opened and verified.',
    ],
    commonMistakes: [
      `Using ${toolName} when a related tool would better match the document goal.`,
      'Skipping output review after a successful download.',
      'Treating a browser tool result as final for high-stakes workflows without checking recipient requirements.',
    ],
    troubleshooting: [
      'If processing fails, try a smaller file, refresh the page, or check whether the source PDF opens correctly in a reader.',
      'If the result is not what you expected, return to the original file and adjust the selected pages, order, format, or settings.',
    ],
    responsibleUse: RESPONSIBLE_USE_BY_TOOL[tool.id],
    relatedGuideSlugs: GUIDE_BY_TOOL[tool.id] ?? ['browser-based-pdf-tools-and-privacy'],
    relatedToolReasons: fallbackRelatedReasons(tool),
    faq: fallbackFaq(tool, content),
  };

  return {
    ...fallback,
    ...override,
    whatItDoes: override.whatItDoes ?? fallback.whatItDoes,
    whenToUse: override.whenToUse ?? fallback.whenToUse,
    practicalExamples: override.practicalExamples ?? fallback.practicalExamples,
    privacyNotes: override.privacyNotes ?? fallback.privacyNotes,
    commonMistakes: override.commonMistakes ?? fallback.commonMistakes,
    troubleshooting: override.troubleshooting ?? fallback.troubleshooting,
    responsibleUse: override.responsibleUse ?? fallback.responsibleUse,
    relatedGuideSlugs: override.relatedGuideSlugs ?? fallback.relatedGuideSlugs,
    relatedToolReasons: override.relatedToolReasons ?? fallback.relatedToolReasons,
    faq: [...(override.faq ?? []), ...fallback.faq],
  };
}

export function getToolVisibleFaq(content: ToolContent, editorial: ToolEditorialContent): FAQ[] {
  const seen = new Set<string>();
  return [...content.faq, ...editorial.faq].filter((item) => {
    const key = `${item.question}\n${item.answer}`.toLocaleLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
