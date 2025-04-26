import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(null);

        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user){
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push('/auth/login')
            }
        }, [router]);

        if (isAuthenticated === null) {
            return <div>Loading...</div>;
        }

        if (isAuthenticated === false) {
            return null;
        }

        return <Component {...props} />
    }
}