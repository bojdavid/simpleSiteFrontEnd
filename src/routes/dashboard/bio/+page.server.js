import { PUBLIC_API_URL } from "$env/static/public";

export const actions = {
    handleSubmit : async ({ request, cookies}) =>{
        const data = await request.formData();
        console.log(Object.fromEntries(data.entries()))
        

        const token = cookies.get('jwt')
        //fetch data using token bearer
        
        try{
            const response = await fetch(`${PUBLIC_API_URL}bio/${data.get('_id')}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(Object.fromEntries(data.entries()))
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
            

    }
}