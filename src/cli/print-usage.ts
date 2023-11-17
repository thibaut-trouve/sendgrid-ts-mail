export const printUsage = () => {
  console.log(
    `Usage: npx sendgrid-ts-mail generate\n` +
      `Parameters:\n` +
      `-h / --help: Display usage\n` +
      `-e / --env {path}: Path to .env file. Defaults to './.env'\n` +
      `-k / --key {variable_name: Specify a custom key name for looking up the SENDGRID_API_KEY in the environment file. Defaults to 'SENDGRID_API_KEY'\n`,
  );
};
