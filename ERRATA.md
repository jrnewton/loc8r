# Errata and notes on _Getting Mean with Mongo, Express, Angular, and Node Second Edition_

All page numbers are printed page numbers not PDF page numbers, although my source is the PDF version of the book.

I am not following the book's usage of 'pug' as the UI template engine so I have not validated pug specific content.

## Chapter 5

- Page 124 et al: additional options are required when making a Mongoose connection to avoid deprecation warnings:

```
useUnifiedTopology: true, useCreateIndex: true
```

- Page 151: mLab/Heroku setup instructions are no longer valid as [mLab is now part of MongoDB Atlas](https://docs.mlab.com/mlab-to-atlas/). You must use the Atlas process.

## Chapter 6

- Page 180 et al: Using the 'limit' param in geoOptions will give the following warning. Use [this code instead](https://github.com/jrnewton/loc8r/blob/c4b1b899a3d515619fe21b10b11f16945562554b/app_api/controllers/locations.js#L79).

```
$geoNear no longer supports the 'limit' parameter. Use a $limit stage instead
```

- Page 182: the Extra credit blurb (pass in max distance) indicates the code is on the author's github but I do not see it.

- Page 187 / Listing 6.5

  - Syntax error on the 'coords' property, it is missing the property name 'coordinates'.

  - Syntax error on opening times data, it is missing the property name 'openingTimes'.
