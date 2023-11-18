import { SendgridTemplateDetail } from "./sendgrid-api";

export function extractVariablesFromHtml(html: string): string[] {
  if (!html) {
    return [];
  }

  // Todo: improve the detection (handle the ifs etc...)
  const matches = html.matchAll(/\{\{(#if)?\s*([^{}\s]+?)\s*\}\}/gm);

  const foundVariables = new Set<string>();

  const RESERVED_WORDS = ["else", "/if", "#if"];

  for (const match of matches) {
    if (RESERVED_WORDS.includes(match[2]) === false) {
      foundVariables.add(match[2]);
    }
  }

  return Array.from(foundVariables);
}

export function parseTemplateVariableKeys(template: SendgridTemplateDetail) {
  const templateHtml = template.versions?.find((v) => v.active)?.html_content;

  if (!templateHtml) {
    return {};
  }

  return extractVariablesFromHtml(templateHtml);
}
