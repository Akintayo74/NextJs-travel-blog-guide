import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";

const AuthMiddleware = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    //show Loading... or nothing while checking authentication
    if (loading || !user) {
        return <div>Loading...</div>
    }

    return <>{ children }</>
};

export default AuthMiddleware;