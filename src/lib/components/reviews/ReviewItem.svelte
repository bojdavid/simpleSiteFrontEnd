<script>
	import StarRating  from '../StarRating.svelte';
	import ExpandedReviewItem from './ExpandedReviewItem.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import MinorLoader from '../Minor_loader.svelte';
    import { updated } from '$app/state';
	
	  let { review,  onApprovalToggle, onMessage, onDeleteMessage, minor_load} = $props();
	  
	
	  function truncateText(text, limit = 60) {
		return text.length > limit ? `${text.slice(0, limit)}...` : text;
	  }
	
	  const modalStore = getModalStore();
	  const modal = {
			type: 'component',
			component: 'ExpandedReviewItem',
			props: {review,  onApprovalToggle, onMessage, onDeleteMessage, minor_load},
			title: "Service Handling",
			body : "lorem ispum"
		};

		const triggerModal =() =>{
			modalStore.trigger(modal);
		}

	
	</script>
	
	<div class="mx-3">
		<button  onclick={triggerModal} class="
													mx-auto my-3 grid grid-cols-12 gap-2
													max-w-[45rem] w-full min-w-[300px] 
													transition-width duration-300 
													bg-primary-400 px-2 dark:bg-primary-700
													hover:bg-primary-500 transition-bg 
													border-4 border-primary-500 rounded-lg
											">
			<!-- FIRST GRID COL THE IMAGE CONTAINER-->
			<div class="col-span-2 lg:col-span-1 my-auto overflow-hidden mx-auto">
				<div class="placeholder bg-gray-300 animate-pulse w-10 h-10  rounded-full hidden sm:block"></div>
                <div class="placeholder bg-gray-300 animate-pulse w-9 h-9  rounded-full sm:hidden"></div>
			</div>
			<!-- SECOND GRID COL -->
			 <div class="col-span-10 lg:col-span-11">
				 <div class="flex justify-between items-center ">
					 <div class="start-0 text-[10px] sm:text-[1.2rem]">
						 <StarRating rating={review.rating} size="10px" />
					 </div>
					 
					<div class=" text-[7px] sm:text-xs">
						Updated at: {review.updated_at}
					</div>
				 </div>
			 
				 <div class="text-xs sm:text-lg grid grid-cols-6 gap-1">
					 <div class="flex flex-row sm:justify-start justify-center col-span-2 ">
						 <p class="my-auto font-bold runcate overflow-hidden whitespace-nowrap">{review.clientName}</p>
					 </div>
					 <p class=" truncate overflow-hidden whitespace-nowrap col-span-3 my-auto">{review.text}</p>
				<div class="sm:text-xs text-[10px] col-span-1 sm:col-span-1 my-auto" class:approved={review.approved}>
                    {#if minor_load}
						<MinorLoader />
					{:else if review.approved}
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
	</div>
	
	<style>
		
	</style>