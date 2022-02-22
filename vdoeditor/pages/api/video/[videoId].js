import { StatusCodes } from 'http-status-codes';
import { Axios } from '../../../shared/axios';

function sleep(n) {
   return new Promise((resolve, reject) => {
      setTimeout(resolve, n);
   });
}

export default async function handler(req, res) {
   try {
      // Extracting Video ID from the URL
      const { videoId } = req.query;

      // Waiting for the Video to Render
      await sleep(8500);

      // Getting the Rendered Video Info
      const response = await Axios.get(`/render/${videoId}`);

      // Logging the data for testing purpose only
      console.log(response.data);

      // Sending Back the Video Render Info to the Client
      res.status(StatusCodes.OK);
      res.json(response.data);
      res.end();
   } catch (err) {
      // Error Handling
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send({ message: 'Internal Server Error Occured!' });
      res.end();
   }
}