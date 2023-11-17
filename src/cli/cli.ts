#!/usr/bin/env node
import fs from "fs";
import resolvePkg from "resolve-pkg";

import { fetchSendGridTemplate, fetchSendGridTemplates } from "./sendgrid-api";
import { parseTemplateVariableKeys } from "./extract-variables";
import { buildTypescriptTypes } from "./build-typescript-types";
import { chunk } from "../utils/chunk";
import { loadEnv } from "./load-env";
import { getArgs } from "./load-args";

async function main() {
  const args = getArgs();

  loadEnv(args["--env"]);

  const ENV_KEY = args["--key"] || "SENDGRID_API_KEY";
  const API_KEY = process.env[ENV_KEY] as string;
  const PACKAGE_NAME = "sendgrid-ts-mail";

  if (!API_KEY) {
    throw new Error(
      `${PACKAGE_NAME}: No api key detected. Define it in your environment under "${ENV_KEY}"`,
    );
  }

  try {
    const templates = await fetchSendGridTemplates(API_KEY);
    const variableMap: Record<string, any> = {};

    const chunks = chunk(templates, 50);
    for (const templates of chunks) {
      await Promise.all(
        templates.map(async (template) => {
          console.log(`Template ID: ${template.id}`);
          console.log(`Template Name: ${template.name}`);

          const templateDetails = await fetchSendGridTemplate(API_KEY, template.id);

          variableMap[template.id] = parseTemplateVariableKeys(templateDetails);
        }),
      );
    }

    const ts = buildTypescriptTypes(variableMap);
    const pkg = resolvePkg(PACKAGE_NAME);

    fs.writeFileSync(`${pkg}/dist/types/types.generated.d.ts`, ts);
    console.log(`Created file in ${`${pkg}/dist/types/types.generated.d.ts`}`);
  } catch (error) {
    console.error(error);
  }
}

main();
