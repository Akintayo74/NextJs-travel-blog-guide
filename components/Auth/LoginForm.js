import styles from '@/styles/LoginForm.module.css';
import Image from 'next/image'
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/AuthContext';
import { authService } from 'services/api';
import Link from 'next/link';

// Okay, I want to create a react form template using the thumbnail image from the figma file on the right and a signup and login form on the left like what i found on dribble. I'll then use GSAP to make the ui sleeker and better.

export default function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { login } = useContext(AuthContext);

    //create a function that updates the ui state as the user types into the form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        //create a Try Catch block
        try{
            //create a variable named response that AWAITs authService
            const response = await authService.login(formData);
            if (response.success) {
                login(response.data);
                router.push('/');
            } else {
                setError(response.message || 'Login failed. Please try again.')
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login.');
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <div className = {styles.login__container}>
            <div className={styles.login__wrapper}>
                <div className = {styles.login__left}>
                    <h1>Holla, Welcome back!</h1>
                    {error && <div className={styles.error_message}>{error}</div>}
                    <div className={styles.login__leftForm}>
                        <form className={styles.login__form} onSubmit={handleSubmit}>
                            <label>
                                <input placeholder='Your Email' type='email' name='email' value={formData.email} onChange={handleChange} required />
                            </label>
                            <label>
                                <input placeholder='Password' type='password' name='password' value={formData.password} onChange={handleChange} required/>
                            </label> 

                            <div className={styles.login__button}>
                                <button type='submit' disabled={isLoading}>
                                    {isLoading ? 'Logging In...' : 'Login'}
                                </button>
                            </div>
                        </form>
                        <p className={styles.login__signupLink}>Don't have an account? <Link href='/auth/signup'>Sign Up</Link></p>
                    </div>
                    
                </div>
                <div className={styles.login__right}>
                    {/* <h1>Everyday Life</h1> */}
                    <Image 
                        src='/images/thumbnail.jpg'
                        fill
                        className={styles.login__image}
                        priority
                        alt='thumbnail'
                    />
                </div>
            </div>
        </div>
    )
}