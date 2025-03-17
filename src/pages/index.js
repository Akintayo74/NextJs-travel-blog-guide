import Main from '../../components/Main';
import Advert from '../../components/Advert';
import LatestPosts from '../../components/LatestPosts';
import AuthMiddleware from 'components/AuthMiddleware';


export default function Home(){
  return(
    <AuthMiddleware>
      <div>
        <Main />
        <Advert />
        <LatestPosts />
        <Advert />
      </div>
    </AuthMiddleware>
  )
}