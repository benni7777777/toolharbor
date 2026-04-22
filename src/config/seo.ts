import type { ToolCategory } from '@/types/tool';

export type StaticPageKey =
  | 'home'
  | 'tools'
  | 'workflow'
  | 'about'
  | 'faq'
  | 'privacy'
  | 'contact';

export interface StaticPageSeo {
  title: string;
  description: string;
  primaryQuery: string;
  secondaryQueries: string[];
}

export interface CategorySeoProfile {
  title: string;
  h1: string;
  description: string;
  primaryQuery: string;
  secondaryQueries: string[];
  intro: string;
  bestFor: string[];
  adjacentCategories: ToolCategory[];
}

export interface ToolSeoExample {
  title: string;
  input: string;
  output: string;
}

export interface ToolSeoOverride {
  primaryQuery: string;
  secondaryQueries: string[];
  pageTitle: string;
  h1: string;
  metaDescription: string;
  fastAnswer: string;
  bestFor: string[];
  inputs: string[];
  outputs: string[];
  limitations: string[];
  examples: ToolSeoExample[];
  comparisonToolIds: string[];
}

export const STATIC_PAGE_SEO: Record<StaticPageKey, StaticPageSeo> = {
  home: {
    title: 'Browser PDF Tools That Keep Files Local | OpenToolsKit',
    description: 'Use browser-side PDF tools for merging, splitting, compressing, converting, signing, and repairing files without uploading them to a server.',
    primaryQuery: 'browser pdf tools',
    secondaryQueries: ['private pdf tools', 'local pdf tools', 'pdf tools without upload'],
  },
  tools: {
    title: 'PDF Tool Directory - Merge, Split, Compress, Convert | OpenToolsKit',
    description: 'Browse the OpenToolsKit PDF tool directory for browser-side workflows covering merge, split, compress, convert, redact, repair, and secure PDF jobs.',
    primaryQuery: 'pdf tool directory',
    secondaryQueries: ['pdf tools list', 'online pdf tools without upload', 'browser pdf toolkit'],
  },
  workflow: {
    title: 'PDF Workflow Builder - Chain Merge, Compress, And Secure Steps | OpenToolsKit',
    description: 'Build repeatable browser-side PDF workflows by chaining merge, split, compress, edit, and security steps into one reusable sequence.',
    primaryQuery: 'pdf workflow builder',
    secondaryQueries: ['browser pdf workflow', 'repeat pdf tasks', 'client side pdf workflow'],
  },
  about: {
    title: 'About OpenToolsKit - Browser-Side Utility Platform',
    description: 'Learn how OpenToolsKit runs practical browser-side file tools, keeps AGPL source availability visible, and prioritizes private, task-first workflows.',
    primaryQuery: 'about opentoolskit',
    secondaryQueries: ['opentoolskit agpl', 'browser side file tools', 'private utility platform'],
  },
  faq: {
    title: 'OpenToolsKit FAQ - Browser PDF Tools, Privacy, and Limits',
    description: 'Read practical answers about OpenToolsKit privacy, browser-side processing, supported PDF tasks, workflow limits, and open-source source availability.',
    primaryQuery: 'opentoolskit faq',
    secondaryQueries: ['browser pdf tools faq', 'pdf privacy faq', 'local pdf processing questions'],
  },
  privacy: {
    title: 'Privacy Policy - Browser-Side File Processing | OpenToolsKit',
    description: 'Review the OpenToolsKit privacy policy covering browser-side file handling, support paths, optional partner surfaces, and public AGPL source availability.',
    primaryQuery: 'browser side file processing privacy policy',
    secondaryQueries: ['opentoolskit privacy policy', 'local pdf processing privacy', 'pdf tools privacy'],
  },
  contact: {
    title: 'Contact and Support | OpenToolsKit',
    description: 'Contact OpenToolsKit for general support, privacy questions, bug reports, source review, and AGPL attribution details for the live service.',
    primaryQuery: 'opentoolskit support',
    secondaryQueries: ['opentoolskit contact', 'opentoolskit github', 'opentoolskit source code', 'agpl source availability'],
  },
};

