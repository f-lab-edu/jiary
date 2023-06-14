import axios from 'axios';

const instance = axios.create({
  // TODO: base 변경 예정
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-type': 'application/json',
  },
  params: {},
  timeout: 15 * 1000,
});

export default instance;
