import axios from 'axios';

const debug = process.env.NODE_ENV === 'development';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

const onSuccess = response => {
  if(debug) console.log(`Request successful: ${response}`);
  return response.data;
};

const onError = error => {
  const { response } = error;
  if(debug) {
    console.error(`Request failed: ${error.config}`);
    if(response) {
      console.error(`Request status: ${response.status}`);
      console.error(`Request data: ${response.data}`);
      console.error(`Request headers: ${response.headers}`);
    } else {
      console.error(`Request message: ${error.message}`);
    }
  }
  return Promise.reject(response ? response.data: error);
};

export default options => {
  return client(options)
    .then(onSuccess)
    .catch(onError);
}