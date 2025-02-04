// src/routes/protected/+page.server.js
import { PUBLIC_API_URL } from '$env/static/public';
import { JWT_SECRET, ALGORITHM } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';


//checks if the user is already logged in or the user is still stored in the cookies when the login page loads
export function load({ cookies }) {
    // Get JWT token from cookies
    const token = cookies.get('jwt');
    
    // Only proceed with verification if a token exists
    if (token) {
        try {
            // Step 1: Decode token without verification to inspect payload
            // This helps with debugging but doesn't ensure token validity
            const decodedToken = jwt.decode(token);
            
            // Step 2: Verify token signature and expiration
            const verifiedToken = jwt.verify(
                token,
                `${JWT_SECRET}`,
                { algorithms: [`${ALGORITHM}`] }
            );
           
            // If verification succeeds, redirect to dashboard
            throw redirect(302, '/dashboard');
            
        } catch (error) {
            // Handle different types of errors
            
            // Case 1: Handle SvelteKit redirects
            if (error.constructor.name === 'Redirect') {
                throw error; // Re-throw redirect to let SvelteKit handle it
            }
            
            // Case 2: Handle JWT verification failures
            // This could be due to: invalid signature, expired token, etc.
            console.error("JWT Verification failed:", error.message);
            
            // Clear invalid token from cookies
            cookies.delete('jwt', { path: '/' });
            
            // Allow user to proceed to login page
            return;
        }
    }
    
    // No token found - allow access to login page
    return;
}


export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('email');
        const password = data.get('password');

        

        try {
            const response = await fetch(`${PUBLIC_API_URL}adminAuth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({username, password})
            });

            const responseData = await response.json();
           
            if (response.ok) {
                // Set the JWT token as an HTTP-only cookie
                cookies.set('jwt', responseData.access_token, {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 30 // 30 Min
                });
               
                // Redirect to the dashboard 
                throw redirect(302, '/dashboard');
            } else {
                //console.log(responseData)
                return { 
                    success: false, 
                    message: responseData.detail || "Login failed." 
                };
            }
        } catch (error) {
            //console.log("Error type:", error.constructor.name);
            //console.log("Is redirect?", error instanceof redirect);
            
            if (error.constructor.name === 'Redirect') {
                console.log("Re-throwing redirect");
                throw error;
            }
            
            console.error("Login error:", error);
            return {
                success: false,
                message: "An error occurred during login."
            };
        }
    }
};