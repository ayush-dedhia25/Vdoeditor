import axios from 'axios';

const shotStackApiKey = process.env.shotStackApiKey;

function sleep(n) {
   return new Promise((resolve, reject) => {
      setTimeout(resolve, n);
   });
}

export default async function handler(req, res) {

   const { videoId } = req.query;

   await sleep(8500);
   const data = await axios({
      method: 'get',
      url: 'https://api.shotstack.io/stage/render/' + videoId,
      headers: {
         'x-api-key': shotStackApiKey,
         'Accept': 'application/json',
      }
   })
      .then((response) => {
         console.log('returnstatus', response);
         return response.data
      }, (error) => {
         return error
      });

   console.log(data);
   res.status(200).json({ ...data });
}