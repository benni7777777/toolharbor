import { CATEGORY_INFO, type Tool, type ToolContent, type ToolCategory } from '@/types/tool';
import { getCategorySeo, TOOL_SEO_OVERRIDES, type ToolSeoExample } from '@/config/seo';

export interface ToolSeoProfile {
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

function titleizeToolId(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildFallbackBestFor(tool: Tool, category: ToolCategory): string[] {
  const categoryName = CATEGORY_INFO[category].name.toLowerCase();
  const firstFeature = tool.features[0]?.replace(/-/g, ' ') || 'browser-side PDF work';
  const secondFeature = tool.features[1]?.replace(/-/g, ' ') || 'local document handling';

  return [
    `Use this tool when your main PDF task is ${firstFeature} rather than a broader ${categoryName} workflow.`,
    `Good for ${titleizeToolId(tool.id).toLowerCase()} jobs that should stay inside the browser.`,
    `A practical fit when the next step depends on ${secondFeature} or a cleaner PDF handoff.`,
  ];
}

function buildFallbackInputs(tool: Tool): string[] {
  const formats = tool.acceptedFormats.length > 0 ? tool.acceptedFormats.join(', ') : 'PDF files';
  return [
    `Accepted inputs: ${formats}.`,
    `Up to ${tool.maxFiles === Infinity ? 'multiple files' : `${tool.maxFiles} file${tool.maxFiles === 1 ? '' : 's'}`}, depending on the workflow.`,
  ];
}

function buildFallbackOutputs(tool: Tool): string[] {
  return [
    `Primary output format: ${tool.outputFormat.toUpperCase()}.`,
    `Result stays aligned with the ${titleizeToolId(tool.id).toLowerCase()} task rather than a generic export.`,
  ];
}

function buildFallbackLimitations(tool: Tool, category: ToolCategory): string[] {
  const categorySeo = getCategorySeo(category);
  return [
    `This route is specific to ${titleizeToolId(tool.id).toLowerCase()} and will not replace every ${CATEGORY_INFO[category].name.toLowerCase()} workflow.`,
    `If your job is closer to ${categorySeo.adjacentCategories.map((item) => CATEGORY_INFO[item].name.toLowerCase()).join(' or ')}, use the adjacent hub instead.`,
  ];
}

function buildFallbackExamples(toolName: string): ToolSeoExample[] {
  return [
    {
      title: `Typical ${toolName.toLowerCase()} job`,
      input: `A source file prepared for ${toolName.toLowerCase()}.`,
      output: `A finished result from the ${toolName.toLowerCase()} workflow.`,
    },
    {
      title: 'Portal or sharing workflow',
      input: `A document that needs ${toolName.toLowerCase()} before upload or delivery.`,
      output: 'A cleaner, more usable export ready for the next step.',
    },
  ];
}

export function getToolSeoProfile(tool: Tool, content: ToolContent): ToolSeoProfile {
  const override = TOOL_SEO_OVERRIDES[tool.id];
  if (override) {
    return override;
  }

  const toolName = content.title || titleizeToolId(tool.id);
  const normalizedToolName = toolName.toLowerCase();

  return {
    pageTitle: `${toolName} - Browser-Side PDF Workflow | OpenToolsKit`,
    h1: toolName,
    metaDescription: content.metaDescription || `Use ${toolName} in your browser for a private PDF workflow without uploads or sign-up.`,
    fastAnswer: `Use ${toolName} when the job is ${normalizedToolName} and you want the result handled locally in your browser.`,
    bestFor: buildFallbackBestFor(tool, tool.category),
    inputs: buildFallbackInputs(tool),
    outputs: buildFallbackOutputs(tool),
    limitations: buildFallbackLimitations(tool, tool.category),
    examples: buildFallbackExamples(toolName),
    comparisonToolIds: tool.relatedTools.slice(0, 3),
  };
}
