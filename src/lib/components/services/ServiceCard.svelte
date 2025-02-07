<script>
    import { getModalStore } from '@skeletonlabs/skeleton';
    import ExpandedServiceCard from './ExpandedServiceCard.svelte';

    let { service, onupdateService, ondeleteService } = $props();

const modalStore = getModalStore();
const modal = {
	type: 'component',
	component: 'ExpandedServiceCard',
    props: {service, ondeleteService, onupdateService},
    title: "Service Handling",
    body : "lorem ispum"
};

const triggerModal =() =>{
    modalStore.trigger(modal);
}

</script>

<button onclick={triggerModal} class=" mb-5 mx-5 
                                        border-4 border-primary-500 rounded-md
                                        bg-primary-400 dark:bg-primary-700
                                        hover:bg-primary-500
                                        hover:scale-[1.01] hover:shadow-md  dark:hover:shadow-primary-700
                                        transition duration-300 ease-in-out overflow-hidden
                                          h-17"> 
    <div class="lg:w-[700px] md:w-[550px] sm:w-[400px] w-[300px]
                transition-width duration-300
                ">
        <div class="text-end mt-[-9px] h-7">
            <span class="text-[7px] sm:text-[10px] mb-0 inline-block">Last Update: {service.updated_at} </span>
        </div>

        <div class="grid grid-cols-10 mt-[-10px] gap-1 
                    md:text-lg sm:text-sm text-[10px] mx-2
                    text-left ">
                <div class="col-span-1 sm:col-span-1 ">
                    <div class="placeholder bg-gray-300 animate-pulse w-10 h-10  rounded-full hidden sm:block"></div>
                    <div class="placeholder bg-gray-300 animate-pulse w-7 h-7  rounded-full sm:hidden"></div>
                </div>
                <div class="text-left col-span-3">
                    <p class="truncate overflow-hidden whitespace-nowrap">{service.service}</p>
                </div>
                <div class=" col-span-5 sm:col-span-4 pl-3 ">
                    <p class="truncate overflow-hidden whitespace-nowrap">{service.description}</p>
                </div>
                <div class="sm:text-xs text-[10px] col-span-1 sm:col-span-2 my-auto" class:approved={service.isApproved}>
                    {#if service.isApproved}
                        <p class=" text-success-800 dark:text-success-400 hidden sm:block font-bold my-auto text-center">✓ Approved</p>
                        <p class=" text-success-800 dark:text-success-400 sm:hidden text-lg font-bold my-auto text-center"> ✓ </p>
                    {:else}
                        <p class="hidden sm:block font-bold text-warning-800 dark:text-warning-400 my-auto text-center">⏳ Pending</p>
                        <p class=" sm:hidden my-auto text-center">⏳ </p>
                    {/if}
                </div>
            
            
        </div>
    </div>
</button>

<style>
  
</style>