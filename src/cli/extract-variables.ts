import { SendgridTemplateDetail } from "./sendgrid-api";

export function parseTemplateVariableKeys(template: SendgridTemplateDetail) {
  const templateHtml = template.versions?.find((v) => v.active)?.html_content;

  if (!templateHtml) {
    return {};
  }

  // Todo: improve the detection (handle the ifs etc...)
  const matches = templateHtml.matchAll(/\{\{(\s?)+(\S+)(\s?)+\}\}/gm);

  const foundVariables = new Set();

  for (const match of matches) {
    foundVariables.add(match[2]);
  }

  return Array.from(foundVariables);
}
