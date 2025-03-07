import Main from '../../components/Main';
import Advert from '../../components/Advert';
import LatestPosts from '../../components/LatestPosts';
import ProtectedRoute from '../../components/ProtectedRoute';


export default function Home(){
  return(
    <ProtectedRoute>
      <div>
        <Main />
        <Advert />
        <LatestPosts />
        <Advert />
      </div>
    </ProtectedRoute>
  )
}