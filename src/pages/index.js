import Main from '../../components/Main';
import Advert from '../../components/Advert';
import LatestPosts from '../../components/LatestPosts';
// import FloatingWriteButton from '../../components/WriteButton';


export default function Home(){
  return(
    <div>
      {/* <FloatingWriteButton /> */}
      <Main />
      <Advert />
      <LatestPosts />
      <Advert />
    </div>
  )
}