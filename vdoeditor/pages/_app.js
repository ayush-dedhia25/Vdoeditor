import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Hello, World!</title>
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