<script lang="ts">
  import { onMount } from 'svelte';
  import ServiceCard from '../../../lib/components/services/ServiceCard.svelte';
  import Tabs from '$lib/components/Tabs_.svelte';
  import Loader from '$lib/components/Loader.svelte';

let services = $state([]);
let loading = $state(true)
let error = $state(null);

// Get Services data
const refreshServices = async () =>{
  loading = true
    const res = await fetch("http://127.0.0.1:8000/api/v1/services")  

    if ( !res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    services = await res.json()
}

// Display service when Page loads
onMount(async () => {
  try{
    await refreshServices();

  }catch (err){
    error = err
    console.error("Error fetching data:", err)

  }finally{
    loading = false
  }
})

//UPDATES services and reloads the page to get fresh data
const updateService = async (service) => {
    loading = true;
    const formData = new FormData();
    formData.append('_id', service._id);
    formData.append("service", service.service)
    formData.append("description", service.description)
    formData.append("isApproved", service.isApproved)
    formData.append("image_data", service.image)
  
    try {
        const response = await fetch('?/updateService', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            await refreshServices();
        } else {
            throw new Error(result.error || 'Failed to update');
        }
    } catch (err) {
        console.error("Error:", err);
        error = err;
    } finally {
        loading = false;
    }
};

// DELETING A SERVICE
const deleteService = async (id) =>{
  loading = true;
  const formData = new FormData();
  formData.append('serviceId', id);

  try{
    const response = await fetch('?/deleteService', {
      method: "POST",
      body: formData
    });
    const result = await response.json();
        if (response.ok) {
            await refreshServices();
        } else {
            throw new Error(result.error || 'Failed to delete');
        }
    } catch (err) {
        console.error("Error:", err);
        error = err;
    } finally {
        loading = false;
    }


}

// TABS
let items = ["All", "Approved", "Pending"];
let activeTab = $state("All");

function handleTabChange(item) {
  activeTab = item;
}
</script>

<header>
  <h1>Our Services</h1>
  <Tabs {items} active={activeTab} ontabChange={handleTabChange} />
</header>

<div class="services-grid">
    {#if loading}
      <Loader />
    {:else}
        {#if activeTab === "All"}
          
            {#each services as service}
              <ServiceCard service={service} 
                onupdateService={ (s) => updateService(s)} 
                ondeleteService = { (id)=> deleteService(id)}/>
            {/each}
          
        {:else if activeTab === "Approved"}
            {#each services.filter(service => service.isApproved) as service}
              <ServiceCard service={service} 
                onupdateService={ (s) => updateService(s)} 
                ondeleteService = { (id)=> deleteService(id)}/>
            {/each}
          
        {:else if activeTab === "Pending"}
            {#each services.filter(service => !service.isApproved) as service}
              <ServiceCard service={service} 
                onupdateService={ (s) => updateService(s)} 
                ondeleteService = { (id)=> deleteService(id)}/>
            {/each}
        {/if}
    {/if}
</div>

<style>
  .services-grid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }

  header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        
        position: sticky;
        top: 0;
        background-color: var(--background-color, white);
        width: 100%;
        padding: 1rem;
        z-index: 10;
        transition: box-shadow 0.3s ease;
    }
</style> 