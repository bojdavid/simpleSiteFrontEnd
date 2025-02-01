<script>
  import { PUBLIC_API_URL } from '$env/static/public';
  import { stats, user } from '$lib/stores/stats';
  import { get } from 'svelte/store'
  import { onMount } from 'svelte';
  import SectionsCard from '$lib/components/SectionsCard.svelte';

  
let {data} = $props()

  user.set({
      name: data.user.name,
      email: data.user.sub,
      profilePicture: "",
      id: data.user.userId         
  })
  let userName = $user.name;
  let profilePicture = "";


  onMount(async () => {
      try {
            // Fetch once at parent level
            const [servicesRes, reviewsRes] = await Promise.all([
                fetch(`${PUBLIC_API_URL}services/`),
                fetch(`${PUBLIC_API_URL}review/user/${$user.id}`)
            ]);
            // Check response status
            if (!servicesRes.ok || !reviewsRes.ok) {
                throw new Error(`HTTP error! status: ${servicesRes.status || reviewsRes.status}`);
            }
            
            const services = await servicesRes.json();
            const reviews = await reviewsRes.json();
            
            console.log("working----------------------")
            // Return data instead of updating store
            
                stats.set({
                    services: {
                        total: services.length,
                        pending: services.filter(s => !s.isApproved).length
                    },
                    reviews: {
                        total: reviews.length,
                        pending: reviews.filter(r => !r.isApproved).length
                    }
                })
        } catch (error) {
            console.error('Error loading dashboard:', error);
            
                stats.set({
                    services: { total: 0, pending: 0 },
                    reviews: { total: 0, pending: 0 }
                })
        } 
    })

console.log("Here--------",$stats)
</script> 

<div class="bg-surface-100 dark:bg-surface-800 
            min-h-screen p-6">
  <header class=" bg-primary-300 dark:bg-surface-700
                  shadow-md rounded-lg p-5 mb-6
                  flex flex-row justify-between">
    <h1 class="md:text-4xl text-2xl ">Welcome, <span class="font-bold text-secondary-900 dark:text-secondary-100">{userName}</span></h1>
    
    <div class="profile-picture-container flex items-center mt-4">
      <div class="profile-picture w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
        <!-- <img src="" alt="Profile Picture" class="w-full h-full object-cover" /> -->
        <span class="placeholder text-gray-500">Image</span>
      </div>
    </div>
  </header>

  <h2 class="text-xl font-semibold mb-4 ">Sections Summary</h2>

  <div class=" flex flew-row flex-wrap justify-evenly ">
    {#if stats}
        {#each Object.entries($stats) as [category, data]}
            <SectionsCard total={data.total} name={category.charAt(0).toUpperCase() + category.slice(1)} pending={data.pending}/>
        {/each}
    {/if}
  </div>
</div>

<style>
  
</style>