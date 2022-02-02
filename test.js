const axios = require('axios');

const instance = axios.create({
   baseURL: 'https://api.shotstack.io/stage',
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': 'KQEO1Rcq1L7NjdbhQsBYC530SS93oQKA30TxlTAJ',
   },
});

const videoContent = {
   timeline: {
      soundtrack: {
         src: 'https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/music/unminus/palmtrees.mp3',
         effect: 'fadeout'
      },
      tracks: [
         {
            clips: [
               {
                  asset: {
                     type: 'title',
                     text: 'Hello, World',
                     style: 'minimal'
                  },
                  start: 0,
                  length: 5,
                  effect: 'zoomIn',
               },
            ]
         }
      ]
   },
   output: {
      format: 'mp4',
      resolution: 'sd'
   }
}

instance
   .post('/render', videoContent)
   .then((res) => {
      console.log(res);
   }).catch((err) => console.log(err.message));