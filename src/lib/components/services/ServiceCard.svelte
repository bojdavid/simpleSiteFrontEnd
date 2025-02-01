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
                                        border-2 border-primary-500 dark:border-primary-700 rounded-md
                                        bg-primary-300 dark:bg-primary-900
                                        hover:bg-primary-500
                                        hover:scale-[1.01] hover:shadow-lg 
                                        transition duration-300 ease-in-out"> 
    <div class="lg:w-[850px] md:w-[550px] sm:w-[400px] w-[300px] sm:h-12 h-10
                
                ">
        <div class="flex flex-row justify-between">
            <span class="text-[9px] sm:text-[10px] mb-0 inline-block">date goes here </span>
            <div class="sm:text-xs text-[10px] " class:approved={service.isApproved}>
                {#if service.isApproved}
                    <p class="bg-success-500 text-seondary-500">✓ Approved</p>
                {:else}
                    <p>⏳ Pending</p>
                {/if}
            </div>
        </div>

        <div class="grid grid-cols-6 mt-[-10px] gap-1 
                    md:text-lg sm:text-sm text-[10px] mx-2
                    text-left">
                <div class="text-left col-span-2">
                    <p class="truncate overflow-hidden whitespace-nowrap">{service.service}</p>
                </div>
                <div class="border-x-2 border-primary-500 col-span-3 pl-3 ">
                    <p class="truncate overflow-hidden whitespace-nowrap">{service.description}</p>
                </div>
                <div class="col-span-1">
                        <span>📷</span>
                </div>
            
        </div>
    </div>
</button>

<style>
  
</style>