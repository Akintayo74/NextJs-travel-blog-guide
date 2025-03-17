// import { useState } from "react";
// import { useAuth } from "context/AuthContext";
// import styles from '@/styles/Auth.module.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [login, loading] = useState('');
    
//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         setError('');

//         if (!email || !password) {
//             setError('Please fill in all the fields');
//             return;
//         }

//         const result = await login(email, password);

//         if (!result.success) {
//             setError(result.message);
//         }
//     };

//     return (
//         <div className={styles.authContainer}>
//           <form className={styles.authForm} onSubmit={handleSubmit}>
//             <h1>Login</h1>
//             {error && <div className={styles.error}>{error}</div>}
            
//             <div className={styles.formGroup}>
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//               />
//             </div>
            
//             <div className={styles.formGroup}>
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//               />
//             </div>
            
//             <button 
//               type="submit" 
//               className={styles.submitButton}
//               disabled={loading}
//             >
//               {loading ? 'Login' : 'Loading...'}
//             </button>
//           </form>
//         </div>
//     );
// }

// export default Login;



















// components/Login.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '@/styles/Auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;