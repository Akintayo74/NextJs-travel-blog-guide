import "@/styles/globals.css";
import { Work_Sans, Plus_Jakarta_Sans } from 'next/font/google';

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
      <Component {...pageProps} />
    </div>
  ) 
}
