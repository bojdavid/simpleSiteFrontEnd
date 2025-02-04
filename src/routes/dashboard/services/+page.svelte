<script>
  
  import { onMount } from 'svelte';
  import ServiceCard from '../../../lib/components/services/ServiceCard.svelte';
  import Tabs from '$lib/components/Tabs_.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { PUBLIC_API_URL } from '$env/static/public';
  import CreateServiceCard from '$lib/components/services/CreateServiceCard.svelte';
  import { getModalStore } from '@skeletonlabs/skeleton';


const modalStore = getModalStore();

const triggerModal =() =>{
    modalStore.trigger(modal);
}
  

let services = $state([]);
let loading = $state(true)
let error = $state(null);

// Get Services data
const refreshServices = async () =>{
    const res = await fetch(`${PUBLIC_API_URL}services`)  

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


//CREATE SERVICE and updatepage
const submitService = async() =>{
  console.log("service has been updated")
}


//UPDATES services and reloads the page to get fresh data
const updateService = async (service) => {
    let minor_loading = true;
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
        minor_loading =false
        return minor_loading
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

$effect(() => {
    console.log('Services from parent:', services);
});

//Modal properties
const modal = {
	type: 'component',
	component: 'CreateServiceCard',
  props: {submitService}
};

</script>
<div class="flex flex-col items-center justify-center my-6">
  
    <h1 class="text-4xl font-bold">Services</h1>
    <div class="my-6 
                bg-primary-500 shadow-lg
                w-full mx-3 py-2  
                sticky top-0 z-10 ">

                <div class=" flex flex-row justify-evenly sm:justify-between  px-2">
                      <button class=" px-3 py-2 sm:p-2 text-xs sm:text-lg
                                      font-bold my-auto rounded-md
                                      justify-start
                                      border-2 border-primary-300
                                      text-primary-800 hover:dark:text-primary-400
                                      shadow-lg dark:hover:bg-primary-800 hover:bg-primary-300
                                      transition duration-300 ease-in-out" onclick={triggerModal}> +service </button> 
                      <div class="flex-grow flex justify-center my-auto scale-[0.8] sm:scale-100">
                        <Tabs {items} active={activeTab} ontabChange={handleTabChange} />
                      </div>
                </div>
    </div>
  
  
  <div class="flex flex-col items-center">
    <div class="lg:w-[850px] md:w-[550px] sm:w-[400px] w-[300px] py-2 sm:py-3
                  grid grid-cols-6 gap-1 
                  xsm:text-sm lg:text-lg text-[10px] mx-2
                  text-center  mb-5 font-bold 
                  bg-primary-500  shadow-lg dark:shadow-surface-600
                  transition-width duration-300
                  ">
        <div class="col-span-2">
            <p class="text-center">Service</p>
        </div>
        <div class="border-x-2 col-span-2  ">
            <p class="">Description</p>
        </div>
        <div class="col-span-2">
                <span>Approved</span>
        </div>
    
      </div>

      {#if loading}
      <section class="w-full">
        <div class="p-4 space-y-4">
          {#each Array(7) as _, index}
              <div class="placeholder h-10  animate-pulse">
                
              </div>
          {/each}
          
        </div>
      </section>
  
      {:else if error}
        <div class="loader-container">
          <h3>Error: {error.message}</h3>
        </div>
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
</div>

<style>
  
</style> 