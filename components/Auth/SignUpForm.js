import styles from '@/styles/SignUpForm.module.css';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/AuthContext';
import { authService } from 'services/api';
import Link from 'next/link';

// Okay, I want to create a react form template using the thumbnail image from the figma file on the right and a signup and login form on the left like what i found on dribble. I'll then use GSAP to make the ui sleeker and better.

export default function SignUp(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      
      const router = useRouter();
      const { login } = useContext(AuthContext);
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
          const response = await authService.signup(formData);
          
          if (response.success) {
            // If your API automatically logs in after signup and returns a token
            login(response.data);
            router.push('/'); // Redirect to homepage after signup
          } else {
            setError(response.message || 'Registration failed. Please try again.');
          }
        } catch (err) {
          setError(err.message || 'An error occurred during registration.');
        } finally {
          setIsLoading(false);
        }
    };

    return (
        <div className = {styles.signup__container}>
            <div className={styles.signup__wrapper}>
                <div className = {styles.signup__left}>
                    <h1>Bienvidos, Register!</h1>
                    {error && <div className={styles.error_message}>{error}</div>}
                    <div className={styles.signup__leftForm}>
                        <form className={styles.signup__form} onSubmit={handleSubmit}>
                            <label>
                                <input placeholder='Your Name' type='text' name='name' value={formData.name} onChange={handleChange} required/>
                            </label>
                            <label>
                                <input placeholder='Your Email' type='email' name='email' value={formData.email} onChange={handleChange} required/>
                            </label>
                            <label>
                                <input placeholder='Password' type='password' name='password' value={formData.password} onChange={handleChange} required/>
                            </label> 

                            <div className={styles.signup__button}>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Registering...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                        <p className={styles.signup__link}>Already have an account? <Link href="/auth/login">Login</Link></p>
                    </div>
                    
                </div>
                <div className={styles.signup__right}>
                    {/* <h1>Everyday Life</h1> */}
                    <Image 
                        src='/images/thumbnail2.jpg'
                        fill
                        className={styles.signup__image}
                        priority
                        alt='thumbnail'
                    />
                </div>
            </div>
        </div>
    )
}