import axios from 'axios';

const http = axios.create({
  baseURL: ' https://my-coolschool.herokuapp.com/',
  withCredentials: true
});

export default http;