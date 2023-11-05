#!/usr/bin/env node
import fs from "fs";
import resolvePkg from "resolve-pkg";
import { fetchSendGridTemplate, fetchSendGridTemplates } from "./sendgrid-api";
import { parseTemplateVariableKeys } from "./extract-variables";
import { buildTypescriptTypes } from "./build-typescript-types";

async function main() {
  try {
    const apiKey = "";
    const packageName = "sendgrid-ts-mail";

    const templates = await fetchSendGridTemplates(apiKey);
    const variableMap: Record<string, any> = {};
    let i = 0;

    for (const template of templates) {
      if (i > 2) {
        continue;
      }
      console.log(`Template ID: ${template.id}`);
      console.log(`Template Name: ${template.name}`);

      const templateDetails = await fetchSendGridTemplate(apiKey, template.id);

      variableMap[template.id] = parseTemplateVariableKeys(templateDetails);
      i++;
    }

    const ts = await buildTypescriptTypes(variableMap);

    const pkg = resolvePkg(packageName);

    fs.writeFileSync(`${pkg}/dist/types/types.generated.d.ts`, ts);
    console.log(`Created file in ${`${pkg}/dist/types/types.generated.d.ts`}`);
  } catch (error) {
    console.error(error);
  }
}

main();
