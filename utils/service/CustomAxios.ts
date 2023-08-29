import axios from 'axios';

const client = axios.create({
  baseURL: 'https://architectural-bird-psmportfolio.koyeb.app'
});

export default client;
