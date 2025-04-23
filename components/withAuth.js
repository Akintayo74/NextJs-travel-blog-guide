import { useEffect } from "react";
import { useRouter } from "next/router";

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();

        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user){
                router.push('/auth/login');
            }
        }, [])

        return <Component {...props} />
    }
}