import Shotstack from 'shotstack-sdk';
import axios from 'axios';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';

import { json2, Axios } from '../../../shared/shared-objects';

const defaultClient = Shotstack.ApiClient.instance;
defaultClient.basePath = 'https://api.shotstack.io/stage';

const DeveloperKey = defaultClient.authentications['DeveloperKey'];
const shotStackApiKey = process.env.shotStackApiKey;

export default async function handler(req, res) {
   if (req.method === 'POST') {
      try {
         // Extracting User Inputs
         const { toName, fromName } = req.body;

         if (toName === '' || fromName === '') {
            res.status(StatusCodes.NOT_FOUND);
            res.json({ message: 'Please provide the user inputs!' });
            res.end();
            return;
         }
         
         // Replacing the dynamic data in the video
         json2.merge[0].replace = toName;   // for e.g. To Karan
         json2.merge[1].replace = fromName; // for e.g. To Ayush
         
         // Uploading JSON data to the server to render the video
         const response = await Axios.post('/render', json2);
         
         // Sending back the render information
         res.status(StatusCodes.OK);
         res.json(response.data);
         res.end();
      } catch (err) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         res.send({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
         res.end();
      }
   } else {
      res.status(StatusCodes.METHOD_NOT_ALLOWED);
      res.send({ message: StatusCodes.METHOD_NOT_ALLOWED });
      res.end();
   }
}