// import Image from 'next/image';
import Hero from '../../components/Hero';
import Main from '../../components/Main';
import Advert from '../../components/Advert';

export default function Home(){
  return(
    <div>
      <Hero />
      <Main />
      <Advert />
    </div>
  )
}