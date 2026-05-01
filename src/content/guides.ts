export interface GuideSection {
  heading: string;
  body: string[];
  steps?: string[];
}

export interface GuideRelatedTool {
  toolId: string;
  reason: string;
}

export interface GuideContent {
  slug: string;
  title: string;
  description: string;
  summary: string;
  updatedAt: string;
  sections: GuideSection[];
  relatedTools: GuideRelatedTool[];
}

export const guides: GuideContent[] = [
  {
    slug: 'how-to-merge-pdf-files',
    title: 'How to merge PDF files without losing page order',
    description:
      'A practical guide to combining PDF files, checking page order, and avoiding common merge mistakes before sharing a final document.',
    summary:
      'Merging PDFs is usually simple, but the final file is only useful if the page order, duplicate pages, and attachments are checked before export.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'merge-pdf', reason: 'Combine several source PDFs into one ordered output.' },
      { toolId: 'organize-pdf', reason: 'Reorder or remove pages before saving the final package.' },
      { toolId: 'split-pdf', reason: 'Separate a large PDF first if only part of it belongs in the merge.' },
    ],
    sections: [
      {
        heading: 'Before you start',
        body: [
          'Collect the exact files that should appear in the final PDF and give them clear names. If the same document appears twice with different names, open both copies before merging so you do not include the wrong version.',
          'Decide whether the final PDF should follow chronological order, form order, or the order requested by a portal or recipient. Merge tools preserve the sequence you choose, so the ordering step matters.',
        ],
      },
      {
        heading: 'Merge workflow',
        body: [
          'Add the PDFs, drag them into the intended sequence, and export one combined file. After export, open the result and scan the first page of each section.',
          'If the source files have different page sizes or orientations, the merged output can still be valid, but it may look uneven in print preview. Check that before sending formal documents.',
        ],
        steps: [
          'Upload or select the PDF files you are allowed to process.',
          'Arrange the files in the exact order the final document should use.',
          'Merge and download the combined PDF.',
          'Open the result and verify page count, section order, and readability.',
        ],
      },
      {
        heading: 'Common mistakes',
        body: [
          'Do not merge a signed or finalized copy with an older draft unless the recipient expects both. File names such as final-v2.pdf can be misleading after several rounds of edits.',
          'Avoid using a merge tool when the real job is extraction. If you only need pages 3 to 8 from a large file, extract or split first, then merge the selected pages.',
        ],
      },
      {
        heading: 'Privacy and review',
        body: [
          'OpenToolsKit is designed around browser-side document handling where applicable. Even with local processing, you should still review the downloaded PDF before forwarding it because page order mistakes are easy to miss.',
          'For confidential packets, consider removing metadata, redacting visible sensitive details, or encrypting the finished file as separate checks after merging.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-compress-a-pdf-without-losing-readability',
    title: 'How to compress a PDF without losing readability',
    description:
      'Learn how PDF compression works, when quality tradeoffs matter, and what to check before uploading or emailing a smaller file.',
    summary:
      'Compression should make a PDF easier to upload or share without making text, scans, signatures, or diagrams hard to read.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'compress-pdf', reason: 'Reduce file size for upload limits or email attachments.' },
      { toolId: 'repair-pdf', reason: 'Try repair first if the PDF is malformed or fails to open.' },
      { toolId: 'remove-metadata', reason: 'Clean hidden document properties before sharing a final copy.' },
    ],
    sections: [
      {
        heading: 'What compression can and cannot do',
        body: [
          'PDF compression usually reduces image size, removes redundant data, and rewrites parts of the document. It cannot always hit an exact file-size target because each PDF stores images, fonts, and page objects differently.',
          'Image-heavy scans usually shrink more than text-heavy PDFs. A PDF that is already optimized may only get slightly smaller, and forcing stronger compression can make pages look worse.',
        ],
      },
      {
        heading: 'Safe compression checklist',
        body: [
          'Start with the least aggressive setting that gets near your file-size target. Open the compressed result and zoom into signatures, small text, charts, and scanned stamps.',
          'If a portal rejects the file by only a small margin, try compression first. If it still fails, remove unnecessary pages, split the file, or export images at a more appropriate resolution before rebuilding the PDF.',
        ],
        steps: [
          'Check the upload or email size limit before compressing.',
          'Compress the file and compare the output size.',
          'Open the compressed PDF and inspect detailed pages at normal and zoomed sizes.',
          'Keep the original file until the compressed copy has been accepted.',
        ],
      },
      {
        heading: 'When not to over-compress',
        body: [
          'Avoid heavy compression for legal exhibits, design proofs, medical records, scanned IDs, or any document where a reviewer must inspect fine detail.',
          'If a PDF must be printed, check the print preview after compression. A file that looks acceptable on a phone can still produce weak printed output.',
        ],
      },
      {
        heading: 'Privacy and limits',
        body: [
          'Browser-side compression keeps the workflow local where applicable, but it still depends on your device memory and browser limits. Very large or damaged files may need repair or splitting before compression.',
          'Compression does not remove visible sensitive content and should not be treated as a privacy tool by itself.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-convert-jpg-to-pdf',
    title: 'How to convert JPG images to one PDF',
    description:
      'Turn photos, receipts, and scanned JPG pages into a clean PDF while keeping image order, page size, and readability under control.',
    summary:
      'JPG to PDF conversion is most useful when several images need to become a single document for upload, review, or archiving.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'jpg-to-pdf', reason: 'Create one PDF from JPG or JPEG images.' },
      { toolId: 'image-to-pdf', reason: 'Use mixed image formats in one conversion workflow.' },
      { toolId: 'compress-pdf', reason: 'Reduce the final PDF size if photos make it too large.' },
    ],
    sections: [
      {
        heading: 'Prepare the images',
        body: [
          'Rename images or sort them before conversion so page order is obvious. Camera rolls often sort by capture time, while downloaded scans may sort alphabetically.',
          'Crop unnecessary background before conversion when possible. A clean image creates a cleaner PDF page and may reduce output size.',
        ],
      },
      {
        heading: 'Choose page behavior',
        body: [
          'Most JPG to PDF jobs work best when each image becomes one page. Receipts, handwritten notes, photographed forms, and scan batches are easier to review this way.',
          'If the final PDF must match a form upload requirement, use consistent orientation and page size. Mixing portrait and landscape images can be valid, but the result may look less polished.',
        ],
        steps: [
          'Select the JPG files in the order they should appear.',
          'Adjust page order before export if the tool offers reordering.',
          'Create the PDF and open the result.',
          'Check that all images are readable and no page is rotated incorrectly.',
        ],
      },
      {
        heading: 'Quality tradeoffs',
        body: [
          'High-resolution photos can create large PDFs. If the output is too big, compress the final PDF rather than repeatedly converting from lower-quality images.',
          'For documents that contain small print, keep enough image quality for review. Compression is useful, but readability comes first.',
        ],
      },
      {
        heading: 'Privacy note',
        body: [
          'Photos can contain sensitive details in the visible image itself. Converting them to PDF does not remove addresses, account numbers, faces, or other visible information.',
          'Review each page before sharing and use redaction where sensitive visible content should not leave your device.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-sign-a-pdf-online-safely',
    title: 'How to sign a PDF online safely',
    description:
      'Understand visible PDF signatures, certificate-based signatures, review steps, and privacy checks before sending a signed document.',
    summary:
      'A visible PDF signature is useful for many everyday forms, but important documents should be checked carefully and may require a certificate-based process.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'sign-pdf', reason: 'Add a visible drawn, typed, or uploaded signature.' },
      { toolId: 'digital-sign-pdf', reason: 'Use a certificate-backed signature workflow when required.' },
      { toolId: 'form-filler', reason: 'Complete form fields before adding a signature.' },
    ],
    sections: [
      {
        heading: 'Know which signature you need',
        body: [
          'A visible signature places a mark on the page. It can be appropriate for routine forms, acknowledgements, and internal approvals when the recipient accepts that format.',
          'A certificate-based digital signature is different. It is intended to support document integrity and certificate validation, but requirements vary by organization, jurisdiction, and recipient.',
        ],
      },
      {
        heading: 'Safe signing workflow',
        body: [
          'Fill in required fields first, then place the signature where the form expects it. Avoid signing a blank or incomplete document unless you fully understand the consequences.',
          'After exporting, open the signed PDF and check that the signature is on the correct page, not covering important text, and visible at normal zoom.',
        ],
        steps: [
          'Open the PDF and complete any required form fields.',
          'Create or upload the signature you are allowed to use.',
          'Place it in the correct signature area.',
          'Download and inspect the signed PDF before sending it.',
        ],
      },
      {
        heading: 'Important limits',
        body: [
          'OpenToolsKit does not provide legal advice and cannot tell you whether a signature is legally sufficient for a specific transaction.',
          'For high-stakes agreements, regulated filings, identity documents, or notarized workflows, follow the recipient instructions or ask a qualified professional.',
        ],
      },
      {
        heading: 'Privacy checks',
        body: [
          'A signature image can become reusable if someone else receives the file. Use only the signature style needed for the document and avoid embedding extra personal information.',
          'If the document contains private details, consider metadata removal, redaction, or encryption as separate checks before sharing.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-protect-a-pdf-with-a-password',
    title: 'How to protect a PDF with a password',
    description:
      'A practical guide to PDF password protection, permission settings, safe sharing, and what encryption does not solve.',
    summary:
      'Password protection can control who opens a PDF, but it does not replace redaction, careful sharing, or a secure way to send the password.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'encrypt-pdf', reason: 'Add password protection before sharing a PDF.' },
      { toolId: 'decrypt-pdf', reason: 'Remove an opening password from files you are allowed to unlock.' },
      { toolId: 'change-permissions', reason: 'Adjust PDF permissions when the workflow requires it.' },
    ],
    sections: [
      {
        heading: 'What PDF encryption does',
        body: [
          'PDF encryption can require a password before the document opens. Depending on settings, it may also restrict printing, copying, or editing in PDF viewers.',
          'Encryption protects access to the file, but it does not remove sensitive text, images, or metadata. If information should not be disclosed, redact or remove it before encryption.',
        ],
      },
      {
        heading: 'Choose and share the password carefully',
        body: [
          'Use a password that is not easy to guess and do not put the password in the same email or message as the encrypted PDF.',
          'If a recipient loses the password, recovery may not be possible. Keep a safe copy of the original file when the document matters.',
        ],
        steps: [
          'Review the PDF and remove information that should not be shared.',
          'Encrypt the file with a strong password.',
          'Open the encrypted output to confirm the password works.',
          'Send the file and password through separate channels where possible.',
        ],
      },
      {
        heading: 'Responsible use',
        body: [
          'Only encrypt, decrypt, or change permissions on documents you own or have permission to modify.',
          'Do not use password tools to bypass rights, access controls, or obligations that apply to the document.',
        ],
      },
      {
        heading: 'After encryption',
        body: [
          'Check that the recipient can open the file before deleting the unencrypted original. Some older PDF viewers handle encrypted files differently.',
          'For highly sensitive material, use encryption as one layer in a broader process rather than the only safeguard.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-remove-pdf-metadata-before-sharing',
    title: 'How to remove PDF metadata before sharing',
    description:
      'Learn what PDF metadata can reveal, when to clean it, and why metadata removal is different from visible redaction.',
    summary:
      'Metadata cleanup helps reduce hidden document details, but visible page content and embedded files still need separate review.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'remove-metadata', reason: 'Remove author, producer, title, and similar document properties.' },
      { toolId: 'sanitize-pdf', reason: 'Use a broader cleanup pass when hidden data may remain.' },
      { toolId: 'find-and-redact', reason: 'Hide visible sensitive information before sharing.' },
    ],
    sections: [
      {
        heading: 'What metadata can include',
        body: [
          'PDF metadata can include title, author, creator application, producer, timestamps, and other document properties. It may not be visible on the page, but it can travel with the file.',
          'Some documents also contain attachments, comments, form values, or revision artifacts. Metadata removal is one privacy step, not a full security review.',
        ],
      },
      {
        heading: 'When to clean metadata',
        body: [
          'Clean metadata before publishing a PDF, sending files outside your organization, sharing client work, or distributing a document created from a private template.',
          'Metadata cleanup is especially useful for CVs, proposals, legal drafts, reports, and files created from office software exports.',
        ],
        steps: [
          'Open the PDF and confirm the visible content is ready to share.',
          'Remove metadata or run a broader sanitize workflow.',
          'Download the cleaned copy.',
          'Check document properties in a PDF viewer when possible.',
        ],
      },
      {
        heading: 'Metadata is not redaction',
        body: [
          'If names, account numbers, addresses, or comments are visible on the page, removing metadata will not hide them.',
          'Use redaction for visible sensitive content and verify the output before publishing or filing.',
        ],
      },
      {
        heading: 'Privacy limits',
        body: [
          'Different PDF generators store hidden information differently. A cleanup tool can reduce common metadata, but important documents deserve manual review.',
          'Keep an original copy until you confirm the cleaned version still opens and contains the pages you intended to share.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-redact-sensitive-information-in-a-pdf',
    title: 'How to redact sensitive information in a PDF',
    description:
      'Use a careful redaction workflow for names, account numbers, addresses, and other sensitive visible content before sharing a PDF.',
    summary:
      'Good redaction is deliberate: identify sensitive content, hide it in the output, and verify that the final PDF does not reveal what should be protected.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'find-and-redact', reason: 'Search for and hide visible sensitive text or areas.' },
      { toolId: 'remove-metadata', reason: 'Clean hidden document properties after visible redaction.' },
      { toolId: 'encrypt-pdf', reason: 'Add password protection when access should be controlled.' },
    ],
    sections: [
      {
        heading: 'Plan the redaction',
        body: [
          'Make a list of what must be hidden: names, addresses, phone numbers, account numbers, signatures, faces, pricing, or internal comments. Search can help, but manual review is still important.',
          'Scanned PDFs may contain text as images. In that case, a text search might miss visible information, so inspect each page visually.',
        ],
      },
      {
        heading: 'Redact and verify',
        body: [
          'Apply redactions, export the file, and reopen the downloaded PDF. Try copying text from the redacted area and zoom into image-heavy pages.',
          'If the document is important, ask another authorized person to review the final PDF before external sharing.',
        ],
        steps: [
          'Work from a copy of the original document.',
          'Find all sensitive visible content.',
          'Apply redaction marks or area redactions.',
          'Export and verify the final PDF before sharing.',
        ],
      },
      {
        heading: 'Common redaction mistakes',
        body: [
          'Do not cover sensitive text with a normal black rectangle in a general editor unless the output actually removes or permanently obscures the underlying content.',
          'Do not forget metadata, attachments, comments, bookmarks, file names, and screenshots that may reveal the same information elsewhere.',
        ],
      },
      {
        heading: 'Responsible use',
        body: [
          'Only redact documents you own or are authorized to prepare. Redaction can affect legal, compliance, and disclosure obligations.',
          'This guide is practical product guidance, not legal advice. Follow the rules that apply to your document and recipient.',
        ],
      },
    ],
  },
  {
    slug: 'browser-based-pdf-tools-and-privacy',
    title: 'Browser-based PDF tools and privacy: what to check',
    description:
      'Understand how browser-side PDF tools work, what stays local where applicable, and what users should verify before sharing files.',
    summary:
      'Browser-based tools can reduce unnecessary uploads, but users still need to understand browser limits, third-party links, and output verification.',
    updatedAt: '2026-05-01',
    relatedTools: [
      { toolId: 'pdf-reader', reason: 'Open and inspect PDFs in the browser before and after edits.' },
      { toolId: 'sanitize-pdf', reason: 'Run a cleanup pass when hidden document data may matter.' },
      { toolId: 'remove-metadata', reason: 'Reduce document properties before sending a final copy.' },
    ],
    sections: [
      {
        heading: 'What browser-side processing means',
        body: [
          'A browser-side PDF tool performs work with JavaScript, WebAssembly, workers, and browser storage on your device where applicable. That can reduce the need to upload documents to a processing server.',
          'The exact behavior still depends on the tool, browser, device memory, and file type. Public privacy pages should explain these boundaries instead of making absolute claims.',
        ],
      },
      {
        heading: 'What users should check',
        body: [
          'Before sharing a file, open the downloaded output and confirm that pages, signatures, redactions, text, and images look correct. A successful download is not the same as a reviewed document.',
          'For sensitive files, check visible content, metadata, attachments, comments, and access settings separately.',
        ],
        steps: [
          'Use tools only on files you own or have permission to process.',
          'Keep the original file until the output has been reviewed.',
          'Verify the output in a PDF viewer.',
          'Use separate privacy or security tools when the document requires them.',
        ],
      },
      {
        heading: 'Limits of local tools',
        body: [
          'Large PDFs, damaged files, unusual fonts, complex forms, scanned documents, and certificate-based signatures can behave differently across browsers.',
          'If a document has legal, medical, financial, or regulatory importance, treat browser tools as one step in the workflow and verify requirements with the recipient.',
        ],
      },
      {
        heading: 'Third-party surfaces',
        body: [
          'A clean tool site should keep ads, partner links, source links, and support links separate from the core document workflow.',
          'OpenToolsKit keeps monetization surfaces separate from document actions and avoids intrusive formats that would interfere with reviewing or exporting files.',
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideContent | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesBySlugs(slugs: string[] = []): GuideContent[] {
  const selected = new Set(slugs);
  return guides.filter((guide) => selected.has(guide.slug));
}

export function getGuideSummaries(limit = guides.length): GuideContent[] {
  return guides.slice(0, limit);
}
