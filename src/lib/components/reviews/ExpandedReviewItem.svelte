<script>
import StarRating from "../StarRating.svelte";
import { getModalStore } from '@skeletonlabs/skeleton';
import MinorLoader from "../Minor_loader.svelte";

const modalStore = getModalStore();

 // ----------- Setting the props
 let {parent} = $props()
 let review =  $state($modalStore[0]["props"]["review"])
 let minor_load = $state($modalStore[0]["props"]["minor_load"])

// Set the functions
 const onApprovalToggle =  $modalStore[0]["props"]["onApprovalToggle"]
const onDeleteMessage =  $modalStore[0]["props"]["onDeleteMessage"]
const onMessage = $modalStore[0]["props"]["onMessage"]

let ml_approve =$state(false);
let ml_delete =$state(false);

const handle_approval_load = async (id, approval) => {
    ml_approve = true
    const res = await onApprovalToggle(id, approval, ml_approve)
    ml_approve = res
}

const handle_delete_load = async (id) => {
    ml_delete = true
    try{
        const res = await onDeleteMessage(id)
        ml_delete = res
    }catch(err){
        console.error(err)
    }finally{
        parent.onClose();
    }
}
    

</script>

<div class="expanded-review">
    <!-- REVIEW HEADER -->
    <div class="review-header">
        <StarRating rating={review.rating} />
        <div class="approval-toggle">
            <label class="switch">
                {#if ml_approve}
                <button type="button" class="flex justify-center items-center size-[46px] text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                      <span class="sr-only">
                        <MinorLoader />
                      </span>
                    </span>
                  </button>
                {:else}
               
                <input 
                    type="checkbox" 
                    checked={review.approved}
                    onchange={(e) => handle_approval_load(review._id, e.target.checked)}
                />
                <span class="slider"></span>
                
                {/if}
            </label>
        </div>
    </div>

    <!-- REVIEW CONTENT -->
    <div class="review-content">
        <h3>{review.clientName}</h3>
        <p class="review-text">{review.text}</p>
        <div class="review-details">
            <div class="detail-item">
                <span class="icon">📧</span>
                <p>{review.email}</p>
            </div>
            <div class="detail-item">
                <span class="icon">📅</span>
                <p>{new Date(review.date).toLocaleDateString()}</p>
            </div>
        </div>
        
        <!-- MESSAGE CLIENT AND CLOSE REVIEW-->
        <div class="review-actions">
            <button class="icon-button" onclick={() => onMessage(review._id)}>
                📧 Message Client
            </button>
            <button class="link-button" onclick={parent.onClose}>
                Close Review
            </button>
            <button class="delete-button" disabled={ml_delete} onclick={() => handle_delete_load(review._id)}>
                {#if ml_delete}
                    <MinorLoader />
                {:else}
                    Delete
                {/if}
            </button>
        </div>
    </div>
</div>

<style>
    .expanded-review {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        width: 100%;
        max-width: 800px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .review-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    h3 {
        font-size: 1.5rem;
        color: #1f2937;
        margin: 0;
        font-weight: 600;
    }

    .review-text {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #4b5563;
        margin: 0;
    }

    .review-details {
        display: flex;
        gap: 2rem;
        margin: 1rem 0;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 12px;
    }

    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6b7280;
    }

    .icon {
        font-size: 1.1rem;
    }

    /* Switch styling */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e5e7eb;
        transition: .4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #3b82f6;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }

    /* Keep your existing review-actions styles */
    .review-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 2rem;
        margin-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
        gap: 1rem;
    }

    /* Keep your existing button styles */
    .icon-button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
    }

    .icon-button:hover {
        background: #2563eb;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
    }

    .icon-button:active {
        transform: translateY(0);
    }

    .link-button {
        background: #f3f4f6;
        border: none;
        color: #4b5563;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .link-button:hover {
        background: #e5e7eb;
        color: #374151;
    }

    .delete-button {
        background: #fee2e2;
        color: #dc2626;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .delete-button:hover {
        background: #fecaca;
        color: #b91c1c;
    }

    button:active {
        transform: scale(0.98);
    }
  
</style>