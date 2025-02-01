import { PUBLIC_API_URL } from '$env/static/public';


export const actions = {
    updateService : async ({ request, cookies}) =>{
        const data = await request.formData();
        

        const token = cookies.get('jwt')
        //fetch data using token bearer
        
        try{
            const response = await fetch(`${PUBLIC_API_URL}services/${data.get('_id')}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok){
                return { success: false, error: `HTTP error! status: ${response.status}` };
            }
            const result = await response.json();
            return { success: true, data: result };
        }catch (error) {
            console.error('Server Error:', error);
            console.log('Server Error:', error);
            return { success: false, error: 'Failed to update review' };
        }
            

    },
    deleteService : async ({ request, cookies}) =>{
        const token = cookies.get('jwt')
        const data =await request.formData()
        const id =  data.get("serviceId")

        console.log(id)

        try{
            const response = await fetch(`${PUBLIC_API_URL}services/${id}`, {
                method: 'DELETE',
                headers: {
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
}