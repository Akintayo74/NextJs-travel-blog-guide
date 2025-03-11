export const API_BASE_URL = '';



const BACKEND_URL = 'https://meta-blog-api-2n32.onrender.com';

export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  
  console.log(`Proxying ${req.method} request to ${apiPath}`);
  
  try {
    console.log('Request body:', req.body);
    console.log('Request headers:', {
      ...req.headers,
      authorization: req.headers.authorization ? '[REDACTED]' : undefined
    });
    
    const targetUrl = `${BACKEND_URL}/api/${apiPath}`;
    console.log('Target URL:', targetUrl);
    
    // Forward the request to the backend API
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization header if present
        ...(req.headers.authorization ? { 'Authorization': req.headers.authorization } : {}),
      },
      ...(req.method !== 'GET' && req.body ? { body: JSON.stringify(req.body) } : {}),
    });
    
    console.log('Backend API response status:', response.status);
    
    // Get the response data
    let responseText;
    try {
      responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Parse as JSON if possible
      const data = JSON.parse(responseText);
      return res.status(response.status).json(data);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      // Return the text instead
      return res.status(response.status).send(responseText || 'No response content');
    }
  } catch (error) {
    console.error('API proxy error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}




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















// // pages/api/proxy/[...path].js
// import { NextApiRequest, NextApiResponse } from 'next';

// const BACKEND_URL = 'https://meta-blog-api-2n32.onrender.com';

// export default async function handler(req, res) {
//   const { path } = req.query;
//   const apiPath = Array.isArray(path) ? path.join('/') : path;
  
//   console.log(`Proxying ${req.method} request to ${apiPath}`);
//   console.log('Request headers:', req.headers);
//   console.log('Request body:', req.body);
  
//   try {
//     // Forward the request to the backend API
//     const response = await fetch(`${BACKEND_URL}/api/${apiPath}`, {
//       method: req.method,
//       headers: {
//         'Content-Type': 'application/json',
//         // Forward authorization header if present
//         ...(req.headers.authorization ? { 'Authorization': req.headers.authorization } : {}),
//       },
//       ...(req.method !== 'GET' && req.body ? { body: JSON.stringify(req.body) } : {}),
//     });
    
//     // Get the response data
//     let data;
//     try {
//       data = await response.json();
//       console.log('Response data:', data);
//     } catch (parseError) {
//       console.error('Failed to parse response as JSON:', parseError);
//       // Return the text instead
//       const text = await response.text();
//       console.log('Response text:', text);
//       return res.status(response.status).send(text);
//     }
    
//     // Forward the response status and data back to the client
//     res.status(response.status).json(data);
//   } catch (error) {
//     console.error('API proxy error details:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error',
//       error: error.message 
//     });
//   }
// }