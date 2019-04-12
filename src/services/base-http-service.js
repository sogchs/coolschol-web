import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  withCredentials: true
});

export default http;