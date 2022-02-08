import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

import VideoPlayer from '../components/VideoPlayer';

function Home() {
   const [userUrl, setUserUrl] = useState('');
   const [videoId, setVideoId] = useState('');
   const [videoUrl, setVideoUrl] = useState('');

   const createVideo = async () => {
      try {
         const response = await fetch('/api/video/render', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoUrl: videoUrl })
         });
         const data = await response.json();
         setVideoId(data.response.id);
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      const fetchVideoUrl = async (uid) => {
         const res = await fetch(`/api/video/${uid}`);
         const result = await res.json();
         setDemoVideoUrl(result.response.url);
      }
      if (videoId) fetchVideoUrl(videoId);
   }, [videoId]);

   useEffect(() => {
      // code...
   }, [videoUrl]);

   return (
      <>
         <section className={styles.container}>
            <label className={styles.inputLabel}>
               <input
                  type="url"
                  value={userUrl}
                  className={styles.inputField}
                  placeholder=" "
                  onChange={e => setUserUrl(e.target.value)}
               />
               <p className={styles.inputHint}>ENTER YOUR URL</p>
            </label>
            
            <button className={styles.renderBtn} onClick={createVideo}>Render</button>
            <VideoPlayer src={videoUrl} text="Video is loading" spinner />
         </section>
      </>
   )
}

export default Home;

// https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4