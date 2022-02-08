import Shotstack from 'shotstack-sdk';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';

const defaultClient = Shotstack.ApiClient.instance;
defaultClient.basePath = 'https://api.shotstack.io/stage';

const DeveloperKey = defaultClient.authentications['DeveloperKey'];
DeveloperKey.apiKey = process.env.shotStackApiKey;

export default async function handler(req, res) {
   // Generating Video Meta-data
   const VideoAsset = new Shotstack.VideoAsset;
   const Clip = new Shotstack.Clip();
   const Track = new Shotstack.Track();
   const Timeline = new Shotstack.Timeline();
   const Output = new Shotstack.Output();
   const Edit = new Shotstack.Edit();

   if (req.method === 'POST') {
      try {
         // Extracting User Inputs
         const { videoUrl } = req.body;
         
         // Building Video Clips
         VideoAsset
            .setSrc(videoUrl)
            .setTrim(3);
         Clip
            .setAsset(asset)
            .setStart(0)
            .setLength(5);
         Track
            .setClips([clip]);
         Timeline
            .setTracks([track]);
         Output
            .setFormat('mp4')
            .setResolution('sd');
         Edit
            .setTimeline(timeline)
            .setOutput(output);
         
         // Editing and Rendering the Above Video Parts
         const shotApi = new Shotstack.EditApi();
         const render = await shotApi.postRender(edit);
         console.log(render);
         
         // Sending back the render information
         res.status(StatusCodes.OK);
         res.json(render);
         res.end();
      } catch (err) {
         console.log(err);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         res.send({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
         res.end();
      }
   } else {
      res.status(StatusCodes.METHOD_NOT_FOUND);
      res.send({ message: StatusCodes.METHOD_NOT_FOUND });
      res.end();
   }
}