export const CATEGORY_SEO: Record<ToolCategory, CategorySeoProfile> = {
  'organize-manage': {
    title: 'Organize PDF Pages - Merge, Split, Reorder, Extract | OpenToolsKit',
    h1: 'Organize PDF pages in your browser',
    description: 'Organize PDF pages in the browser with merge, split, reorder, extract, delete, rotate, booklet, and batch page-management tools.',
    primaryQuery: 'organize pdf pages',
    secondaryQueries: ['merge split reorder pdf', 'extract pdf pages', 'manage pdf pages'],
    intro: 'Use the organize and manage hub when the job is about page order, document grouping, extraction, or file structure rather than visual editing or security settings.',
    bestFor: [
      'Combining multiple PDFs into one final document.',
      'Splitting a large PDF into page ranges or separate files.',
      'Reordering, deleting, duplicating, or extracting pages before sending or archiving.',
    ],
    adjacentCategories: ['edit-annotate', 'optimize-repair'],
  },
  'edit-annotate': {
    title: 'Edit PDF Online - Annotate, Sign, Watermark, Fill Forms | OpenToolsKit',
    h1: 'Edit and annotate PDFs in your browser',
    description: 'Edit PDF pages in the browser with tools for annotations, signatures, watermarks, form filling, page numbering, headers, and visual cleanup.',
    primaryQuery: 'edit pdf online browser',
    secondaryQueries: ['annotate pdf in browser', 'sign and watermark pdf', 'fill pdf forms online without upload'],
    intro: 'Use the edit and annotate hub when you need to change how a PDF looks, reads, or behaves on the page itself.',
    bestFor: [
      'Adding signatures, comments, highlights, stamps, and form values.',
      'Adjusting page appearance with page numbers, headers, footers, or watermarks.',
      'Cleaning up annotations, colors, and visible page presentation before sharing.',
    ],
    adjacentCategories: ['organize-manage', 'secure-pdf'],
  },
  'convert-to-pdf': {
    title: 'Convert Files to PDF - Images, Text, Office, Ebook | OpenToolsKit',
    h1: 'Convert files to PDF in your browser',
    description: 'Convert images, text, JSON, ebooks, email, and supported document formats to PDF in a browser-first workflow with private local handling.',
    primaryQuery: 'convert files to pdf browser',
    secondaryQueries: ['image to pdf browser', 'text to pdf online private', 'office to pdf browser'],
    intro: 'Use the convert-to-PDF hub when the source file is not already a PDF and the goal is to create a shareable PDF output.',
    bestFor: [
      'Turning images, text files, and structured content into a PDF.',
      'Preparing PDFs from mixed source files before merging or annotating them.',
      'Converting supported document and ebook formats into a standard PDF output.',
    ],
    adjacentCategories: ['convert-from-pdf', 'organize-manage'],
  },
  'convert-from-pdf': {
    title: 'Convert PDF to Images, DOCX, Excel, JSON, Markdown | OpenToolsKit',
    h1: 'Convert PDF files into other formats',
    description: 'Convert PDF files into images, DOCX, PowerPoint, Excel, JSON, SVG, Markdown, and other practical export formats in the browser.',
    primaryQuery: 'convert pdf to other formats',
    secondaryQueries: ['pdf to image browser', 'pdf to docx browser', 'pdf export tools'],
    intro: 'Use the convert-from-PDF hub when the PDF is your source and you need reusable text, images, tables, or another output format.',
    bestFor: [
      'Exporting PDF pages as images for design, support tickets, or upload portals.',
      'Pulling document content into DOCX, Excel, JSON, or Markdown workflows.',
      'Extracting PDF data into a format that is easier to edit or process elsewhere.',
    ],
    adjacentCategories: ['convert-to-pdf', 'optimize-repair'],
  },
  'optimize-repair': {
    title: 'Compress, Repair, and Optimize PDF Files | OpenToolsKit',
    h1: 'Compress, repair, and optimize PDF files',
    description: 'Reduce PDF size, repair broken files, improve loading behavior, deskew scans, flatten layers, and clean metadata with browser-side optimization tools.',
    primaryQuery: 'optimize pdf file',
    secondaryQueries: ['compress pdf in browser', 'repair pdf file', 'reduce pdf size without upload'],
    intro: 'Use the optimize and repair hub when the problem is file size, loading behavior, printability, scanner cleanup, or a broken PDF rather than page content.',
    bestFor: [
      'Reducing PDF size for portals, email limits, or faster loading.',
      'Repairing damaged PDFs and cleaning files that refuse to open properly.',
      'Flattening, sanitizing, deskewing, or linearizing PDFs before delivery.',
    ],
    adjacentCategories: ['organize-manage', 'secure-pdf'],
  },
  'secure-pdf': {
    title: 'Secure PDF Files - Encrypt, Decrypt, Redact, Remove Metadata | OpenToolsKit',
    h1: 'Secure PDF files in your browser',
    description: 'Protect PDF files with browser-side security tools for encryption, permission changes, restriction removal, metadata cleanup, redaction, and signature checks.',
    primaryQuery: 'secure pdf files',
    secondaryQueries: ['encrypt pdf browser', 'remove pdf metadata', 'redact pdf browser'],
    intro: 'Use the secure PDF hub when the job involves permissions, privacy, access control, or hiding sensitive information before sharing a document.',
    bestFor: [
      'Encrypting PDFs or changing permissions before distribution.',
      'Removing metadata, sanitizing files, or checking digital signatures.',
      'Redacting or hiding sensitive information in client-side workflows.',
    ],
    adjacentCategories: ['edit-annotate', 'optimize-repair'],
  },
};

