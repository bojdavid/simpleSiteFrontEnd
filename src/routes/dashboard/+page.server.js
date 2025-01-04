import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }) => {
        // Clear the JWT cookie
        cookies.delete('jwt', { path: '/' });
        
        // Redirect to login page
        throw redirect(302, '/login');
    }
};