import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, ALGORITHM } from '$env/static/private';

export async function load({ cookies }) {
    const token = cookies.get('jwt');
    
    // If no token exists, redirect to login
    if (!token) {
        throw redirect(302, '/login');
    }
    
    try {
        // Verify token
        jwt.verify(
            token, 
            `${JWT_SECRET}`,
            { algorithms: [`${ALGORITHM}`] }
        );
        
        // Token is valid, allow access to dashboard routes
        return { authenticated: true };
        
    } catch (error) {
        // Token is invalid or expired
        console.error("JWT Verification failed from dashboard:", error.message)
        cookies.delete('jwt', { path: '/' });
        throw redirect(302, '/login');
    }
}

