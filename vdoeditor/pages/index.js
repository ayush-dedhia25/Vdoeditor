import { useState, useEffect } from 'react';

function Home() {
   const [videoUrl, setVideoUrl] = useState('');
   const [videoId, setVideoId] = useState('');

   const createVideo = async () => {
      try {
         const response = await fetch('/api/video/render', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoUrl: videoUrl })
         });
         const data = await response.json();
         setVideoId(data.response.id);
         console.log('1', data);
         console.log('2', response);
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      const fetchVideoUrl = async (uid) => {
         const res = await fetch(`/api/video/${uid}`);
         const result = await res.json();
         setVideoUrl(result.response.url);
      }
      if (videoId) fetchVideoUrl(videoId);
   }, [videoId]);

   useEffect(() => {
      // code...
   }, [videoUrl]);

   return (
      <>
         <input
            type="text"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
         />
         <button onClick={createVideo}>Print</button>
         {videoUrl && (
            <video width={320} height={240} controls>
               Your browser doesnt support video tag!
               <source src={videoUrl} type="video/mp4" />
            </video>
         )}
         <p>{videoId}</p>
      </>
   )
}

export default Home;

// https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4