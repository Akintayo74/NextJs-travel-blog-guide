// pages/api/proxy/[...path].js
import { NextApiRequest, NextApiResponse } from 'next';


const BACKEND_URL = 'https://meta-blog-api-2n32.onrender.com';

export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  
  try {
    // Forward the request to the backend API
    const response = await fetch(`${BACKEND_URL}/api/${apiPath}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization header if present
        ...(req.headers.authorization ? { 'Authorization': req.headers.authorization } : {}),
      },
      ...(req.method !== 'GET' && req.body ? { body: JSON.stringify(req.body) } : {}),
    });
    
    // Get the response data
    const data = await response.json();
    
    // Forward the response status and data back to the client
    res.status(response.status).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}