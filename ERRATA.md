# Errata and notes on *Getting Mean with Mongo, Express, Angular, and Node Second Edition*

All page numbers are printed page number not PDF page numbers, although my source is a PDF version of the book. 

I am not following the book's usage of 'pug' as the UI template engine so I have not validated pug specific content.

## Chapter 5

- Page 124 et al:  additional options are required when making a Mongoose connection to avoid deprecation warnings: 
```
useUnifiedTopology: true, useCreateIndex: true 
```

- Page 151: mLab/Heroku setup instructions are no longer valid as [mLab is now part of MongoDB Atlas](https://docs.mlab.com/mlab-to-atlas/).  You must use the Atlas process.

## Chapter 6

- Page 180 et al: Using the 'limit' param in geoOptions will give 
```
$geoNear no longer supports the 'limit' parameter. Use a $limit stage instead
```
Use [this code instead](https://github.com/rocketnewton/meanwifi/blob/c4b1b899a3d515619fe21b10b11f16945562554b/app_api/controllers/locations.js#L79).

- Page 182:  the Extra credit blurb (pass in max distance) indicates the code is on the author's github but I do not see it. 

- Page 187 / Listing 6.5
  - the 'coords' property has a syntax error.  It is missing it's property name 'coordinates'.

  - the opening hours also has a syntax error.  It is missing it's property name 'openingHours'. 