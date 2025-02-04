import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	if (event.url.pathname === '/logout') {
        event.cookies.delete('jwt', { path: '/' });

        throw redirect(303, '/login'); // Redirect immediately
    }

    return resolve(event); // Process other routes normally
}