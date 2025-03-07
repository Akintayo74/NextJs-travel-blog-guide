import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { loginUser } from '../../utils/api';
import styles from '@/styles/Auth.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const result = await loginUser(email, password);
            localStorage.setItem('authToken', result.data.token);
            localStorage.setItem('userData', JSON.stringify(result.data));

            router.push('/index');
        } catch(err) {
            setError(err.message || 'Failed to login. Please try again');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={styles.authContainer}>
            <div>
                <h1>Login To MetaBlog</h1>
                {error && <div className={styles.authError}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.authFormGroup}>
                        <label htmlFor='email'>Email</label>
                        <input 
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter your email'
                        />
                    </div>

                    <div className={styles.authFormGroup}>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Enter your password'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className={styles.authSubmitButton}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <div className={styles.authLinks}>
                    <p>Don't have an account? <Link href='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
}


