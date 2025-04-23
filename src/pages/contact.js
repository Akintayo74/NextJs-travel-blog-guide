import LatestPosts from "components/LatestPosts";
import ContactCard from "components/ContactCard";
import withAuth from "components/withAuth";

function About(){
    return (
        <div>
            <ContactCard />
            <LatestPosts />
        </div>
    )
}

export default withAuth(About);