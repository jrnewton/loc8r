[![lint](https://github.com/jrnewton/meanwifi/workflows/lint/badge.svg)](https://github.com/jrnewton/meanwifi/actions?query=workflow%3Alint) [![CodeQL](https://github.com/jrnewton/meanwifi/workflows/CodeQL/badge.svg)](https://github.com/jrnewton/meanwifi/actions?query=workflow%3ACodeQL)

# Example App using the ~~MEAN~~ MEVN stack

The Loc8r App lists nearby places with Wi-Fi where people can go to get some work done. It is being built following the _[Getting MEAN](https://www.manning.com/books/getting-mean-with-mongo-express-angular-and-node)_ book from Manning.

Live demo: http://meanwifi.herokuapp.com/

[Errata and notes on the book](ERRATA.md)

[Blog covering this project](https://www.3plb.com)

## Differences between book code and this code

- Vue 3 instead of Angular
- Handlebars for UI templating instead of pug. See below.
- Use Mongoose.createConnection instead of default global connection.
- app and db code are structured a bit different to allow for Mocha to do cleanup at end of test run.
- Different HTTP status codes, to differentiate _not found_ vs. _error_.

## Additional dependencies

- [serve-favicon](https://www.npmjs.com/package/serve-favicon) for serving up [favicon.ico](assets/favicon.ico). Browsers request it, and I like seeing a clean set of responses from Express.
- [handlebars](https://www.npmjs.com/package/hbs) for UI templating. The module linked is 'hbs' which is the Express view engine, which in turn uses the 'handlebars' template engine. The book uses pug but I really don't care for it's syntax preferring a library that sticks with small HTML friendly formatting. I wrote [a few hbs helper routines](hbs-helpers.js) used to output the star rating icons.
- [luxon](https://www.npmjs.com/package/luxon) for date formatting on the frontend. The book wrote a simple routine by hand but I'd rather not reinvent that wheel. Luxon was [recommended by Moment](https://momentjs.com/docs/#/-project-status/) as a modern alternative.

## Additional devDependencies

- [mocha](https://www.npmjs.com/package/mocha) and [supertest](https://www.npmjs.com/package/supertest) for testing. See [test](test) for the small set. Right now I've got integration tests of the API service but will expand unit tests once some of the code is factored more. The book didn't cover testing but I like having tests sooner than later when developing.
- [eslint](https://www.npmjs.com/package/eslint) to ensure my Javascript code is proper and safe. Configuration is done in [.eslintrc.js](.eslintrc.js). I'm very much looking forward to moving to Typescript.
- [typescript](https://www.npmjs.com/package/typescript), various type definitions and a [tsconfig](https://github.com/jrnewton/meanwifi/blob/main/tsconfig.json) to enable type checking in VSCode and cli.

