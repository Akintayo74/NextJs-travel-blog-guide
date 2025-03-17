import cookie from 'cookie';

export default async function handler(req, res){
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed'})
    }
    
    const { name, email, password } = req.body;

    try {
        const response = await fetch(`https://meta-blog-api-2n32.onrender.com/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (data.success) {
            //Set JWT token in HTTP only cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', data.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, //1 week
                sameSite: 'strict',
                path: '/',
            }));

            return res.status(200).json({
                success: true,
                user: {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                },
            });
        } else {
            return res.status(400).json({ success: false, message: data.message || 'Registration failed' });
        }
    } catch (error) {
        console.error('Registration error: ', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}