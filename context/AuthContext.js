import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        //if there is a storedToken and storedUser, setToken then setUser using JSON.parse
        if (storedToken && storedUser){
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, [])

    //create a login function passing in data as a parameter then setToken with data.token and set user with data. Then set both in local storage
    const login = (data) => {
        setToken(data.token);
        setUser(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
    }

    //create a logout function that sets setToken and setItem as null and removes both of them from localStorage
    const logout = (data) => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    //return, by destructuring, the token, user, login and logout using AuthContext.provider and using it to wrap the children props

    return(
        <AuthContext.Provider value = {{token, user, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}