import {useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { registerUser } from 'utils/api';
import styles from '@/styles/Auth.module.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            const result = await registerUser(name, email, password);
            router.push('/login?registered=true');
        } catch(err) {
            setError(err.message || 'Failed to Register. Please try again.');
        } finally{
            setLoading(false);
        }
    };

    return(
        <div className={styles.authContainer}>
            <div className={styles.authForm}>
                <h1>Create an Account</h1>
                {error && <div className={styles.authError}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.authFormGroup}>
                        <label htmlFor='name'>Full Name</label>
                        <input
                            id='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Enter your full name'
                        />
                    </div>

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
                            placeholder='Create a password'
                        />
                    </div>

                    <div className={styles.authFormGroup}>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            id='confirmPassword'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='Confirm your password'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className={styles.authSubmitButton}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div className={styles.authLinks}>
                    <p>Already have an account? <Link href='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
}