import { PUBLIC_API_URL } from '$env/static/public';


export const actions = {
    handleApproval: async ({ request, cookies }) => {
        const data = await request.formData();
        const reviewId = data.get('reviewId');
        const checked = data.get('checked') === 'true';
        
        const token = cookies.get('jwt'); // or whatever your cookie name is

        try {
            const response = await fetch(`${PUBLIC_API_URL}review/approve/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ approved: checked })
            });

            if (!response.ok) {
                return { success: false, error: `HTTP error! status: ${response.status}` };
            }
            
            const result = await response.json();
            return { success: true, data: result };

        } catch (error) {
            console.error('Server Error:', error);
            console.log('Server Error:', error);
            return { success: false, error: 'Failed to update review' };
        }
    },
    handleDelete: async ({request, cookies }) =>{
        const data = await request.formData();
        const reviewId = data.get('reviewId');

        const token = cookies.get('jwt');

        try {
            const response = await fetch(`${PUBLIC_API_URL}review/${reviewId}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            
            if (!response.ok) {
            const errorText = await response.text()
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText} ${errorText}`);          
            }
            // Handle successful deletion (e.g., display a message, update UI)
            console.log('Data deleted successfully');
            const result = await response.json();
            return { success: true, data: result };
        }catch (error) {
            // Handle errors (e.g., display an error message)
            console.error('Error deleting data:', error);
            throw error // re-throw the error so the caller can handle it if needed
        }
    }
}; 