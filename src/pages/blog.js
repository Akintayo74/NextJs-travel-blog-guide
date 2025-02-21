import MainImage from "components/MainImage";
import LatestPosts from "components/LatestPosts";
import Advert from "components/Advert";

export default function Blog (){
    return (
        <div>
            <MainImage />
            <LatestPosts showHeader={false}/>
            <Advert />
        </div>
    )
}