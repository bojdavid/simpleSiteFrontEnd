<script>
	import StarRating  from '../StarRating.svelte';
	import ExpandedReviewItem from './ExpandedReviewItem.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import MinorLoader from '../Minor_loader.svelte';
	
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
	
	<div class="review-item">
		<button  onclick={triggerModal} class="w-[760px] mx-auto my-3 grid grid-flow-col grid-rows-2 bg-primary-500">
			<div class="grid grid-cols-2">
				<div class="left-0">
					<StarRating rating={review.rating} />
				</div>
				
				<div class="right-0" class:approved={review.approved}>
					{#if minor_load}
						<MinorLoader />
					{:else if review.approved}
						<p>✓ Approved</p>
					{:else}
						<p>⏳ Pending</p>
					{/if}
				</div>
			</div>
		
			<div class="flex flex-row justify-between">
				<h3>{review.clientName}</h3>
				<p>{truncateText(review.text)}</p>
			</div>
		</button>
	</div>
	
	<style>
		
	</style>