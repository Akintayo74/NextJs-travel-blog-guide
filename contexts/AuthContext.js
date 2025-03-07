import {createContext, useContext, useState, useEffect} from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if(userData) {
            setUser(JSON.parse(userData))
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem('authToken', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);