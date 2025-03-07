import "@/styles/globals.css";
import { Work_Sans, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { ThemeProvider } from "components/ThemeContext";
import { AuthProvider } from "contexts/AuthContext";

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

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-serif'
})

export default function App({ Component, pageProps }) {
  return(
      <div className={`${workSans.variable} ${plusJakarta.variable} ${sourceSerif.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <Head>
              <title>Travel Blog</title>
              <meta name='' content=''></meta>
              <meta name='' content=''></meta>
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </div>
  ) 
}
