<script>
import { PUBLIC_API_URL } from "$env/static/public";
import Loader from "$lib/components/Loader.svelte";
import { onMount } from 'svelte';
import { user } from '$lib/stores/stats';
import UploadImage from "$lib/components/UploadImage.svelte";


console.log("Here--------",$user)

let bio = $state([]);
let loading = $state(true)
let error = $state(null);

let userID;
  if(!$user.id ){
    userID = "6767b475e6a1728861903812"
  }else{
   // userID = user.id
   userID = "6767b475e6a1728861903812"
  }

// Get BIO data
const refreshBio = async () =>{
  loading = true
    const res = await fetch(`${PUBLIC_API_URL}bio/${userID}`)  

    if ( !res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    bio = await res.json()
}

// Display BIO when Page loads
onMount(async () => {
  try{
    await refreshBio();

  }catch (err){
    error = err
    console.error("Error fetching data:", err)
    console.error("Message",err.detail)

  }finally{
    loading = false
  }
})


    let formData = $state({
        name: '',
        description: '',
        image: null,
        phone: '',
        email: '',
        instagram: '',
        twitter: '',
        facebook: '',
        linkdn: '',
        tiktok: '',
        aboutMe: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('?/handleSubmit', {
                method: 'POST',
                body: formData // FormData automatically handles files and text fields
            });
            
            if (!response.ok) {
                throw new Error('Failed to update bio');
            }
            
            const result = await response.json();
            console.log('Bio updated:', result);
            
        } catch (error) {
            console.error('Error updating bio:', error);
            // Handle error (show message to user, etc.)
        }
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            formData.image = file;
        }
    }
    
    let a =  "/favicon.png"; 
</script>

<div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Bio</h1>
    
    <form onsubmit={handleSubmit} class="bio-form bg-gray-50 p-4 rounded-lg shadow-md">
        
        <UploadImage profile={a}/>

        <input 
            type="text" 
            bind:value={bio.name} 
            placeholder="Name" 
            class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        
        <input 
            type="text" 
            bind:value={formData.description} 
            placeholder="Short description" 
            class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />

        <div class="socials grid grid-cols-1 gap-4">
            <input 
                type="tel" 
                bind:value={formData.phone} 
                placeholder="Phone" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            <input 
                type="email" 
                bind:value={formData.email} 
                placeholder="Email" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            
            <input 
                type="text" 
                bind:value={formData.instagram} 
                placeholder="Instagram" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            <input 
                type="text" 
                bind:value={formData.twitter} 
                placeholder="Twitter" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            
            <input 
                type="text" 
                bind:value={formData.facebook} 
                placeholder="Facebook" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            <input 
                type="text" 
                bind:value={formData.linkdn} 
                placeholder="LinkedIn" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            <input 
                type="text" 
                bind:value={formData.tiktok} 
                placeholder="TikTok" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
        </div>

        <button type="submit" class="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out">
            Save Bio
        </button>
    </form>
</div>

<style>
</style>
