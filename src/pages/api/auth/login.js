import cookie from 'cookie';
import handler from '../hello';

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const { email, password } = req.body;

    try {
        const response = await fetch('https://meta-blog-api-2n32.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json;

        if (data.success) {
            ///set the JWT token in an HTTP only cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', data.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
            }));

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
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    }
}