import LatestPosts from "components/LatestPosts";
import ContactCard from "components/ContactCard";
import AuthMiddleware from "components/AuthMiddleware";

export default function About(){
    return (
        <AuthMiddleware>
            <div>
                <ContactCard />
                <LatestPosts />
            </div>
        </AuthMiddleware>
    )
}