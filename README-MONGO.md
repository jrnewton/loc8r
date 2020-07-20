# Notes on Mongo command line tools

## import/export
* mongodump / mongorestore use BSON
* mongoexport / mongoimport use JSON

### Examples:
```
mongoexport --uri mongodb://localhost/loc8r -c locations > mongo-out.json
mongoimport --uri mongodb://localhost/loc8r -c locations mongo-in.json
```

## mongo shell
It's easier to import dynamic data (like oid, dates, etc) using 
'mongo shell' scripts written in js.

For running against your local server:
```
mongo loc8r mongo-import.js
```