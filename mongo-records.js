const records = [
  {
    "name": "Starcups",
    "address": "125 High Street, Reading, RG6 1PS",
    "reviewLead": "Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
    "coords": [
      -0.9690884,
      51.455041
    ],
    "rating": 3.0,
    "facilities": [
      "Hot drinks",
      "Cold Drinks",
      "Premium wifi"
    ],
    "distance": "100m",
    "openingTimes": [
      {
        "days": "Monday - Friday",
        "openingTime": "7:00am",
        "closingTime": "7:00pm",
        "closed": false
      },
      {
        "days": "Saturday",
        "openingTime": "8:00am",
        "closingTime": "5:00pm",
        "closed": false
      },
      {
        "days": "Sunday",
        "closed": true
      }
    ], 
    "reviews": [
      { 
        _id: ObjectId(),
        "rating": 3, 
        "author": "Simon Holmes", 
        "createdOn": new Date("Mar 12, 2017"),
        "reviewText": "What a great place. I can't say enough good things about it."
      }
    ]
  }, 
  {
    "name": "Burger Queen",
    "address": "125 High Street, Reading, RG6 1PS",
    "reviewLead": "Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
    "coords": [
      -0.9690884,
      51.455041
    ],
    "rating": 3.0,
    "facilities": [
      "Hot drinks",
      "Cold Drinks",
      "Premium wifi"
    ],
    "distance": "100m",
    "openingTimes": [
      {
        "days": "Monday - Friday",
        "openingTime": "7:00am",
        "closingTime": "7:00pm",
        "closed": false
      },
      {
        "days": "Saturday",
        "openingTime": "8:00am",
        "closingTime": "5:00pm",
        "closed": false
      },
      {
        "days": "Sunday",
        "closed": true
      }
    ], 
    "reviews": [
      { 
        _id: ObjectId(),
        "rating": 3, 
        "author": "Simon Holmes", 
        "createdOn": new Date("Mar 12, 2017"),
        "reviewText": "What a great place. I can't say enough good things about it."
      }
    ]
  }
]