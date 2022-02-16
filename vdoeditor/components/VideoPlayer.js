import { useEffect } from 'react';
import styles from '../styles/VideoPlayer.module.css';

function VideoPlayer({ src, spinner, text }) {
   useEffect(() => {/* code... */}, [src]);
   
   return (
      <div className={styles.videoContainer}>
         {src ? (
            <video className={styles.video} controls>
               Your browser doesnt support video tag!
               <source src={src} type="video/mp4" />
            </video>
         ) : (
            <div className={styles.shimmer}>
               {spinner && <div className={styles.spinner}></div>}
               {text}
            </div>
         )}
      </div>
   );
}

export default VideoPlayer;