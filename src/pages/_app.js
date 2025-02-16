import "@/styles/globals.css";
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function App({ Component, pageProps }) {
  return(
    <div className={workSans.className}>
      <Component {...pageProps} />
    </div>
  ) 
}
