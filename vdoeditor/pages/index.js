import { useState, useEffect } from 'react';

import styles from '../styles/Home.module.css';
import VideoPlayer from '../components/VideoPlayer';
import christmasTemplate from '../shared/json-templates/christmas';

function Home() {
   // User Input States
   const [videoUrl, setVideoUrl] = useState('');

   // below data state will be set by json.merge array and similarly have set form in return snnipet with json.merge.map(data.map)
   const [data, setData] = useState(christmasTemplate.merge);

   const handleFormChange = (index, event) => {
      let changedData = [...data];
      changedData[index].replace = event.target.value;
      setData(changedData);
      console.log('openchangedata', data);
   }

   // Video Render States
   const [videoId, setVideoId] = useState('');

   // Function to fetch & render the video.
   const createVideo = async () => {
      try {
         const response = await fetch('/api/video/render', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
         });

         if (response.status === 404 || response.status === 405) {
            setVideoId('');
         } else {
            const data = await response.json();
            console.log(data);
            setVideoId(data?.response.id);
         }
      } catch (err) {
         console.log(err);
      }
   }

   //Below use effect is for polling video status, it will be removed once callback function works
   useEffect(() => {
      const fetchVideoUrl = async (uid) => {
         const res = await fetch(`/api/video/${uid}`);
         const result = await res.json();
         setVideoUrl(result.response.url);
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
                              placeholder="Name"
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