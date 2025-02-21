import "@/styles/globals.css";
import { Work_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import Head from 'next/head';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans'
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta'
})

export default function App({ Component, pageProps }) {
  return(
    <div className={`${workSans.variable} ${plusJakarta.variable}`}>
      <Head>
        <title>Travel Blog</title>
        <meta name='' content=''></meta>
        <meta name='' content=''></meta>
      </Head>
      <Component {...pageProps} />
    </div>
  ) 
}
