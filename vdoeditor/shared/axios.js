import axios from 'axios';

export const Axios = axios.create({
   baseURL: 'https://api.shotstack.io/stage',
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': process.env.shotStackApiKey
   }
});