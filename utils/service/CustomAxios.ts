import axios from 'axios';

const client = axios.create({
  baseURL: 'https://project-rolic-json-server.herokuapp.com'
});

export default client;
