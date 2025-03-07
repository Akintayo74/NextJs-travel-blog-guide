import MainImage from "components/MainImage";
import LatestPosts from "components/LatestPosts";
import Advert from "components/Advert";
import ProtectedRoute from "components/ProtectedRoute";

export default function Blog (){
    return (
        <ProtectedRoute>
            <div>
                <MainImage />
                <LatestPosts showHeader={false}/>
                <Advert />
            </div>
        </ProtectedRoute>
    )
}