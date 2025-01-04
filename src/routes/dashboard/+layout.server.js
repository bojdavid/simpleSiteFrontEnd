import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function load({ cookies }) {
    const token = cookies.get('jwt');
    console.log(process.env.JWT_SECRET)
    
    // If no token exists, redirect to login
    if (!token) {
        throw redirect(302, '/login');
    }
    
    try {
        // Verify token
        jwt.verify(
            token, 
            "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7",
            { algorithms: ['HS256'] }
        );
        
        // Token is valid, allow access to dashboard routes
        return { authenticated: true };
        
    } catch (error) {
        // Token is invalid or expired
        cookies.delete('jwt', { path: '/' });
        throw redirect(302, '/login');
    }
}