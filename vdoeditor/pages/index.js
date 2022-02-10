import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

import VideoPlayer from '../components/VideoPlayer';

function Home() {
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
            <label className={styles.inputLabel}>
               <input
                  type="url"
                  value={userUrl}
                  className={styles.inputField}
                  placeholder=" "
                  onChange={({ target }) => setUserUrl(target.value)}
               />
               <p className={styles.inputHint}>ENTER TO Name</p>
            </label>

            <label className={`${styles.inputLabel} mt-2`}>
               <input
                  type="text"
                  value={userText}
                  className={styles.inputField}
                  placeholder=" "
                  onChange={({ target }) => setUserText(target.value)}
               />
               <p className={styles.inputHint}>ENTER From Name</p>
            </label>

            <button className={styles.renderBtn} onClick={createVideo}>Render</button>
            <VideoPlayer src={videoUrl} text="Video is loading" spinner />
         </section>
      </>
   )
}

export default Home;