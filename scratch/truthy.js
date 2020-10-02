'use strict';

const values = [
//examples from https://masteringjs.io/tutorials/fundamentals/truthy
  //truthy 
  true, {}, [], 42, "0", "false", new Date(), -42, 12n, 3.14, -3.14, Infinity, -Infinity,
  //falsy 
  false, 0, -0, 0n, "", null, undefined, NaN,

//shown above with Date, but interesting none the less.
  //all objects are truthy 
  new Boolean(false),
];

for (let i=0; i<values.length; i++) { 
  let val = values[i];
  if (val) {
    print(true, val);
  }
  else { 
    print(false, val);
  }
}

function print(bool, val) {
  console.log(`${typeof val} ${val} = ${bool}`);
}
