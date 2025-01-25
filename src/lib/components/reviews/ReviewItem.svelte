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
		<button  onclick={triggerModal}>
			<div class="review-header">
				<div class="rating-container">
					<StarRating rating={review.rating} />
				</div>
				<div class="approval-status" class:approved={review.approved}>
					{#if minor_load}
						<MinorLoader />
					{:else if review.approved}
						<p>✓ Approved</p>
					{:else}
						<p>⏳ Pending</p>
					{/if}
				</div>
			</div>
		
			<div class="review-content">
				<h3>{review.clientName}</h3>
				<p>{truncateText(review.text)}</p>
			</div>
		</button>
	</div>
	
	<style>
		.review-item {
			background: white;
			border-radius: 16px;
			padding: 1.5rem;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
			transition: all 0.2s ease;
			cursor: pointer;
			width: 100%;
			min-width: 350px;
			max-width: 700px;
			margin: 1rem auto;
		}
	
		.review-item:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
		}
	.review-item button{
		width: 100%;
	}
		.review-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.25rem;
			padding-bottom: 1rem;
			border-bottom: 1px solid #f0f0f0;
		}
	
		.rating-container {
			padding: 0.5rem 0;
		}
	
		.approval-status {
			background: #f3f4f6;
			padding: 0.5rem 1rem;
			border-radius: 20px;
			font-size: 0.9rem;
			font-weight: 500;
			color: #6b7280;
			transition: all 0.2s ease;
		}
	
		.approval-status.approved {
			background: #dcfce7;
			color: #166534;
		}
	
		.approval-status p {
			margin: 0;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	
		.review-content {
			padding: 0.5rem 0;
		}
	
		.review-content h3 {
			margin: 0 0 1rem 0;
			color: #1f2937;
			font-size: 1.25rem;
			font-weight: 600;
		}
	
		.review-content p {
			margin: 0;
			line-height: 1.6;
			color: #4b5563;
			font-size: 1rem;
		}
		
	</style>