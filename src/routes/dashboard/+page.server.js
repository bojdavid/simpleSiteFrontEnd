import { redirect } from '@sveltejs/kit';
import { stats } from '$lib/stores/stats';
import { PUBLIC_API_URL } from '$env/static/public';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';


export const actions = {
    default: async ({ cookies }) => {
        // Clear the JWT cookie
        cookies.delete('jwt', { path: '/' });
        
        // Redirect to login page
        throw redirect(302, '/login');
    }
};


export async function load( {cookies}) {
    const token = cookies.get('jwt');

    if (!token) {
        throw redirect(302, '/login');
    }

    try {
        // Use verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        return {
            user: decoded
        };
    } catch (error) {
        console.error('Token verification failed:', error);
        throw redirect(302, '/login');
    }
}