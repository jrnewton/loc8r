'use strict';

const locations = { 
  1: 
  {
    id: 1, 
    name: 'Starcups',
    address: '125 High Street, Reading, RG6 1PS',
    reviewLead: 'Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
    latLong: '51.455041,-0.9690884',
    rating: 3,
    facilities: ['Hot drinks', 'Cold Drinks', 'Premium wifi'], 
    distance: '100m', 
    openingHours: [
      'Monday - Friday : 7:00am - 7:00pm',
      'Saturday : 8:00am - 5:00pm',
      'Sunday : closed'
    ], 
    reviews: [
      { 
        rating: 3, 
        author: 'Simon Holmes', 
        date: '16 July 2013', 
        text: 'What a great place. I can\'t say enough good things about it.'
      }
    ]
  },

  2: 
  {
    id: 2, 
    name: 'Cafe Hero',
    address: '12 Main Street, Reading, RG6 1PS',
    rating: 4,
    facilities: ['Books', 'Food', 'Premium wifi'], 
    distance: '200m', 
    openingHours: [
      'Monday - Friday : 7:00am - 7:00pm',
      'Saturday : 8:00am - 5:00pm',
      'Sunday : closed'
    ], 
    reviewLead: 'Cafe Hero is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
    latLong: '51.455041,-0.9690884',
    reviews: [
      { 
        rating: 4, 
        author: 'Dave Jones', 
        date: '12 Aug 2013', 
        text: 'Great food and fast wifi!'
      }
    ]
  },

  3: 
  {
    id: 3,
    name: 'Burger Queen',
    address: '1875 Lord Tennis Blvd, Reading, RG6 1PS',
    rating: 2,
    facilities: ['Food', 'Premium wifi'], 
    distance: '500m', 
    reviewLead: 'Burger Queen is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
    latLong: '51.455041,-0.9690884',
    openingHours: [
      'Monday - Friday : 7:00am - 7:00pm',
      'Saturday : 8:00am - 5:00pm',
      'Sunday : closed'
    ], 
    reviews: [
      { 
        rating: 2, 
        author: 'Julie Brown',
        date: '5 August 2015', 
        text: 'Wifi is so so and seating could be improved.'
      }
    ]
  }
};

const about = { 
  title: 'About', 
  pageHeader: { 
    title: 'About', 
    tagline: 'Loc8r was created to help people find places to sit down and get a bit of work done.'
  } 
};

const test = { 
  title: 'Test', 
  pageHeader: { 
    title: 'Bootstrap CSS Experiments'
  }, 
  numbers: [
    "one", 
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelves"
  ]
};


module.exports = { 
  locations, 
  about, 
  test
};