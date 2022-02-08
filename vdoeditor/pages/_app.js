import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            {/* Meta Tags Descriptions */}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            {/* Site Title */}
            <title>Vdoeditor | E-Greeting</title>
            
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600&family=Manrope:wght@300;400;500;600&display=swap" />
         </Head>
         <Component {...pageProps} />
         <Script
            id="mobile-browser-console-inspector"
            src="https://cdn.jsdelivr.net/npm/eruda@2.4.1/eruda.min.js"
            onLoad={() => eruda.init()}
         />
      </>
   )
}

export default MyApp;