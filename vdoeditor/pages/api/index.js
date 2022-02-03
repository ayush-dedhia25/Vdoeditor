import Shotstack from 'shotstack-sdk';

const defaultClient = Shotstack.ApiClient.instance;
defaultClient.basePath = 'https://api.shotstack.io/stage';

const DeveloperKey = defaultClient.authentications['DeveloperKey'];
DeveloperKey.apiKey = 'KQEO1Rcq1L7NjdbhQsBYC530SS93oQKA30TxlTAJ';

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

function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

async function feturl(videoId) {
   await sleep(5000);
   api.getRender(videoId).then((data) => {
      console.log(`[STATUS] ${data.response.status}`);
      console.log(data);
      if (data.response.status === 'done') {
         console.log(data.response.url);
      }
   }).catch((err) => console.log(err))
}

export default function handler(req, res) {
   const api = new Shotstack.EditApi();
   api.postRender(videoEdit).then((render) => {
      const videoId = render.response.id;
      console.log(render);
      feturl(videoId);
      res.status(200).json({});
   }).catch((err) => console.log(err));
}