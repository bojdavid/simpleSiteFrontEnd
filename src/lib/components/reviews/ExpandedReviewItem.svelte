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

<div class="bg-primary-500 max-w-[600px] min-w-[300px] w-full p-3 rounded-lg shadow-lg">
    <!-- REVIEW HEADER -->
    <div class="flex flex-row justify-between">
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
                <div class="z-20 flex flex-row ">
                    <span class="mr-2 text-lg font-bold">Approve: </span>
                    <label class="container">
                        <input type="checkbox" name="isApproved" id="isApproved" bind:checked={review.approved} 
                            class="hidden peer" 
                            onchange={(e) => handle_approval_load(review._id, e.target.checked)}/>
                        <div class="checkmark"></div>
                    </label>
                </div>
                
                {/if}
            </label>
        </div>
    </div>
    <hr class="border-4 "/>

    <!-- REVIEW CONTENT -->
    <div class="p-4 bg-primary-400 dark:bg-primary-600 shadow-lg">
        <div class="flex flex-row gap-2">
            <div class="placeholder animate-pulse bg-gray-400 w-20 h-20 rounded-lg"></div>
            <div>
                <h3 class="text-lg font-semibold mb-2">{review.clientName}</h3>
                <p class="mb-4">{review.text}</p>
                
            </div>
        </div>

        <div class="mb-4">
            <div class="flex items-center mb-2">
                <span class="icon text-xl mr-2">📧</span>
                <p class="text-gray-600">{review.email}</p>
            </div>
            <div class="detail-item flex items-center">
                <span class="icon text-xl mr-2">📅</span>
                <p class="text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
            </div>
        </div>
        
        <!-- MESSAGE CLIENT AND CLOSE REVIEW-->
        <div class="review-actions flex flex-row justify-evenly ">
            <button class=" text-md p-2 hover:border-4 hover:border-success-500 hover:bg-transparent rounded-md bg-success-600 transition duration-200" onclick={() => onMessage(review._id)}>
                📧 Message Client
            </button>
            <button class="link-button bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-200" onclick={parent.onClose}>
                Close
            </button>
            <button class="delete-button bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200" disabled={ml_delete} onclick={() => handle_delete_load(review._id)}>
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
    /* From Uiverse.io by bociKond */ 
/* Hide the default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 1.5rem;
  user-select: none;
}

/* Create a custom checkbox */
.checkmark {
  --clr: #0B6E4F;
  position: relative;
  top: 0;
  left: 0;
  height: 1.3em;
  width: 1.3em;
  background-color: #ccc;
  border-radius: 50%;
  transition: 300ms;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: var(--clr);
  border-radius: .5rem;
  animation: pulse 500ms ease-in-out;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 0.45em;
  top: 0.25em;
  width: 0.25em;
  height: 0.5em;
  border: solid #E0E0E2;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 #0B6E4F90;
    rotate: 20deg;
  }

  50% {
    rotate: -20deg;
  }

  75% {
    box-shadow: 0 0 0 10px #0B6E4F60;
  }

  100% {
    box-shadow: 0 0 0 13px #0B6E4F30;
    rotate: 0;
  }
}
</style>
