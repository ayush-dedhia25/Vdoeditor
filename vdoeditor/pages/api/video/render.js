import Shotstack from 'shotstack-sdk';
import axios from 'axios';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';

const defaultClient = Shotstack.ApiClient.instance;
defaultClient.basePath = 'https://api.shotstack.io/stage';

const DeveloperKey = defaultClient.authentications['DeveloperKey'];
const shotStackApiKey = process.env.shotStackApiKey;

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



         // BElow code will be used to fetch json file of template from DB, replace the dynamic properties with user Input
         // ANd then send JSON to shotstack via axios request

         const json2 = {
            "merge": [
               {
                  "find": "NAME",
                  "replace": "World"
               },
               {
                  "find": "FROM NAME",
                  "replace": "Karan"
               }
            ],
            "timeline": {
               "tracks": [
                  {
                     "clips": [
                        {
                           "asset": {
                              "type": "html",
                              "html": "<p>MERRY CHRISTMAS</p>",
                              "css": "p { font-family: \"Montserrat\"; color: #ffffff; font-size: 14px; text-align: center; font-weight: bold }",
                              "width": 450,
                              "height": 30
                           },
                           "start": 3.8,
                           "length": 3.4,
                           "transition": {
                              "in": "fade",
                              "out": "slideDown"
                           },
                           "offset": {
                              "x": -0.1,
                              "y": 0.08
                           },
                           "position": "right"
                        },
                        {
                           "asset": {
                              "type": "html",
                              "html": "<p>{{ NAME }}</p>",
                              "css": "p { font-family: \"Amatic SC\"; color: #ffffff; font-size: 64px; text-align: center; font-weight: bold; }",
                              "width": 450,
                              "height": 100
                           },
                           "start": 4,
                           "length": 2.8,
                           "transition": {
                              "in": "fade",
                              "out": "slideDown"
                           },
                           "offset": {
                              "x": -0.1
                           },
                           "position": "right"
                        },
                        {
                           "asset": {
                              "type": "html",
                              "html": "<p>Warmest wishes and all the best for the New Year</p>",
                              "css": "p { font-family: \"Amatic SC\"; color: #ffffff; font-size: 54px; text-align: center; font-weight: bold; }",
                              "width": 450,
                              "height": 200
                           },
                           "start": 7.2,
                           "length": 3.4,
                           "transition": {
                              "in": "fade",
                              "out": "slideDown"
                           },
                           "offset": {
                              "x": -0.1
                           },
                           "position": "right"
                        },
                        {
                           "asset": {
                              "type": "html",
                              "html": "<p>FROM</p>",
                              "css": "p { font-family: \"Montserrat\"; color: #ffffff; font-size: 14px; text-align: center; font-weight: bold }",
                              "width": 450,
                              "height": 30
                           },
                           "start": 10.4,
                           "length": 3.4,
                           "transition": {
                              "in": "fade",
                              "out": "slideDown"
                           },
                           "offset": {
                              "x": -0.1,
                              "y": 0.08
                           },
                           "position": "right"
                        },
                        {
                           "asset": {
                              "type": "html",
                              "html": "<p>{{FROM NAME}}</p>",
                              "css": "p { font-family: \"Amatic SC\"; color: #ffffff; font-size: 64px; text-align: center; font-weight: bold; }",
                              "width": 450,
                              "height": 100
                           },
                           "start": 10.6,
                           "length": 3,
                           "transition": {
                              "in": "fade",
                              "out": "slideDown"
                           },
                           "offset": {
                              "x": -0.1
                           },
                           "position": "right"
                        }
                     ]
                  },
                  {
                     "clips": [
                        {
                           "asset": {
                              "type": "video",
                              "src": "https://shotstack-content.s3-ap-southeast-2.amazonaws.com/christmas-2020/christmas-tree-branded.mp4",
                              "volume": 1
                           },
                           "start": 0,
                           "length": 12
                        }
                     ]
                  }
               ],
               "fonts": [
                  {
                     "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/AmaticSC-Bold.ttf"
                  },
                  {
                     "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/Montserrat-Regular.ttf"
                  }
               ],
               "background": "#000000"
            },
            "output": {
               "format": "mp4",
               "resolution": "sd"
            }
         }

         json2.merge[0].replace = userUrl
         json2.merge[1].replace = userText

         console.log(json2.merge[0].replace)

         const render = await axios({
            method: 'post',
            url: 'https://api.shotstack.io/stage/render',
            headers: {
               'x-api-key': shotStackApiKey,
               'content-type': 'application/json'
            },
            data: json2
         })
            .then((response) => {
               return response.data
            }, (error) => {
               return error
            });

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