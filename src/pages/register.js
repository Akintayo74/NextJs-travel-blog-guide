// pages/register.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Register from '../../components/Register';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div>
      <Register />
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;