<script>
  import { PUBLIC_API_URL } from '$env/static/public';
  import { stats, user } from '$lib/stores/stats';
  import { get } from 'svelte/store'
  import { onMount } from 'svelte';
  
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

<div class="dashboard bg-green-100 min-h-screen p-6">
  <header class="welcome-section bg-white shadow-md rounded-lg p-5 mb-6">
    <h1 class="text-2xl font-bold text-gray-800">Welcome, {userName}</h1>
    
    <div class="profile-picture-container flex items-center mt-4">
      <div class="profile-picture w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
        <!-- <img src="" alt="Profile Picture" class="w-full h-full object-cover" /> -->
        <span class="placeholder text-gray-500">Image</span>
      </div>
    </div>
  </header>

  <h2 class="text-xl font-semibold mb-4">Edit Your Sections</h2>

  <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
    {#if stats}
        {#each Object.entries($stats) as [category, data]}
            <div class="stat-card bg-white shadow-lg rounded-lg p-5 flex flex-col">
                <h3 class="text-lg font-semibold text-gray-700">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div class="stat-numbers flex-grow mt-3">
                    <div class="stat-box bg-green-200 p-4 rounded-lg mb-2 flex flex-col items-center">
                        <span class="number text-2xl font-bold text-green-800">{data.pending}</span>
                        <span class="label text-sm text-gray-600">Pending</span>
                    </div>
                    <div class="stat-box bg-green-300 p-4 rounded-lg flex flex-col items-center">
                        <span class="number text-2xl font-bold text-green-800">{data.total}</span>
                        <span class="label text-sm text-gray-600">Total</span>
                    </div>
                </div>
            </div>
        {/each}
    {/if}
  </div>
</div>

<style>
  /*
  .dashboard {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);
    min-height: 100vh;
  }

  .welcome-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    padding: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(120deg, #2563eb, #4f46e5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: #1f2937;
  }

  .profile-picture {
    width: 120px;
    height: 120px;
    border-radius: 1rem;
    overflow: hidden;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }

  .profile-picture:hover {
    transform: scale(1.05);
  }

  .placeholder {
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-5px);
  }

  .stat-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #374151;
  }

  .stat-numbers {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }

  .stat-box {
    text-align: center;
    background: #f8fafc;
    padding: 1.25rem;
    border-radius: 0.75rem;
    min-width: 100px;
    transition: background-color 0.2s;
  }

  .stat-box:hover {
    background: #f1f5f9;
  }

  .number {
    font-size: 2rem;
    font-weight: 700;
    display: block;
    color: #2563eb;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 500;
  }
  */
</style>