import Shotstack from 'shotstack-sdk';

const defaultClient = Shotstack.ApiClient.instance;
defaultClient.basePath = 'https://api.shotstack.io/stage';

const DeveloperKey = defaultClient.authentications['DeveloperKey'];
DeveloperKey.apiKey = 'KQEO1Rcq1L7NjdbhQsBYC530SS93oQKA30TxlTAJ';

/*
let videoAsset = new Shotstack.VideoAsset;
videoAsset
   .setSrc('https://s3-ap-southeast-2.amazonaws.com/shotstack-assets/footage/skater.hd.mp4')
   .setTrim(3);

let videoClip = new Shotstack.Clip;
videoClip
   .setAsset(videoAsset)
   .setStart(0)
   .setLength(8);

let videoTrack = new Shotstack.Track;
videoTrack.setClips([videoClip]);

let videoTimeline = new Shotstack.Timeline;
videoTimeline.setTracks([videoTrack]);

let videoOutput = new Shotstack.Output;
videoOutput
   .setFormat('mp4')
   .setResolution('hd');

let videoEdit = new Shotstack.Edit;
videoEdit
   .setTimeline(videoTimeline)
   .setOutput(videoOutput);
*/

export default async function handler(req, res) {
   // Video Meta-data
   let asset = new Shotstack.VideoAsset;
   let clip = new Shotstack.Clip;
   let track = new Shotstack.Track;
   let timeline = new Shotstack.Timeline;
   let output = new Shotstack.Output;
   let edit = new Shotstack.Edit;
   
   if (req.method === 'POST') {
      try {
         // Extracting User Inputs
         const { videoUrl } = JSON.parse(req.body);
         
         // Building video parts
         asset
            .setSrc(videoUrl)
            .setTrim(3);
         clip.setAsset(asset)
            .setStart(0)
            .setLength(10);
         track
            .setClips([clip]);
         timeline
            .setTracks([track]);
         output
            .setFormat('mp4')
            .setResolution('sd');
         edit
            .setTimeline(timeline)
            .setOutput(output);
         
         // Editing video
         const shotApi = new Shotstack.EditApi();
         const render = await shotApi.postRender(edit);
         console.log(render);
         
         // Sending back the render information
         res.status(200).json({ ...render });
      } catch (err) {
         console.log(err);
         res.status(500).json({ error: err.message });
      }
   } else {
      res.status(424).send('Method not allowed!');
   }
}

/*
export default async function handler(req, res) {
   if (req.method === 'POST') {
      try {
         const { videoUrl } = JSON.parse(req.body);
         res.status(200).json({ message: { url: videoUrl }});
      } catch (err) {
         res.status(500).send(err.message);
      }
   }
}
*/