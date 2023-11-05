const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9\s]/g, "");
const buildInterfaceKeyValues = (entries: [string, string][]) =>
  entries.map(([k, v]) => `\t"${k}": ${v};`).join("\n");

interface BuildInterfaceOptions {
  export?: boolean;
}
const buildInterface = (name: string, entries: [string, string][], opt?: BuildInterfaceOptions) =>
  `${opt?.export ? "export " : ""}interface ${name} {\n` +
  `${buildInterfaceKeyValues(entries)}` +
  `}`;

export async function buildTypescriptTypes(variableMap: Record<string, string[]>) {
  return (
    buildInterface(
      "SendGridTsMail",
      Object.keys(variableMap).map((key) => [key, sanitize(key).toUpperCase()]),
      { export: true },
    ) +
    "\n\n" +
    Object.entries(variableMap)
      .map(([key, keys]) =>
        buildInterface(
          sanitize(key).toUpperCase(),
          keys.map((k) => [k, "any"]),
        ),
      )
      .join("\n")
  );
}
