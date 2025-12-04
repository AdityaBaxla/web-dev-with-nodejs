const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/posts/2')
.then(response => console.log(response.data))
.catch(error => console.error(`ERROR: ${error}`))