export const TOOL_SEO_OVERRIDES: Record<string, ToolSeoOverride> = {
  'merge-pdf': {
    primaryQuery: 'merge pdf files',
    secondaryQueries: ['combine pdf files', 'join pdf documents', 'merge pdf in browser'],
    pageTitle: 'Merge PDF Files - Combine Documents In Your Browser',
    h1: 'Merge PDF files in your browser',
    metaDescription: 'Combine multiple PDF files into one ordered document in your browser. Use OpenToolsKit to merge PDFs locally without sign-up or file uploads.',
    fastAnswer: 'Use Merge PDF when you need one combined PDF output from several source files while keeping page order under your control.',
    bestFor: [
      'Combining invoices, statements, or scanned sections into one final PDF.',
      'Merging supporting documents before sharing them with a portal or client.',
      'Reordering multiple PDFs into one final package without leaving the browser.',
    ],
    inputs: ['One or more PDF files.', 'Optional drag-and-drop reordering before export.'],
    outputs: ['A single merged PDF file.', 'Page order preserved from your chosen sequence.'],
    limitations: [
      'This tool does not split a PDF into parts. Use Split PDF when you need separate files.',
      'It will not edit text inside pages. Use Edit PDF for annotations or page-level visual changes.',
    ],
    examples: [
      { title: 'Combine monthly reports', input: 'January.pdf + February.pdf + March.pdf', output: 'Q1-report.pdf' },
      { title: 'Join scan batches', input: 'scan-1.pdf + scan-2.pdf', output: 'complete-scan.pdf' },
    ],
    comparisonToolIds: ['split-pdf', 'organize-pdf', 'pdf-multi-tool'],
  },
  'split-pdf': {
    primaryQuery: 'split pdf pages',
    secondaryQueries: ['extract pages from pdf', 'separate pdf pages', 'split pdf in browser'],
    pageTitle: 'Split PDF Pages - Separate A PDF Into Smaller Files',
    h1: 'Split PDF pages into separate files',
    metaDescription: 'Split a PDF into page ranges or separate files in your browser. Use OpenToolsKit to break large PDFs into smaller outputs without uploading them.',
    fastAnswer: 'Use Split PDF when one source document needs to become multiple smaller PDFs by page range or extracted selection.',
    bestFor: [
      'Breaking a large PDF into smaller files for upload limits or easier sharing.',
      'Extracting one chapter, section, or attachment from a longer document.',
      'Creating separate outputs from one scan or export package.',
    ],
    inputs: ['A single PDF file.', 'Page ranges or selected pages.'],
    outputs: ['One or more smaller PDF files.', 'Only the pages you selected.'],
    limitations: [
      'This tool does not merge multiple PDFs together. Use Merge PDF for that.',
      'It does not visually rearrange pages before saving. Use Organize PDF if page order must change first.',
    ],
    examples: [
      { title: 'Split by chapter', input: 'handbook.pdf, pages 1-20 and 21-45', output: 'chapter-1.pdf and chapter-2.pdf' },
      { title: 'Extract appendix', input: 'report.pdf, pages 33-40', output: 'appendix.pdf' },
    ],
    comparisonToolIds: ['extract-pages', 'organize-pdf', 'merge-pdf'],
  },
  'compress-pdf': {
    primaryQuery: 'compress pdf file',
    secondaryQueries: ['reduce pdf size', 'pdf too large for upload', 'shrink pdf in browser'],
    pageTitle: 'Compress PDF File - Reduce PDF Size For Uploads',
    h1: 'Compress a PDF file for upload limits',
    metaDescription: 'Reduce PDF size in your browser for upload portals, email limits, and faster sharing. Compress PDFs locally with OpenToolsKit without sign-up.',
    fastAnswer: 'Use Compress PDF when the main problem is file size and you need a smaller PDF that is easier to upload, email, or store.',
    bestFor: [
      'Reducing PDF size for government, school, or job portal upload limits.',
      'Shrinking scanned PDFs before email or messaging.',
      'Making large PDFs load faster on slower connections.',
    ],
    inputs: ['A PDF file that needs size reduction.', 'Optional compression preference depending on the tool flow.'],
    outputs: ['A smaller PDF file.', 'Optimized document assets where possible.'],
    limitations: [
      'Compression cannot guarantee an exact target size. Use a more specific upload-fix tool when exact KB control matters.',
      'This tool does not repair corruption. Use Repair PDF if the file is broken.',
    ],
    examples: [
      { title: 'Make a portal-friendly upload', input: 'portfolio.pdf at 18 MB', output: 'portfolio-compressed.pdf under the portal limit' },
      { title: 'Shrink a scanned handout', input: 'scan.pdf', output: 'scan-smaller.pdf' },
    ],
    comparisonToolIds: ['linearize-pdf', 'repair-pdf', 'sanitize-pdf'],
  },
  'pdf-multi-tool': {
    primaryQuery: 'pdf multi tool',
    secondaryQueries: ['all in one pdf tool', 'pdf editor and organizer', 'browser pdf workspace'],
    pageTitle: 'PDF Multi Tool - Merge, Split, Reorder, Rotate In One Workspace',
    h1: 'Use multiple PDF page actions in one workspace',
    metaDescription: 'Open one PDF workspace for merging, splitting, reordering, deleting, rotating, and extracting pages without switching tools.',
    fastAnswer: 'Use PDF Multi Tool when you need several page-management actions in one session instead of opening separate PDF tools one by one.',
    bestFor: [
      'Cleaning up a PDF package with several structural edits in one pass.',
      'Reordering, removing, extracting, and rotating pages before export.',
      'Reducing back-and-forth between single-purpose PDF tools.',
    ],
    inputs: ['One or more PDF files.', 'Page operations such as reorder, rotate, delete, duplicate, and extract.'],
    outputs: ['A cleaned, reorganized PDF export.', 'Page changes applied in one consolidated workflow.'],
    limitations: [
      'This workspace focuses on page structure, not deep text editing. Use Edit PDF for annotations or markup.',
      'It is broader than single-purpose tools, but not always the fastest choice for one simple action.',
    ],
    examples: [
      { title: 'Prepare a submission pack', input: 'several supporting PDFs', output: 'one ordered final PDF' },
      { title: 'Tidy a scan set', input: 'scanned-pages.pdf', output: 'rotated, reordered, cleaned-up version' },
    ],
    comparisonToolIds: ['merge-pdf', 'split-pdf', 'organize-pdf'],
  },
  'organize-pdf': {
    primaryQuery: 'organize pdf pages',
    secondaryQueries: ['reorder pdf pages', 'delete pdf pages', 'arrange pdf pages'],
    pageTitle: 'Organize PDF Pages - Reorder, Delete, Duplicate, Rotate',
    h1: 'Organize PDF pages before you export',
    metaDescription: 'Reorder, duplicate, rotate, and delete PDF pages in your browser. Use OpenToolsKit to organize a PDF before saving the cleaned output.',
    fastAnswer: 'Use Organize PDF when the file already exists but the page order or page selection needs to change before export.',
    bestFor: [
      'Reordering a PDF into the sequence a portal or recipient expects.',
      'Removing unnecessary pages from a longer document.',
      'Duplicating or rotating pages before sharing or printing.',
    ],
    inputs: ['A single PDF file.', 'Page actions such as reorder, delete, duplicate, or rotate.'],
    outputs: ['A reorganized PDF file.', 'Only the pages and order you keep.'],
    limitations: [
      'It does not create separate outputs by page range. Use Split PDF for multiple files.',
      'It does not merge multiple inputs into one file. Use Merge PDF for that flow.',
    ],
    examples: [
      { title: 'Fix submission order', input: 'appendices-first.pdf', output: 'main-document-first.pdf' },
      { title: 'Remove blank or duplicate pages', input: 'scanner-output.pdf', output: 'cleaned-scanner-output.pdf' },
    ],
    comparisonToolIds: ['merge-pdf', 'split-pdf', 'delete-pages'],
  },
  'edit-pdf': {
    primaryQuery: 'edit pdf in browser',
    secondaryQueries: ['annotate pdf online', 'add notes to pdf', 'mark up pdf locally'],
    pageTitle: 'Edit PDF In Browser - Annotate, Highlight, Comment',
    h1: 'Edit and annotate a PDF in your browser',
    metaDescription: 'Annotate, highlight, comment, draw, and mark up PDFs in your browser. Use OpenToolsKit for local PDF editing without sending files away.',
    fastAnswer: 'Use Edit PDF when you need to change the visible page content with comments, highlights, notes, shapes, or simple markup.',
    bestFor: [
      'Reviewing drafts, contracts, and proofs with annotations.',
      'Highlighting passages or adding notes to a shared PDF.',
      'Making quick visual markups before re-exporting the file.',
    ],
    inputs: ['A PDF file.', 'Annotation actions like highlight, text, shapes, comments, or redaction markup.'],
    outputs: ['An edited PDF file.', 'Visible annotations preserved in the exported output.'],
    limitations: [
      'It is not a page-structure workspace. Use Organize PDF if the job is reordering, splitting, or deleting pages.',
      'For signatures specifically, Sign PDF is usually faster than general editing.',
    ],
    examples: [
      { title: 'Mark up a contract draft', input: 'agreement.pdf', output: 'agreement-reviewed.pdf' },
      { title: 'Review a design proof', input: 'proof.pdf', output: 'proof-with-comments.pdf' },
    ],
    comparisonToolIds: ['sign-pdf', 'form-filler', 'organize-pdf'],
  },
  'sign-pdf': {
    primaryQuery: 'sign pdf in browser',
    secondaryQueries: ['add signature to pdf', 'draw signature on pdf', 'pdf signature tool'],
    pageTitle: 'Sign PDF In Browser - Draw, Type, Or Upload A Signature',
    h1: 'Sign a PDF in your browser',
    metaDescription: 'Add a signature to a PDF by drawing, typing, or uploading it in your browser. Use OpenToolsKit for local PDF signing without sign-up.',
    fastAnswer: 'Use Sign PDF when the job is to place one or more signatures on a PDF quickly without opening a broader editing workflow.',
    bestFor: [
      'Signing forms, approvals, and consent PDFs quickly.',
      'Placing a reusable signature image onto one or more pages.',
      'Adding signatures without uploading the document to a server.',
    ],
    inputs: ['A PDF file.', 'A drawn, typed, or uploaded signature.'],
    outputs: ['A signed PDF file.', 'Signature placement on the pages you choose.'],
    limitations: [
      'This is for visible signatures, not certificate-based digital signing. Use Digital Sign PDF for cryptographic signing.',
      'For broader comments or page edits, use Edit PDF instead.',
    ],
    examples: [
      { title: 'Sign a rental form', input: 'rental-form.pdf', output: 'rental-form-signed.pdf' },
      { title: 'Approve an internal memo', input: 'approval.pdf', output: 'approval-signed.pdf' },
    ],
    comparisonToolIds: ['edit-pdf', 'digital-sign-pdf', 'form-filler'],
  },
  'jpg-to-pdf': {
    primaryQuery: 'jpg to pdf',
    secondaryQueries: ['convert jpg to pdf', 'images to pdf', 'photo to pdf in browser'],
    pageTitle: 'JPG To PDF - Convert Photos To A PDF In Browser',
    h1: 'Convert JPG images to a PDF',
    metaDescription: 'Convert JPG images into a PDF in your browser. Turn photos or scanned image pages into one shareable PDF without sign-up or upload.',
    fastAnswer: 'Use JPG to PDF when your source is one or more JPEG images and the output needs to be a single PDF document.',
    bestFor: [
      'Turning camera photos or scanned JPG pages into a PDF submission.',
      'Combining receipts, forms, or image evidence into a single PDF file.',
      'Preparing a PDF from photos before merging or signing it.',
    ],
    inputs: ['One or more JPG or JPEG images.', 'Optional page order arrangement.'],
    outputs: ['A PDF created from your images.', 'Pages generated from each source image.'],
    limitations: [
      'This tool does not extract images from a PDF. Use PDF to JPG for that direction.',
      'If you have mixed image formats, Image to PDF may be a better fit.',
    ],
    examples: [
      { title: 'Convert phone photos of receipts', input: 'receipt-1.jpg + receipt-2.jpg', output: 'receipts.pdf' },
      { title: 'Prepare a document scan', input: 'page-1.jpg + page-2.jpg', output: 'scan.pdf' },
    ],
    comparisonToolIds: ['image-to-pdf', 'png-to-pdf', 'pdf-to-jpg'],
  },
  'image-to-pdf': {
    primaryQuery: 'image to pdf',
    secondaryQueries: ['convert images to pdf', 'photo to pdf browser', 'multiple images to pdf'],
    pageTitle: 'Image To PDF - Convert Photos And Graphics To PDF',
    h1: 'Convert images to a PDF in your browser',
    metaDescription: 'Convert image files into a PDF in your browser. Use OpenToolsKit to combine photos and graphics into one PDF output without upload.',
    fastAnswer: 'Use Image to PDF when the input may include different image formats and you want one PDF output without leaving the browser.',
    bestFor: [
      'Building a PDF from screenshots, exports, scans, or mixed image inputs.',
      'Preparing supporting image evidence as a single PDF.',
      'Creating a PDF from visual assets before further editing or merging.',
    ],
    inputs: ['Supported image files such as JPG, PNG, WebP, BMP, TIFF, SVG, or HEIC depending on the route.'],
    outputs: ['A PDF created from the selected images.', 'Page order based on your chosen sequence.'],
    limitations: [
      'This tool does not optimize an existing PDF. Use Compress PDF if the file is already a PDF and too large.',
      'If you only have JPG files, the JPG to PDF route is more specific for that exact job.',
    ],
    examples: [
      { title: 'Combine screenshots into one file', input: 'three screenshots', output: 'screenshots.pdf' },
      { title: 'Create a proof deck', input: 'design-export.png files', output: 'design-proof.pdf' },
    ],
    comparisonToolIds: ['jpg-to-pdf', 'png-to-pdf', 'merge-pdf'],
  },
  'pdf-to-jpg': {
    primaryQuery: 'pdf to jpg',
    secondaryQueries: ['convert pdf to image', 'extract pdf pages as jpg', 'pdf page to jpg'],
    pageTitle: 'PDF To JPG - Export PDF Pages As Images',
    h1: 'Convert PDF pages to JPG images',
    metaDescription: 'Export PDF pages as JPG images in your browser. Convert a PDF into image files for uploads, previews, or reuse in other tools.',
    fastAnswer: 'Use PDF to JPG when the PDF is the source and you need image outputs for upload forms, previews, or separate image editing.',
    bestFor: [
      'Turning PDF pages into image files for portals that do not accept PDFs.',
      'Creating JPG previews of document pages.',
      'Extracting page visuals for reuse in slides, tickets, or support messages.',
    ],
    inputs: ['A PDF file.', 'Optional page selection depending on the tool flow.'],
    outputs: ['JPG files for the selected or exported pages.', 'Image-based page outputs suitable for upload or editing.'],
    limitations: [
      'This tool exports images; it does not preserve editable document structure. Use PDF to DOCX or PDF to Markdown for content reuse.',
      'If you need SVG vector output, use PDF to SVG instead.',
    ],
    examples: [
      { title: 'Upload a PDF page to an image-only form', input: 'document.pdf', output: 'document-page-1.jpg' },
      { title: 'Create preview images', input: 'brochure.pdf', output: 'brochure-page-images.jpg' },
    ],
    comparisonToolIds: ['pdf-to-png', 'pdf-to-svg', 'jpg-to-pdf'],
  },
  'pdf-to-docx': {
    primaryQuery: 'pdf to docx',
    secondaryQueries: ['convert pdf to word', 'pdf to editable document', 'pdf to docx browser'],
    pageTitle: 'PDF To DOCX - Convert A PDF Into An Editable Word File',
    h1: 'Convert a PDF into DOCX',
    metaDescription: 'Convert a PDF into DOCX in your browser when you need editable document output. Export PDF content into a Word-friendly file with OpenToolsKit.',
    fastAnswer: 'Use PDF to DOCX when the goal is to reuse PDF text in an editable Word-style document rather than as images or page snapshots.',
    bestFor: [
      'Reworking an existing PDF in a Word processing workflow.',
      'Extracting text content into a more editable document format.',
      'Starting from a PDF when collaborative editing needs DOCX output.',
    ],
    inputs: ['A PDF file.'],
    outputs: ['A DOCX file for downstream editing.', 'Document content extracted into a Word-compatible format.'],
    limitations: [
      'Complex layouts can still need cleanup after conversion.',
      'If you only need page images, PDF to JPG or PDF to PNG is the better fit.',
    ],
    examples: [
      { title: 'Revise a brochure copy deck', input: 'brochure.pdf', output: 'brochure.docx' },
      { title: 'Recover editable text', input: 'proposal.pdf', output: 'proposal.docx' },
    ],
    comparisonToolIds: ['pdf-to-markdown', 'ocr-pdf', 'pdf-to-json'],
  },
  'ocr-pdf': {
    primaryQuery: 'ocr pdf',
    secondaryQueries: ['searchable pdf from scan', 'extract text from scanned pdf', 'recognize text in pdf'],
    pageTitle: 'OCR PDF - Recognize Text In A Scanned PDF',
    h1: 'Run OCR on a scanned PDF',
    metaDescription: 'Recognize text in a scanned PDF and make document content searchable in your browser. Use OCR PDF when a PDF is image-based instead of selectable text.',
    fastAnswer: 'Use OCR PDF when the file is a scan or image-based PDF and you need searchable or extractable text from it.',
    bestFor: [
      'Making scanned PDFs searchable before archiving or review.',
      'Recovering text from photographed or scanned document pages.',
      'Preparing a scan for export into other formats after recognition.',
    ],
    inputs: ['A scanned or image-based PDF file.'],
    outputs: ['A PDF or text-ready result with recognized content, depending on the specific flow.'],
    limitations: [
      'Poor scan quality, handwriting, or unusual layouts can reduce OCR accuracy.',
      'If the PDF already contains selectable text, OCR may be unnecessary.',
    ],
    examples: [
      { title: 'Make an old scan searchable', input: 'archive-scan.pdf', output: 'archive-scan-searchable.pdf' },
      { title: 'Recover text from a photographed form', input: 'phone-scan.pdf', output: 'recognized-text-ready result' },
    ],
    comparisonToolIds: ['pdf-to-docx', 'pdf-to-markdown', 'repair-pdf'],
  },
  'encrypt-pdf': {
    primaryQuery: 'encrypt pdf',
    secondaryQueries: ['password protect pdf', 'secure pdf with password', 'pdf encryption browser'],
    pageTitle: 'Encrypt PDF - Password Protect A PDF In Browser',
    h1: 'Encrypt a PDF with password protection',
    metaDescription: 'Password protect a PDF in your browser with OpenToolsKit. Use Encrypt PDF when a file needs controlled access before sharing or storage.',
    fastAnswer: 'Use Encrypt PDF when the file should require a password before someone can open it or when you need stronger access control for sharing.',
    bestFor: [
      'Sending sensitive PDFs with password protection.',
      'Restricting access to a personal, legal, or financial document.',
      'Adding document security before archive or transfer.',
    ],
    inputs: ['A PDF file.', 'A password or access setting.'],
    outputs: ['An encrypted PDF file.', 'Password-protected access for the output PDF.'],
    limitations: [
      'This tool secures access, but it does not redact visible content. Use Find and Redact for hidden information removal.',
      'If the PDF already has restrictions you need to remove, use Remove Restrictions instead.',
    ],
    examples: [
      { title: 'Protect a contract copy', input: 'contract.pdf', output: 'contract-protected.pdf' },
      { title: 'Share a secure statement', input: 'statement.pdf', output: 'statement-encrypted.pdf' },
    ],
    comparisonToolIds: ['decrypt-pdf', 'change-permissions', 'find-and-redact'],
  },
  'remove-metadata': {
    primaryQuery: 'remove pdf metadata',
    secondaryQueries: ['clean pdf metadata', 'strip document metadata', 'pdf privacy cleanup'],
    pageTitle: 'Remove PDF Metadata - Clean Document Metadata Before Sharing',
    h1: 'Remove PDF metadata before sharing',
    metaDescription: 'Strip PDF metadata in your browser before sending or publishing a document. Use OpenToolsKit to remove identifying document metadata locally.',
    fastAnswer: 'Use Remove Metadata when the visible content is fine but the hidden document properties should be cleaned before sharing.',
    bestFor: [
      'Cleaning author, producer, or document property data before publishing.',
      'Reducing hidden identifying details in client or legal document workflows.',
      'Preparing a PDF for privacy-sensitive distribution.',
    ],
    inputs: ['A PDF file with embedded document properties.'],
    outputs: ['A cleaned PDF with metadata removed or minimized.'],
    limitations: [
      'This tool does not redact visible text or images. Use Find and Redact for that.',
      'It is focused on metadata privacy, not password security. Use Encrypt PDF for access protection.',
    ],
    examples: [
      { title: 'Clean a CV before sending', input: 'cv.pdf', output: 'cv-clean.pdf' },
      { title: 'Remove source metadata from a report', input: 'report.pdf', output: 'report-sanitized.pdf' },
    ],
    comparisonToolIds: ['sanitize-pdf', 'find-and-redact', 'encrypt-pdf'],
  },
  'find-and-redact': {
    primaryQuery: 'redact pdf',
    secondaryQueries: ['remove sensitive text from pdf', 'pdf redaction tool', 'find and redact pdf'],
    pageTitle: 'Redact PDF - Find And Remove Sensitive PDF Content',
    h1: 'Find and redact sensitive content in a PDF',
    metaDescription: 'Find and redact sensitive content in a PDF in your browser. Use OpenToolsKit to hide visible information before sharing a document.',
    fastAnswer: 'Use Find and Redact when sensitive visible content must be hidden from the document before the PDF is shared or published.',
    bestFor: [
      'Removing names, account numbers, addresses, or other visible sensitive information.',
      'Preparing disclosures, legal exhibits, or client documents for safer sharing.',
      'Cleaning a PDF before publishing or external review.',
    ],
    inputs: ['A PDF file.', 'Search terms or manually selected sensitive content.'],
    outputs: ['A redacted PDF file.', 'Sensitive visible content hidden in the export.'],
    limitations: [
      'This tool focuses on visible content. Use Remove Metadata to clean hidden document properties.',
      'If the goal is only password protection, Encrypt PDF is the better fit.',
    ],
    examples: [
      { title: 'Redact personal identifiers', input: 'case-file.pdf', output: 'case-file-redacted.pdf' },
      { title: 'Hide pricing details', input: 'proposal.pdf', output: 'proposal-redacted.pdf' },
    ],
    comparisonToolIds: ['remove-metadata', 'sanitize-pdf', 'encrypt-pdf'],
  },
  'repair-pdf': {
    primaryQuery: 'repair pdf file',
    secondaryQueries: ['fix broken pdf', 'corrupt pdf repair', 'pdf wont open fix'],
    pageTitle: 'Repair PDF File - Fix Broken Or Corrupt PDFs',
    h1: 'Repair a broken or corrupt PDF',
    metaDescription: 'Repair a broken or corrupt PDF in your browser when a file will not open or behaves incorrectly. Use OpenToolsKit to recover a healthier PDF output.',
    fastAnswer: 'Use Repair PDF when the document is damaged, fails to open, or behaves incorrectly before you try editing, compression, or conversion.',
    bestFor: [
      'Recovering a PDF that will not open reliably.',
      'Fixing malformed PDFs before converting, compressing, or sharing them.',
      'Creating a healthier output from a damaged source document.',
    ],
    inputs: ['A broken, malformed, or problematic PDF file.'],
    outputs: ['A repaired PDF output when recovery succeeds.'],
    limitations: [
      'Repair cannot guarantee recovery of every corrupt file.',
      'If the file opens fine but is only too large, use Compress PDF instead.',
    ],
    examples: [
      { title: 'Recover a damaged download', input: 'invoice.pdf that fails to open', output: 'invoice-repaired.pdf' },
      { title: 'Fix a malformed scan export', input: 'scanner-output.pdf', output: 'scanner-output-repaired.pdf' },
    ],
    comparisonToolIds: ['compress-pdf', 'sanitize-pdf', 'linearize-pdf'],
  },
  'delete-pages': {
    primaryQuery: 'delete pdf pages',
    secondaryQueries: ['remove pages from pdf', 'delete pages from pdf online', 'trim pdf pages'],
    pageTitle: 'Delete PDF Pages - Remove Unwanted Pages Before Export',
    h1: 'Delete pages from a PDF in your browser',
    metaDescription: 'Remove unwanted pages from a PDF in your browser before saving the final file. Use OpenToolsKit to delete PDF pages locally without upload.',
    fastAnswer: 'Use Delete Pages when the source PDF is mostly correct but some pages need to be removed before sharing, printing, or uploading.',
    bestFor: [
      'Removing blank scanner pages, duplicate sheets, or outdated appendices.',
      'Trimming a submission PDF down to only the pages a portal accepts.',
      'Cleaning a long PDF before sending it to a client or reviewer.',
    ],
    inputs: ['A single PDF file.', 'Page thumbnails or ranges for the pages you want to remove.'],
    outputs: ['A cleaned PDF file without the pages you removed.', 'The remaining page order preserved in the final export.'],
    limitations: [
      'This tool removes pages but does not create separate extracted outputs. Use Extract Pages when the removed pages need their own file.',
      'If several page changes are needed together, Organize PDF or PDF Multi Tool is usually a better fit.',
    ],
    examples: [
      { title: 'Remove scanner blanks', input: 'scan-pack.pdf with blank pages', output: 'scan-pack-clean.pdf' },
      { title: 'Trim a tender pack', input: 'submission.pdf with extra appendices', output: 'submission-final.pdf' },
    ],
    comparisonToolIds: ['extract-pages', 'organize-pdf', 'split-pdf'],
  },
  'extract-pages': {
    primaryQuery: 'extract pages from pdf',
    secondaryQueries: ['save selected pdf pages', 'extract pdf pages into new file', 'pull pages from pdf'],
    pageTitle: 'Extract Pages From PDF - Save Selected Pages As New Files',
    h1: 'Extract selected pages from a PDF',
    metaDescription: 'Extract selected pages from a PDF in your browser and save them as new files. Use OpenToolsKit when only part of a document needs to move forward.',
    fastAnswer: 'Use Extract Pages when a few pages from a larger PDF need to become their own output without changing the rest of the source file.',
    bestFor: [
      'Pulling out one contract section, appendix, or signed page from a longer PDF.',
      'Creating smaller upload-ready files from a large source document.',
      'Saving selected pages for review while leaving the original PDF untouched.',
    ],
    inputs: ['A single PDF file.', 'Specific pages or ranges to extract.'],
    outputs: ['One or more new PDF files containing only the selected pages.', 'The extracted pages preserved in their original page quality.'],
    limitations: [
      'This tool keeps selected pages; it does not simply remove pages from the original output. Use Delete Pages for pure trimming.',
      'If page order also needs to change, Organize PDF is the better workflow before extraction.',
    ],
    examples: [
      { title: 'Pull out a signature page', input: 'agreement.pdf, page 7', output: 'agreement-signature-page.pdf' },
      { title: 'Save an appendix only', input: 'report.pdf, pages 33-42', output: 'report-appendix.pdf' },
    ],
    comparisonToolIds: ['split-pdf', 'delete-pages', 'organize-pdf'],
  },
  'add-watermark': {
    primaryQuery: 'add watermark to pdf',
    secondaryQueries: ['watermark pdf in browser', 'add text watermark pdf', 'add image watermark pdf'],
    pageTitle: 'Add Watermark To PDF - Place Text Or Image Watermarks',
    h1: 'Add a watermark to a PDF in your browser',
    metaDescription: 'Add text or image watermarks to a PDF in your browser. Use OpenToolsKit to mark drafts, confidential files, or branded documents locally.',
    fastAnswer: 'Use Add Watermark when a PDF needs visible text or image branding such as Draft, Confidential, Approved, or a company mark.',
    bestFor: [
      'Stamping internal drafts, review copies, or confidential documents.',
      'Adding company branding to PDFs before distribution.',
      'Applying repeatable visible markings without leaving the browser.',
    ],
    inputs: ['A PDF file.', 'Custom watermark text or an image, plus placement and opacity settings.'],
    outputs: ['A PDF with visible watermarks applied to the pages you choose.', 'Branded or status-marked output ready for sharing.'],
    limitations: [
      'Watermarks are visible page content, not access control. Use Encrypt PDF or Change Permissions for security settings.',
      'If you only need page numbers or headers, those dedicated tools are usually simpler than a watermark workflow.',
    ],
    examples: [
      { title: 'Mark a review copy', input: 'proposal.pdf with Draft text watermark', output: 'proposal-draft.pdf' },
      { title: 'Brand a report', input: 'report.pdf with company logo watermark', output: 'report-branded.pdf' },
    ],
    comparisonToolIds: ['page-numbers', 'header-footer', 'add-stamps'],
  },
  'form-filler': {
    primaryQuery: 'fill pdf form online',
    secondaryQueries: ['fill pdf form in browser', 'complete pdf form without printing', 'type into pdf form'],
    pageTitle: 'Fill PDF Form Online - Complete A PDF Form In Your Browser',
    h1: 'Fill a PDF form in your browser',
    metaDescription: 'Fill a PDF form in your browser without printing or scanning. Use OpenToolsKit to type into interactive PDF forms and export the completed file locally.',
    fastAnswer: 'Use Form Filler when a PDF already contains interactive fields and the job is to complete the form cleanly before saving or signing it.',
    bestFor: [
      'Completing application, onboarding, and registration PDFs without printing.',
      'Typing into interactive forms before saving or sharing the finished file.',
      'Preparing a form for a follow-up signature or flattening step.',
    ],
    inputs: ['An interactive PDF form.', 'Form values typed or selected in the available fields.'],
    outputs: ['A completed PDF form.', 'Field values saved into the exported output.'],
    limitations: [
      'This tool fills existing form fields but does not build new forms. Use Form Creator if the PDF needs fields added first.',
      'For a simple handwritten signature without broader form entry, Sign PDF is usually the faster route.',
    ],
    examples: [
      { title: 'Complete a membership form', input: 'membership-form.pdf', output: 'membership-form-completed.pdf' },
      { title: 'Finish a school application', input: 'application.pdf with form fields', output: 'application-complete.pdf' },
    ],
    comparisonToolIds: ['sign-pdf', 'form-creator', 'flatten-pdf'],
  },
  'pdf-to-png': {
    primaryQuery: 'pdf to png',
    secondaryQueries: ['convert pdf to png', 'save pdf page as png', 'pdf page to transparent image'],
    pageTitle: 'PDF To PNG - Export PDF Pages As PNG Images',
    h1: 'Convert PDF pages to PNG images',
    metaDescription: 'Export PDF pages as PNG images in your browser. Use OpenToolsKit when a PDF page needs image output with cleaner quality or transparency handling.',
    fastAnswer: 'Use PDF to PNG when the source is a PDF and the next step needs lossless image output for upload, design, or support workflows.',
    bestFor: [
      'Creating clean image exports of document pages for upload portals or tickets.',
      'Saving charts, diagrams, or proofs from a PDF as reusable images.',
      'Exporting page previews where PNG quality matters more than JPG compression.',
    ],
    inputs: ['A PDF file.', 'Selected pages or all pages for export.'],
    outputs: ['PNG files for the chosen PDF pages.', 'Lossless image outputs ready for upload or editing.'],
    limitations: [
      'PNG exports are often larger than JPG exports. Use PDF to JPG if smaller image files matter more than lossless quality.',
      'This route creates images only; it does not produce editable text or document output.',
    ],
    examples: [
      { title: 'Export a product sheet image', input: 'datasheet.pdf', output: 'datasheet-page-1.png' },
      { title: 'Save a chart for slides', input: 'analysis.pdf', output: 'analysis-chart-page.png' },
    ],
    comparisonToolIds: ['pdf-to-jpg', 'pdf-to-svg', 'jpg-to-pdf'],
  },
  'pdf-to-excel': {
    primaryQuery: 'pdf to excel',
    secondaryQueries: ['extract pdf table to excel', 'convert pdf tables to xlsx', 'pdf spreadsheet export'],
    pageTitle: 'PDF To Excel - Extract Tables Into A Spreadsheet',
    h1: 'Convert PDF tables to Excel',
    metaDescription: 'Convert PDF tables to Excel in your browser when you need spreadsheet-ready output. Use OpenToolsKit to move PDF table data into editable worksheets.',
    fastAnswer: 'Use PDF to Excel when the real job is table extraction and the destination needs to be an editable spreadsheet rather than a document or image.',
    bestFor: [
      'Moving invoice, statement, or report tables into spreadsheet workflows.',
      'Extracting structured rows and columns from a PDF for analysis.',
      'Starting from a PDF when the next step is filtering or editing data in Excel.',
    ],
    inputs: ['A PDF file with structured tables or repeated tabular data.'],
    outputs: ['An Excel-compatible spreadsheet output.', 'Table data prepared for sorting, filtering, and editing.'],
    limitations: [
      'Messy scans or irregular layouts may still need cleanup after export. Use OCR PDF first if the source is image-based.',
      'If you need raw structured output rather than a spreadsheet, PDF to JSON or Extract Tables may be more precise.',
    ],
    examples: [
      { title: 'Extract a statement table', input: 'statement.pdf', output: 'statement.xlsx' },
      { title: 'Move a report appendix into sheets', input: 'appendix.pdf', output: 'appendix-tables.xlsx' },
    ],
    comparisonToolIds: ['extract-tables', 'pdf-to-json', 'ocr-pdf'],
  },
  'decrypt-pdf': {
    primaryQuery: 'decrypt pdf',
    secondaryQueries: ['remove password from pdf', 'unlock pdf in browser', 'open protected pdf'],
    pageTitle: 'Decrypt PDF - Remove A PDF Password In Your Browser',
    h1: 'Decrypt a PDF and remove its password',
    metaDescription: 'Remove a PDF password in your browser when you already have permission to unlock the file. Use OpenToolsKit to decrypt PDFs locally before editing or sharing.',
    fastAnswer: 'Use Decrypt PDF when a protected file needs its password removed so it can move into editing, conversion, or upload workflows.',
    bestFor: [
      'Unlocking a PDF you already have permission to use before editing it.',
      'Removing a password from an internal file to simplify repeated access.',
      'Preparing a protected PDF for other browser-side tools that need an unlocked input.',
    ],
    inputs: ['A password-protected PDF file.', 'The correct password to unlock it.'],
    outputs: ['A decrypted PDF file without the opening password requirement.', 'An output ready for follow-up editing, conversion, or sharing.'],
    limitations: [
      'This tool is for files you are authorized to unlock. It does not bypass permissions without valid access.',
      'If the goal is only changing permissions rather than removing the opening password, Change Permissions or Remove Restrictions may be more appropriate.',
    ],
    examples: [
      { title: 'Unlock a client pack for editing', input: 'client-pack.pdf plus password', output: 'client-pack-unlocked.pdf' },
      { title: 'Remove a personal archive password', input: 'statement.pdf plus password', output: 'statement-unlocked.pdf' },
    ],
    comparisonToolIds: ['encrypt-pdf', 'remove-restrictions', 'change-permissions'],
  },
  'digital-sign-pdf': {
    primaryQuery: 'digitally sign pdf',
    secondaryQueries: ['certificate sign pdf', 'x509 pdf signature', 'sign pdf with certificate'],
    pageTitle: 'Digitally Sign PDF - Sign A PDF With A Certificate',
    h1: 'Digitally sign a PDF with a certificate',
    metaDescription: 'Digitally sign a PDF in your browser with a certificate-based signature. Use OpenToolsKit when a visible signature is not enough and document integrity matters.',
    fastAnswer: 'Use Digital Sign PDF when the signature needs certificate-backed validation and document integrity checking rather than a simple visible mark on the page.',
    bestFor: [
      'Signing contracts, declarations, or regulated files that need certificate-based validation.',
      'Applying a stronger signature workflow than a drawn or typed signature alone.',
      'Preparing PDFs for downstream signature validation and integrity checks.',
    ],
    inputs: ['A PDF file.', 'A supported certificate source such as PFX, P12, or PEM depending on the workflow.'],
    outputs: ['A digitally signed PDF file.', 'A signature that can be checked for integrity and certificate details.'],
    limitations: [
      'This route is different from adding a visible handwritten signature. Use Sign PDF for a quick visual signature workflow.',
      'Validation of trust chains can still depend on the certificate environment used by the recipient.',
    ],
    examples: [
      { title: 'Sign a regulated filing', input: 'filing.pdf plus certificate', output: 'filing-signed.pdf' },
      { title: 'Apply a certificate signature to a contract', input: 'contract.pdf plus P12 certificate', output: 'contract-digitally-signed.pdf' },
    ],
    comparisonToolIds: ['sign-pdf', 'validate-signature', 'encrypt-pdf'],
  },
};

export function getStaticPageSeo(page: StaticPageKey): StaticPageSeo {
  return STATIC_PAGE_SEO[page];
}

export function getCategorySeo(category: ToolCategory): CategorySeoProfile {
  return CATEGORY_SEO[category];
}
