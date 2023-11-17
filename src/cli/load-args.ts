import arg from "arg";
import { printUsage } from "./print-usage";

export const getArgs = () => {
  const args = arg({
    // Types
    "--help": Boolean,
    "--env": String,
    "--key": String,

    // Aliases
    "-h": "--help",
    "-e": "--env",
    "-k": "--key",
  });

  if (args["--help"]) {
    printUsage();
    process.exit(0);
  }

  return args;
};
