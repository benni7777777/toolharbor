'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useSafeTranslations } from '@/lib/i18n/useSafeTranslations';

interface ToolInterfaceProps {
  toolId: string;
}

const ToolLoading = () => (
  <div className="rounded-[2rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-8 text-center text-sm text-[hsl(var(--color-muted-foreground))] shadow-[var(--shadow-sm)]">
    Loading tool interface...
  </div>
);

const MergePDFTool = dynamic(() => import('@/components/tools/merge').then((mod) => mod.MergePDFTool), { loading: ToolLoading });
const SplitPDFTool = dynamic(() => import('@/components/tools/split').then((mod) => mod.SplitPDFTool), { loading: ToolLoading });
const DeletePagesTool = dynamic(() => import('@/components/tools/delete').then((mod) => mod.DeletePagesTool), { loading: ToolLoading });
const RotatePDFTool = dynamic(() => import('@/components/tools/rotate').then((mod) => mod.RotatePDFTool), { loading: ToolLoading });
const AddBlankPageTool = dynamic(() => import('@/components/tools/add-blank-page').then((mod) => mod.AddBlankPageTool), { loading: ToolLoading });
const ReversePagesTool = dynamic(() => import('@/components/tools/reverse').then((mod) => mod.ReversePagesTool), { loading: ToolLoading });
const NUpPDFTool = dynamic(() => import('@/components/tools/n-up').then((mod) => mod.NUpPDFTool), { loading: ToolLoading });
const AlternateMergeTool = dynamic(() => import('@/components/tools/alternate-merge').then((mod) => mod.AlternateMergeTool), { loading: ToolLoading });
const DividePagesTool = dynamic(() => import('@/components/tools/divide').then((mod) => mod.DividePagesTool), { loading: ToolLoading });
const CombineSinglePageTool = dynamic(() => import('@/components/tools/combine-single-page').then((mod) => mod.CombineSinglePageTool), { loading: ToolLoading });
const GridCombineTool = dynamic(() => import('@/components/tools/grid-combine').then((mod) => mod.GridCombineTool), { loading: ToolLoading });
const PosterizePDFTool = dynamic(() => import('@/components/tools/posterize').then((mod) => mod.PosterizePDFTool), { loading: ToolLoading });
const PDFMultiTool = dynamic(() => import('@/components/tools/pdf-multi-tool').then((mod) => mod.PDFMultiTool), { loading: ToolLoading });
const AddAttachmentsTool = dynamic(() => import('@/components/tools/add-attachments').then((mod) => mod.AddAttachmentsTool), { loading: ToolLoading });
const ExtractAttachmentsTool = dynamic(() => import('@/components/tools/extract-attachments').then((mod) => mod.ExtractAttachmentsTool), { loading: ToolLoading });
const ExtractImagesTool = dynamic(() => import('@/components/tools/extract-images').then((mod) => mod.ExtractImagesTool), { loading: ToolLoading });
const EditAttachmentsTool = dynamic(() => import('@/components/tools/edit-attachments').then((mod) => mod.EditAttachmentsTool), { loading: ToolLoading });
const ViewMetadataTool = dynamic(() => import('@/components/tools/view-metadata').then((mod) => mod.ViewMetadataTool), { loading: ToolLoading });
const EditMetadataTool = dynamic(() => import('@/components/tools/edit-metadata').then((mod) => mod.EditMetadataTool), { loading: ToolLoading });
const PDFsToZipTool = dynamic(() => import('@/components/tools/pdf-to-zip').then((mod) => mod.PDFsToZipTool), { loading: ToolLoading });
const ComparePDFsTool = dynamic(() => import('@/components/tools/compare-pdfs').then((mod) => mod.ComparePDFsTool), { loading: ToolLoading });
const EditPDFTool = dynamic(() => import('@/components/tools/edit-pdf').then((mod) => mod.EditPDFTool), { loading: ToolLoading });
const ImageToPDFTool = dynamic(() => import('@/components/tools/image-to-pdf').then((mod) => mod.ImageToPDFTool), { loading: ToolLoading });
const TextToPDFTool = dynamic(() => import('@/components/tools/text-to-pdf').then((mod) => mod.TextToPDFTool), { loading: ToolLoading });
const PSDToPDFTool = dynamic(() => import('@/components/tools/psd-to-pdf').then((mod) => mod.PSDToPDFTool), { loading: ToolLoading });
const JSONToPDFTool = dynamic(() => import('@/components/tools/json-to-pdf').then((mod) => mod.JSONToPDFTool), { loading: ToolLoading });
const FixPageSizeTool = dynamic(() => import('@/components/tools/fix-page-size').then((mod) => mod.FixPageSizeTool), { loading: ToolLoading });
const CompressPDFTool = dynamic(() => import('@/components/tools/compress').then((mod) => mod.CompressPDFTool), { loading: ToolLoading });
const SignPDFTool = dynamic(() => import('@/components/tools/sign').then((mod) => mod.SignPDFTool), { loading: ToolLoading });
const CropPDFTool = dynamic(() => import('@/components/tools/crop').then((mod) => mod.CropPDFTool), { loading: ToolLoading });
const OrganizePDFTool = dynamic(() => import('@/components/tools/organize').then((mod) => mod.OrganizePDFTool), { loading: ToolLoading });
const ExtractPagesTool = dynamic(() => import('@/components/tools/extract').then((mod) => mod.ExtractPagesTool), { loading: ToolLoading });
const BookmarkTool = dynamic(() => import('@/components/tools/bookmark').then((mod) => mod.BookmarkTool), { loading: ToolLoading });
const PageNumbersTool = dynamic(() => import('@/components/tools/page-numbers').then((mod) => mod.PageNumbersTool), { loading: ToolLoading });
const WatermarkTool = dynamic(() => import('@/components/tools/watermark').then((mod) => mod.WatermarkTool), { loading: ToolLoading });
const HeaderFooterTool = dynamic(() => import('@/components/tools/header-footer').then((mod) => mod.HeaderFooterTool), { loading: ToolLoading });
const InvertColorsTool = dynamic(() => import('@/components/tools/invert-colors').then((mod) => mod.InvertColorsTool), { loading: ToolLoading });
const BackgroundColorTool = dynamic(() => import('@/components/tools/background-color').then((mod) => mod.BackgroundColorTool), { loading: ToolLoading });
const StampsTool = dynamic(() => import('@/components/tools/stamps').then((mod) => mod.StampsTool), { loading: ToolLoading });
const RemoveAnnotationsTool = dynamic(() => import('@/components/tools/remove-annotations').then((mod) => mod.RemoveAnnotationsTool), { loading: ToolLoading });
const FormFillerTool = dynamic(() => import('@/components/tools/form-filler').then((mod) => mod.FormFillerTool), { loading: ToolLoading });
const FormCreatorTool = dynamic(() => import('@/components/tools/form-creator').then((mod) => mod.FormCreatorTool), { loading: ToolLoading });
const RemoveBlankPagesTool = dynamic(() => import('@/components/tools/remove-blank-pages').then((mod) => mod.RemoveBlankPagesTool), { loading: ToolLoading });
const PDFToImageTool = dynamic(() => import('@/components/tools/pdf-to-image').then((mod) => mod.PDFToImageTool), { loading: ToolLoading });
const PDFToGreyscaleTool = dynamic(() => import('@/components/tools/pdf-to-greyscale').then((mod) => mod.PDFToGreyscaleTool), { loading: ToolLoading });
const PDFToJSONTool = dynamic(() => import('@/components/tools/pdf-to-json').then((mod) => mod.PDFToJSONTool), { loading: ToolLoading });
const OCRPDFTool = dynamic(() => import('@/components/tools/ocr').then((mod) => mod.OCRPDFTool), { loading: ToolLoading });
const LinearizePDFTool = dynamic(() => import('@/components/tools/linearize').then((mod) => mod.LinearizePDFTool), { loading: ToolLoading });
const PageDimensionsTool = dynamic(() => import('@/components/tools/page-dimensions').then((mod) => mod.PageDimensionsTool), { loading: ToolLoading });
const RemoveRestrictionsTool = dynamic(() => import('@/components/tools/remove-restrictions').then((mod) => mod.RemoveRestrictionsTool), { loading: ToolLoading });
const EncryptPDFTool = dynamic(() => import('@/components/tools/encrypt').then((mod) => mod.EncryptPDFTool), { loading: ToolLoading });
const DecryptPDFTool = dynamic(() => import('@/components/tools/decrypt').then((mod) => mod.DecryptPDFTool), { loading: ToolLoading });
const SanitizePDFTool = dynamic(() => import('@/components/tools/sanitize').then((mod) => mod.SanitizePDFTool), { loading: ToolLoading });
const FindAndRedactTool = dynamic(() => import('@/components/tools/find-and-redact').then((mod) => mod.FindAndRedactTool), { loading: ToolLoading });
const FlattenPDFTool = dynamic(() => import('@/components/tools/flatten').then((mod) => mod.FlattenPDFTool), { loading: ToolLoading });
const RemoveMetadataTool = dynamic(() => import('@/components/tools/remove-metadata').then((mod) => mod.RemoveMetadataTool), { loading: ToolLoading });
const ChangePermissionsTool = dynamic(() => import('@/components/tools/change-permissions').then((mod) => mod.ChangePermissionsTool), { loading: ToolLoading });
const RepairPDFTool = dynamic(() => import('@/components/tools/repair').then((mod) => mod.RepairPDFTool), { loading: ToolLoading });
const TableOfContentsTool = dynamic(() => import('@/components/tools/table-of-contents').then((mod) => mod.TableOfContentsTool), { loading: ToolLoading });
const TextColorTool = dynamic(() => import('@/components/tools/text-color').then((mod) => mod.TextColorTool), { loading: ToolLoading });
const PDFToDocxTool = dynamic(() => import('@/components/tools/pdf-to-docx').then((mod) => mod.PDFToDocxTool), { loading: ToolLoading });
const PDFToPptxTool = dynamic(() => import('@/components/tools/pdf-to-pptx').then((mod) => mod.PDFToPptxTool), { loading: ToolLoading });
const PDFToExcelTool = dynamic(() => import('@/components/tools/pdf-to-excel').then((mod) => mod.PDFToExcelTool), { loading: ToolLoading });
const RotateCustomTool = dynamic(() => import('@/components/tools/rotate-custom/RotateCustomTool').then((mod) => mod.RotateCustomTool), { loading: ToolLoading });
const WordToPDFTool = dynamic(() => import('@/components/tools/word-to-pdf').then((mod) => mod.WordToPDFTool), { loading: ToolLoading });
const ExcelToPDFTool = dynamic(() => import('@/components/tools/excel-to-pdf').then((mod) => mod.ExcelToPDFTool), { loading: ToolLoading });
const PPTXToPDFTool = dynamic(() => import('@/components/tools/pptx-to-pdf').then((mod) => mod.PPTXToPDFTool), { loading: ToolLoading });
const XPSToPDFTool = dynamic(() => import('@/components/tools/xps-to-pdf').then((mod) => mod.XPSToPDFTool), { loading: ToolLoading });
const RTFToPDFTool = dynamic(() => import('@/components/tools/rtf-to-pdf').then((mod) => mod.RTFToPDFTool), { loading: ToolLoading });
const EPUBToPDFTool = dynamic(() => import('@/components/tools/epub-to-pdf').then((mod) => mod.EPUBToPDFTool), { loading: ToolLoading });
const MOBIToPDFTool = dynamic(() => import('@/components/tools/mobi-to-pdf').then((mod) => mod.MOBIToPDFTool), { loading: ToolLoading });
const FB2ToPDFTool = dynamic(() => import('@/components/tools/fb2-to-pdf').then((mod) => mod.FB2ToPDFTool), { loading: ToolLoading });
const DJVUToPDFTool = dynamic(() => import('@/components/tools/djvu-to-pdf').then((mod) => mod.DJVUToPDFTool), { loading: ToolLoading });
const PDFToSVGTool = dynamic(() => import('@/components/tools/pdf-to-svg').then((mod) => mod.PDFToSVGTool), { loading: ToolLoading });
const PDFToMarkdownTool = dynamic(() => import('@/components/tools/pdf-to-markdown').then((mod) => mod.PDFToMarkdownTool), { loading: ToolLoading });
const DeskewPDFTool = dynamic(() => import('@/components/tools/deskew').then((mod) => mod.DeskewPDFTool), { loading: ToolLoading });
const PDFBookletTool = dynamic(() => import('@/components/tools/pdf-booklet').then((mod) => mod.PDFBookletTool), { loading: ToolLoading });
const RasterizePDFTool = dynamic(() => import('@/components/tools/rasterize').then((mod) => mod.RasterizePDFTool), { loading: ToolLoading });
const MarkdownToPDFTool = dynamic(() => import('@/components/tools/markdown-to-pdf').then((mod) => mod.MarkdownToPDFTool), { loading: ToolLoading });
const EmailToPDFTool = dynamic(() => import('@/components/tools/email-to-pdf').then((mod) => mod.EmailToPDFTool), { loading: ToolLoading });
const CBZToPDFTool = dynamic(() => import('@/components/tools/cbz-to-pdf').then((mod) => mod.CBZToPDFTool), { loading: ToolLoading });
const PDFToPDFATool = dynamic(() => import('@/components/tools/pdf-to-pdfa').then((mod) => mod.PDFToPDFATool), { loading: ToolLoading });
const FontToOutlineTool = dynamic(() => import('@/components/tools/font-to-outline').then((mod) => mod.FontToOutlineTool), { loading: ToolLoading });
const ExtractTablesTool = dynamic(() => import('@/components/tools/extract-tables').then((mod) => mod.ExtractTablesTool), { loading: ToolLoading });
const OCGManagerTool = dynamic(() => import('@/components/tools/ocg-manager').then((mod) => mod.OCGManagerTool), { loading: ToolLoading });
const PDFReaderTool = dynamic(() => import('@/components/tools/pdf-reader').then((mod) => mod.PDFReaderTool), { loading: ToolLoading });
const DigitalSignPDFTool = dynamic(() => import('@/components/tools/digital-sign').then((mod) => mod.DigitalSignPDFTool), { loading: ToolLoading });
const ValidateSignatureTool = dynamic(() => import('@/components/tools/validate-signature').then((mod) => mod.ValidateSignatureTool), { loading: ToolLoading });

