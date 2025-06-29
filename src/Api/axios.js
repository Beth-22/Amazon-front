import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://amazon-api-deploy-8u2d.onrender.com',
});

export default instance;
