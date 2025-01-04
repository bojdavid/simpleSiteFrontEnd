<script>
import StarRating  from '../StarRating.svelte';
import ExpandedReviewItem from './ExpandedReviewItem.svelte';

  let { review,  onApprovalToggle, onMessage, onDeleteMessage} = $props();
  let expanded = $state();

  function truncateText(text, limit = 60) {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  }

  function handlePopoverClick(event) {
    event.stopPropagation();
  }

</script>

<div>
  {#if expanded}
  <div class="overlay" onclick={() => expanded = false}>
      <div class="popover" onclick={handlePopoverClick}>
              <ExpandedReviewItem review={review} {onMessage} {onDeleteMessage} {onApprovalToggle}/>
          </div>
      </div>
  {/if}
</div>
<div class="review-item" onclick={() => expanded = !expanded}>
    <div class="review-header">
        <div class="rating-container">
            <StarRating rating={review.rating} />
        </div>
        <div class="approval-status" class:approved={review.approved}>
            {#if review.approved}
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

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.2s ease;
    }

    .popover {
        width: fit-content;
        max-height: 90vh;
        animation: slideUp 0.3s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>



