export const API_BASE_URL = '';

export async function loginUser(email, password){
    try{
        const response = await fetch(`/api/proxy/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Login Failed')
        }
        return data;
    } catch(error) {
        console.error('Login error: ', error);
        throw error;
    }
}

// export async function registerUser(name, email, password) {
//     try{
//         const response = await fetch(`/api/proxy/auth/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({name, email, password}),
//         });
        
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || 'Registration failed')
//         }

//         return data;
//     } catch(error) {
//         console.error('Registration error: ', error);
//         throw error;
//     }
// }


export async function registerUser(name, email, password) {
    const url = `${API_BASE_URL}/api/proxy/auth/register`;
    console.log('Sending request to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      console.log('Response status:', response.status);
      
      // If it's not JSON, let's see what the actual response is
      const text = await response.text();
      console.log('Response text:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
}