export const ToolInterface: React.FC<ToolInterfaceProps> = ({ toolId }) => {
  const t = useSafeTranslations();

  switch (toolId) {
    case 'merge-pdf':
      return <MergePDFTool />;
    case 'split-pdf':
      return <SplitPDFTool />;
    case 'delete-pages':
      return <DeletePagesTool />;
    case 'rotate-pdf':
      return <RotatePDFTool />;
    case 'rotate-custom':
      return <RotateCustomTool />;
    case 'add-blank-page':
      return <AddBlankPageTool />;
    case 'reverse-pages':
      return <ReversePagesTool />;
    case 'n-up-pdf':
      return <NUpPDFTool />;
    case 'grid-combine':
      return <GridCombineTool />;
    case 'alternate-merge':
      return <AlternateMergeTool />;
    case 'divide-pages':
      return <DividePagesTool />;
    case 'combine-single-page':
      return <CombineSinglePageTool />;
    case 'posterize-pdf':
      return <PosterizePDFTool />;
    case 'pdf-multi-tool':
      return <PDFMultiTool />;
    case 'add-attachments':
      return <AddAttachmentsTool />;
    case 'extract-attachments':
      return <ExtractAttachmentsTool />;
    case 'extract-images':
      return <ExtractImagesTool />;
    case 'edit-attachments':
      return <EditAttachmentsTool />;
    case 'view-metadata':
      return <ViewMetadataTool />;
    case 'edit-metadata':
      return <EditMetadataTool />;
    case 'pdf-to-zip':
      return <PDFsToZipTool />;
    case 'compare-pdfs':
      return <ComparePDFsTool />;
    case 'edit-pdf':
      return <EditPDFTool />;
    case 'image-to-pdf':
      return <ImageToPDFTool />;
    case 'jpg-to-pdf':
      return <ImageToPDFTool imageType="jpg" />;
    case 'png-to-pdf':
      return <ImageToPDFTool imageType="png" />;
    case 'webp-to-pdf':
      return <ImageToPDFTool imageType="webp" />;
    case 'bmp-to-pdf':
      return <ImageToPDFTool imageType="bmp" />;
    case 'tiff-to-pdf':
      return <ImageToPDFTool imageType="tiff" />;
    case 'svg-to-pdf':
      return <ImageToPDFTool imageType="svg" />;
    case 'heic-to-pdf':
      return <ImageToPDFTool imageType="heic" />;
    case 'psd-to-pdf':
      return <PSDToPDFTool />;
    case 'txt-to-pdf':
      return <TextToPDFTool />;
    case 'json-to-pdf':
      return <JSONToPDFTool />;
    case 'compress-pdf':
      return <CompressPDFTool />;
    case 'sign-pdf':
      return <SignPDFTool />;
    case 'crop-pdf':
      return <CropPDFTool />;
    case 'fix-page-size':
      return <FixPageSizeTool />;
    case 'organize-pdf':
      return <OrganizePDFTool />;
    case 'extract-pages':
      return <ExtractPagesTool />;
    case 'bookmark':
      return <BookmarkTool />;
    case 'page-numbers':
      return <PageNumbersTool />;
    case 'add-watermark':
      return <WatermarkTool />;
    case 'header-footer':
      return <HeaderFooterTool />;
    case 'invert-colors':
      return <InvertColorsTool />;
    case 'background-color':
      return <BackgroundColorTool />;
    case 'text-color':
      return <TextColorTool />;
    case 'table-of-contents':
      return <TableOfContentsTool />;
    case 'add-stamps':
      return <StampsTool />;
    case 'remove-annotations':
      return <RemoveAnnotationsTool />;
    case 'form-filler':
      return <FormFillerTool />;
    case 'form-creator':
      return <FormCreatorTool />;
    case 'remove-blank-pages':
      return <RemoveBlankPagesTool />;
    case 'pdf-to-jpg':
      return <PDFToImageTool outputFormat="jpg" />;
    case 'pdf-to-png':
      return <PDFToImageTool outputFormat="png" />;
    case 'pdf-to-webp':
      return <PDFToImageTool outputFormat="webp" />;
    case 'pdf-to-bmp':
      return <PDFToImageTool outputFormat="bmp" />;
    case 'pdf-to-tiff':
      return <PDFToImageTool outputFormat="tiff" />;
    case 'pdf-to-svg':
      return <PDFToSVGTool />;
    case 'pdf-to-greyscale':
      return <PDFToGreyscaleTool />;
    case 'pdf-to-json':
      return <PDFToJSONTool />;
    case 'pdf-to-docx':
      return <PDFToDocxTool />;
    case 'pdf-to-pptx':
      return <PDFToPptxTool />;
    case 'pdf-to-excel':
      return <PDFToExcelTool />;
    case 'pdf-to-markdown':
      return <PDFToMarkdownTool />;
    case 'ocr-pdf':
      return <OCRPDFTool />;
    case 'linearize-pdf':
      return <LinearizePDFTool />;
    case 'page-dimensions':
      return <PageDimensionsTool />;
    case 'remove-restrictions':
      return <RemoveRestrictionsTool />;
    case 'repair-pdf':
      return <RepairPDFTool />;
    case 'encrypt-pdf':
      return <EncryptPDFTool />;
    case 'decrypt-pdf':
      return <DecryptPDFTool />;
    case 'sanitize-pdf':
      return <SanitizePDFTool />;
    case 'find-and-redact':
      return <FindAndRedactTool />;
    case 'flatten-pdf':
      return <FlattenPDFTool />;
    case 'remove-metadata':
      return <RemoveMetadataTool />;
    case 'change-permissions':
      return <ChangePermissionsTool />;
    case 'word-to-pdf':
      return <WordToPDFTool />;
    case 'excel-to-pdf':
      return <ExcelToPDFTool />;
    case 'pptx-to-pdf':
      return <PPTXToPDFTool />;
    case 'xps-to-pdf':
      return <XPSToPDFTool />;
    case 'rtf-to-pdf':
      return <RTFToPDFTool />;
    case 'epub-to-pdf':
      return <EPUBToPDFTool />;
    case 'mobi-to-pdf':
      return <MOBIToPDFTool />;
    case 'fb2-to-pdf':
      return <FB2ToPDFTool />;
    case 'djvu-to-pdf':
      return <DJVUToPDFTool />;
    case 'deskew-pdf':
      return <DeskewPDFTool />;
    case 'pdf-booklet':
      return <PDFBookletTool />;
    case 'rasterize-pdf':
      return <RasterizePDFTool />;
    case 'markdown-to-pdf':
      return <MarkdownToPDFTool />;
    case 'email-to-pdf':
      return <EmailToPDFTool />;
    case 'cbz-to-pdf':
      return <CBZToPDFTool />;
    case 'pdf-to-pdfa':
      return <PDFToPDFATool />;
    case 'font-to-outline':
      return <FontToOutlineTool />;
    case 'extract-tables':
      return <ExtractTablesTool />;
    case 'ocg-manager':
      return <OCGManagerTool />;
    case 'pdf-reader':
      return <PDFReaderTool />;
    case 'digital-sign-pdf':
      return <DigitalSignPDFTool />;
    case 'validate-signature':
      return <ValidateSignatureTool />;
    default:
      return (
        <div className="p-8 text-center text-[hsl(var(--color-muted-foreground))]">
          <p>{t('tools.comingSoon')}</p>
        </div>
      );
  }
};

export default ToolInterface;
