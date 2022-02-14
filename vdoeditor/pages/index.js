import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

import VideoPlayer from '../components/VideoPlayer';


const json2 = {
   "merge": [
      {
         "find": "NAME",
         "replace": 'karan'
      },
      {
         "find": "FROM NAME",
         "replace": 'test'
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



function Home() {



   // below data state will be set by json.merge array and similarly have set form in return snnipet with json.merge.map(data.map)
   const [data, setData] = useState(json2.merge);

   const handleFormChange = (index, event) => {
      let changedData = [...data];
      changedData[index].replace = event.target.value;
      setData(changedData);
      console.log('openchangedata', data);
   }




   // User Input States
   const [userUrl, setUserUrl] = useState('');
   const [userText, setUserText] = useState('');
   const [videoUrl, setVideoUrl] = useState('');

   // Video Render States
   const [videoId, setVideoId] = useState('');

   // Function to fetch & render the video.
   const createVideo = async () => {
      try {
         const response = await fetch('/api/video/render', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userUrl, userText })
         });

         if (response.status === 404 || response.status === 405) {
            setVideoId('');
         } else {
            const data = await response.json();
            console.log(data);
            setVideoId(data?.response?.id);
         }
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      console.log(videoId);
      const fetchVideoUrl = async (uid) => {
         const res = await fetch(`/api/video/${uid}`);
         const result = await res.json();
         setVideoUrl(result.response.url);
         console.log(result);
      }
      if (videoId) fetchVideoUrl(videoId);
   }, [videoId]);

   useEffect(() => {/* code... */ }, [videoUrl]);

   return (
      <>
         <section className={styles.container}>
            <div className="App">
               <form>
                  {data.map((input, index) => {
                     return (
                        <div key={index}>
                           {input.find} :
                           <input
                              className={styles.inputField}
                              name={input.name}
                              placeholder='Name'
                              value={input.replace}
                              onChange={event => handleFormChange(index, event)}
                           />
                        </div>
                     )
                  })}
               </form>
            </div>


            <button className={styles.renderBtn} onClick={createVideo}>Render</button>
            <VideoPlayer src={videoUrl} text="Video is loading" spinner />
         </section>

      </>
   )
}

export default Home;