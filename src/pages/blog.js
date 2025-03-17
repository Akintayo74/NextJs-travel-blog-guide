import MainImage from "components/MainImage";
import LatestPosts from "components/LatestPosts";
import Advert from "components/Advert";
import AuthMiddleware from "components/AuthMiddleware";

export default function Blog (){
    return (
        <AuthMiddleware>
            <div>
                <MainImage />
                <LatestPosts showHeader={false}/>
                <Advert />
            </div>
        </AuthMiddleware>
    )
}