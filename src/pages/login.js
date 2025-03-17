// pages/login.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Login from '../../components/Login';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div>
      <Login />
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;