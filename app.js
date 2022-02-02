const Shotstack = require('shotstack-sdk');

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

const api = new Shotstack.EditApi();
api.postRender(videoEdit).then((render) => {
   const videoId = render.response.id;
   api.getRender(videoId).then((data) => {
      console.log(`[STATUS] ${data.response.status}`);
      console.log(data);
      if (data.response.status === 'done') {
         console.log(data.response.url);
      }
   }).catch((err) => console.log(err));
}).catch((err) => console.log(err));

// dc78620b-378d-481d-a8e3-bdb7bce2211f
// https://cdn.shotstack.io/au/v1/5vjiyd91db/09486f64-7fbb-4f40-95bc-f2b535511a40.mp4