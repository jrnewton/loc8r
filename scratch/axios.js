'use strict';

const axios = require('axios');

(async function test() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    console.log('response: ', response.data);
  } catch (error) {
    console.error(error.message);
  }
})();

axios
  .get('https://jsonplaceholder.typicode.com/xtodos/1')
  .then((response) => {
    console.log('response: ', response.data);
  })
  .catch((error) => {
    console.error('got an error ', error.message);
  });
