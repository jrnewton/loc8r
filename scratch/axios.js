'use strict';

const axios = require('axios');

(async function get() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    console.log('test 1', response.data);
  } catch (error) {
    console.error('test 1', error.message);
  }
})();

axios
  .get('https://jsonplaceholder.typicode.com/xtodos/1')
  .then((response) => {
    console.log('test 2', response.data);
  })
  .catch((error) => {
    console.error('test 2', error.message);
  });

(async function getWithParam() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          userId: 1,
          id: 1
        }
      }
    );
    console.log('test 3', response.data);
  } catch (error) {
    console.log('test 3', error);
  }
})();

axios
  .get('https://jsonplaceholder.typicode.com/xtodos/1')
  .then((response) => {
    console.log('test 4', response.data);
  })
  .catch((error) => {
    console.error('test 4', error.message);
  });

const config = {
  url: 'https://jsonplaceholder.typicode.com/posts',
  method: 'get',
  params: {
    userId: 1,
    id: 1
  }
};

axios
  .request(config)
  .then((response) => {
    console.log('test 5', response.data);
  })
  .catch((error) => {
    console.log('test 5', error);
  });
