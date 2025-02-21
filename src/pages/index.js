import Main from '../../components/Main';
import Advert from '../../components/Advert';
import LatestPosts from '../../components/LatestPosts';


export default function Home(){
  return(
    <div>
      <Main />
      <Advert />
      <LatestPosts />
      <Advert />
    </div>
  )
}