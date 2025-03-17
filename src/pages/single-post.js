import Header from "components/Header";
// import Advert from "components/Advert";
import AuthMiddleware from "components/AuthMiddleware";

export default function Blog(){
    return (
        <AuthMiddleware>
            <div>
                <Header />
            </div>
        </AuthMiddleware>
    )
}