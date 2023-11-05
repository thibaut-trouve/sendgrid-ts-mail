

# Sendgrid Typesafe Mail


A 100% typesafe library for sending mail using the Node.js Sendgrid SDK.

🔥 Never forget a variable in an email again.

### How does it work ?
It runs in 3 steps:
- Fetches your Sendgrid Templates using your own ApiKey
- Detects and extracts the variables from the templates
- Generate typings

### Getting started

#### 1. Install dependencies
```bash
# For npm
npm install --save sendgrid-ts-mail
# For yarn
yarn add sendgrid-ts-mail
# For pnpm
pnpm add sendgrid-ts-mail
# For bun
bun add sendgrid-ts-mail
```

#### 2. Set your apiKey
```bash
TODO
```

#### 3. Generate your typings
```bash
# For npm & yarn
npx sendgrid-ts-mail generate
# For pnpm
pnpx sendgrid-ts-mail generate
```

#### 4. Use in your app
```ts
import sgMail from 'sendgrid-ts-mail';

sgMail.send({
  from: 'hello@your-company.com',
  templateId: 'd-xxxxx', // Type-safe
  dynamicTemplateData: {
    firstname: 'John', // Type-safe
    lastname: 'Doe', // Type-safe
    business: 'Acme Corp' // Type-safe
  },
});

```



## Projects using `sendgrid-ts-mail`

Here are some projects that use `sendgrid-ts-mail`:

- [X](https://github.com/)

## Developer documentatio

### NPM scripts

- `npm start`: Run `npm run build` in watch mode
- `npm run build`: Generate bundles and typings
- `npm run test`: Run test suite once
- `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `npm run test:prod`: Run linting and generate coverage
- `npm run report-coverage`: Report the coverage with coveralls

## Credits

Made with :heart: by [@thibaut-trouve](https://twitter.com/thibaut-trouve) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
