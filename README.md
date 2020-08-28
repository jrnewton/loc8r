# Example App using the MEAN stack

The Loc8r App lists nearby places with Wi-Fi where people can go to get some work done.  It is being built following the *[Getting MEAN](https://www.manning.com/books/getting-mean-with-mongo-express-angular-and-node)* book from Manning.

Live demo: http://meanwifi.herokuapp.com/

## Some notes on modules not included in the book

- [https://www.npmjs.com/package/serve-favicon](serve-favicon) for serving up [https://raw.githubusercontent.com/rocketnewton/meanwifi/main/public/favicon.ico](favicon.ico).  Browsers request it, and I like seeing a clean set of responses from Express.
- [https://www.npmjs.com/package/hbs](handlebars) for UI templating.  The module linked is 'hbs' which is the Express view engine, which in turn uses the 'handlebars' template engine.  The book uses pug but I really don't care for it's syntax preferring a library that sticks with small HTML friendly formatting.  I wrote a [hbs-helpers.js](few hbs helper routines) used to output the star rating icons.
- [https://www.npmjs.com/package/mocha](mocha) and [https://www.npmjs.com/package/supertest](supertest) for testing.  See [tests](tests) for the small set.  Right now I've got integration tests of the API service but will expand unit tests once some of the code is factored more.  The book didn't cover testing but I like having tests sooner than later when developing.
- [https://www.npmjs.com/package/eslint](eslint) to ensure my Javascript code is proper and safe.  Configuration is done in [.eslintrc](.eslintrc).  I'm very much looking forward to moving to Typescript.