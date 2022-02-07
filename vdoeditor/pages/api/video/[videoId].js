import Shotstack from 'shotstack-sdk';

function sleep(n) {
   return new Promise((resolve, reject) => {
      setTimeout(resolve, n);
   });
}

export default async function handler(req, res) {
   const { videoId } = req.query;
   const shotApi = new Shotstack.EditApi();
   await sleep(8500);
   const data = await shotApi.getRender(videoId);
   console.log(data);
   res.status(200).json({ ...data });
}