import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

const production = !process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
const options = [
  // browser-friendly UMD build
  {
    input: "src/sendgrid-ts-mail.ts",
    output: {
      name: "sendgrid-ts-mail",
      file: pkg.browser,
      format: "umd",
      sourcemap: !production,
    },
    external: ["@sendgrid/client"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", sourceMap: !production }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/sendgrid-ts-mail.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: !production },
      { file: pkg.module, format: "es", sourcemap: !production },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json", sourceMap: !production })],
  },

  {
    input: "src/cli/cli.ts",
    output: [{ file: "dist/cli.esm.js", format: "es", sourcemap: !production }],
    plugins: [typescript({ tsconfig: "./tsconfig.json", sourceMap: !production })],
  },
];

export default options;
