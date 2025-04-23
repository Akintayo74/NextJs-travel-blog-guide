// pages/api-test.js
import { useState, useEffect, useContext } from 'react';
import { authService} from 'services/api';
import { AuthContext } from 'context/AuthContext';
import styles from '@/styles/ApiTest.module.css'; // You'll need to create this

export default function ApiTest() {
  const [testResults, setTestResults] = useState({
    login: null,
    token: null,
    tokenInStorage: null,
    userInContext: null
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [signupResults, setSignupResults] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  const { token, user, login, logout } = useContext(AuthContext);
  
  // Test credentials
  const testCredentials = {
    email: "katnisseverdeen@gmail.com",
    password: "Peeta"
  };
  
  const runLoginTest = async () => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Test the login
      const response = await authService.login(testCredentials);
      
      // Store results
      setTestResults({
        login: response.success,
        token: response.data?.token?.substring(0, 20) + '...',
        tokenInStorage: null, // Will be updated after login
        userInContext: null   // Will be updated after login
      });
      
      // If successful, use the context login function
      if (response.success) {
        login(response.data);
      }
    } catch (error) {
      console.error('Login test failed:', error);
      setLoginError(error.message || 'Login test failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  // After running login test, check if token is in localStorage and context
  useEffect(() => {
    if (testResults.login) {
      const storedToken = localStorage.getItem('token');
      
      setTestResults(prev => ({
        ...prev,
        tokenInStorage: storedToken ? 'Present' : 'Missing',
        userInContext: user ? 'Present' : 'Missing'
      }));
    }
  }, [testResults.login, user]);
  
  const handleLogout = () => {
    logout();
    setTestResults({
      login: null,
      token: null,
      tokenInStorage: null,
      userInContext: null
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const runSignupTest = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    setSignupError(null);
    
    try {
      // Test the signup
      const response = await authService.signup(signupFormData);
      
      setSignupResults({
        success: response.success,
        message: response.message,
        token: response.data?.token ? (response.data.token.substring(0, 20) + '...') : null
      });
      
      // If successful, use the context login function
      if (response.success) {
        login(response.data);
      }
    } catch (error) {
      console.error('Signup test failed:', error);
      setSignupError(error.message || 'Signup test failed');
    } finally {
      setIsSigningUp(false);
    }
  };
  
  return (
    <div className={styles.testContainer}>
      <h1>API Service Test</h1>
      
      <div className={styles.testSection}>
        <h2>Login Test</h2>
        <p>This will test the login functionality with test credentials</p>
        
        <button 
          onClick={runLoginTest} 
          disabled={isLoading}
          className={styles.testButton}
        >
          {isLoading ? 'Testing...' : 'Run Login Test'}
        </button>
        
        {loginError && (
          <div className={styles.errorMessage}>
            Error: {loginError}
          </div>
        )}
        
        {testResults.login !== null && (
          <div className={styles.resultsContainer}>
            <h3>Test Results:</h3>
            <ul>
              <li>Login success: <span className={testResults.login ? styles.success : styles.failure}>
                {testResults.login ? 'Success' : 'Failed'}
              </span></li>
              
              {testResults.token && (
                <li>Token received: <span className={styles.success}>{testResults.token}</span></li>
              )}
              
              {testResults.tokenInStorage && (
                <li>Token in localStorage: <span className={testResults.tokenInStorage === 'Present' ? styles.success : styles.failure}>
                  {testResults.tokenInStorage}
                </span></li>
              )}
              
              {testResults.userInContext && (
                <li>User in AuthContext: <span className={testResults.userInContext === 'Present' ? styles.success : styles.failure}>
                  {testResults.userInContext}
                </span></li>
              )}
            </ul>
          </div>
        )}
        
        {token && (
          <button 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Test Logout
          </button>
        )}
      </div>
      
      <div className={styles.currentState}>
        <h2>Current Auth State</h2>
        <p>Token in context: {token ? 'Present' : 'Not present'}</p>
        <p>User in context: {user ? `${user.name} (${user.email})` : 'Not present'}</p>
      </div>
    

        <h2>Signup Test</h2>
        <p>This will test the registration functionality with custom credentials</p>
        
        <form onSubmit={runSignupTest} className={styles.signupForm}>
            <div className={styles.formGroup}>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={signupFormData.name}
                onChange={handleSignupChange}
                required
            />
            </div>
            
            <div className={styles.formGroup}>
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={signupFormData.email}
                onChange={handleSignupChange}
                required
            />
            </div>
            
            <div className={styles.formGroup}>
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={signupFormData.password}
                onChange={handleSignupChange}
                required
            />
            </div>
            
            <button 
            type="submit" 
            disabled={isSigningUp}
            className={styles.testButton}
            >
            {isSigningUp ? 'Signing up...' : 'Test Signup'}
            </button>
        </form>
        
        {signupError && (
            <div className={styles.errorMessage}>
            Error: {signupError}
            </div>
        )}
        
        {signupResults && (
            <div className={styles.resultsContainer}>
            <h3>Test Results:</h3>
            <ul>
                <li>Registration: <span className={signupResults.success ? styles.success : styles.failure}>
                {signupResults.success ? 'Success' : 'Failed'}
                </span></li>
                <li>Message: {signupResults.message}</li>
                
                {signupResults.token && (
                <li>Token received: <span className={styles.success}>{signupResults.token}</span></li>
                )}
            </ul>
            </div>
        )}

    </div>
  );
}