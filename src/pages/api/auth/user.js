// pages/api/auth/user.js
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    // For validation only - we don't need to verify the signature
    // just check if the token is present and well-formed
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Make a request to your API to validate the token and get user info
    const response = await fetch('https://meta-blog-api-2n32.onrender.com/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({
        success: true,
        user: {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
        },
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
}