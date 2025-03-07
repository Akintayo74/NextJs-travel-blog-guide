import LatestPosts from "components/LatestPosts";
import ContactCard from "components/ContactCard";
import ProtectedRoute from "components/ProtectedRoute";

export default function About(){
    return (
        <ProtectedRoute>
            <div>
                <ContactCard />
                <LatestPosts />
            </div>
        </ProtectedRoute>
    )
}