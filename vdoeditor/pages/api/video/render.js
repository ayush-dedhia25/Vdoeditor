import Shotstack from 'shotstack-sdk';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';

import christmasTemplate from '../../../shared/json-templates/christmas';
import { Axios } from '../../../shared/axios';

const defaultClient = Shotstack.ApiClient.instance;
defaultClient.basePath = 'https://api.shotstack.io/stage';

const DeveloperKey = defaultClient.authentications['DeveloperKey'];
const shotStackApiKey = process.env.shotStackApiKey;

export default async function handler(req, res) {
   if (req.method === 'POST') {
      try {
         // Extracting User Inputs
         const { data } = req.body;
         
         if (!data || data.length === 0) {
            res.status(StatusCodes.NOT_FOUND);
            res.json({ message: 'Please provide the user inputs!' });
            res.end();
            return;
         }
         
         christmasTemplate.merge = data;
         
         // Uploading JSON data to the server to render the video
         const response = await Axios.post('/render', christmasTemplate);
         console.log(response);
         
         // Sending back the render information
         res.status(StatusCodes.OK);
         res.json(response.data);
         res.end();
      } catch (err) {
         console.log(err);
         if (err.isAxiosError) {
            console.log('[Axios Request Error]', err.message);
         }
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