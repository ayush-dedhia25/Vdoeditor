import Shotstack from 'shotstack-sdk';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';

const defaultClient = Shotstack.ApiClient.instance;
defaultClient.basePath = 'https://api.shotstack.io/stage';

const DeveloperKey = defaultClient.authentications['DeveloperKey'];
DeveloperKey.apiKey = process.env.shotStackApiKey;

export default async function handler(req, res) {
   if (req.method === 'POST') {
      try {
         // Extracting User Inputs
         const { userUrl, userText } = req.body;
         
         if (userUrl === '' || userText === '') {
            res.status(StatusCodes.NOT_FOUND);
            res.json({ message: 'Please provide the user inputs!' });
            res.end();
            return;
         }
         
         // Generating Video By Rendering its Portion
         const VideoAsset = new Shotstack.VideoAsset();
         VideoAsset
            .setSrc(userUrl)
            .setTrim(3);
         
         const TitleAsset = new Shotstack.TitleAsset();
         TitleAsset
            .setStyle('minimal')
            .setText(userText)
            .setSize('large');
         
         const Clip = new Shotstack.Clip();
         Clip
            .setAsset(VideoAsset)
            .setStart(0)
            .setLength(5);
         
         const textClip = new Shotstack.Clip();
         textClip
            .setAsset(TitleAsset)
            .setStart(0)
            .setLength(5)
            .setEffect('zoomIn');
         
         const Track = new Shotstack.Track();
         Track.setClips([Clip, textClip]);
         
         const Timeline = new Shotstack.Timeline();
         Timeline.setTracks([Track]);
         
         const Output = new Shotstack.Output();
         Output
            .setFormat('mp4')
            .setResolution('sd');
         
         const Edit = new Shotstack.Edit();
         Edit
            .setTimeline(Timeline)
            .setOutput(Output);
         
         // Editing and Rendering the Above Video Parts
         const shotApi = new Shotstack.EditApi();
         const render = await shotApi.postRender(Edit);
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
      res.status(StatusCodes.METHOD_NOT_ALLOWED);
      res.send({ message: StatusCodes.METHOD_NOT_ALLOWED });
      res.end();
   }
}