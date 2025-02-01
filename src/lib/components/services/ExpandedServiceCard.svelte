<script lang="ts">
    import UploadImage from '../UploadImage.svelte';
    import MinorLoader from '../Minor_loader.svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
    
    // ----------- Setting the props
    let { parent} = $props();

    let service = $state($modalStore[0]["props"]["service"])
    console.log("Service image -------- ",service.image)

    const onupdateService =  $modalStore[0]["props"]["onupdateService"]

    const ondeleteService =  $modalStore[0]["props"]["ondeleteService"]


    let ml_update = $state(false)

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit() {
        ml_update = true
        // Form Data
	    const formData = {
            ...service,
            service: service['service'],
            description: service['description'],
            isApproved: service['isApproved'],
            image: service['image']
	    };
		

        try{
            const res = await onupdateService(formData)
            ml_update = res
        }catch (err){
            console.error("Error from onupdateService: ", err)
        }finally{
            modalStore.close();
        }


	}

	// Base Classes
	const cBase = 'p-4 w-modal shadow-xl space-y-4';
    const bg_gradient = "bg-gradient-to-br from-primary-400 to-tertiary-400 dark:bg-gradient-to-br dark:from-primary-600 dark:to-tertiary-800"
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

    </script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="{cBase} {bg_gradient}">
		<header class="flex justify-between px-1{cHeader}">
            <div class="date">{service.updated_at}</div>
            <div class="z-20">
           
                <label class="container">
                    <input type="checkbox" name="isApproved" id="isApproved" bind:checked={service.isApproved} 
                        class="hidden peer"/>
                    <div class="checkmark"></div>
                </label>
           
            </div>
        </header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
            <div class="">
                
               
                <UploadImage bind:profile={service.image}/>
                
        
                <div class="text-primary-500">
                    <input class="mt-3 p-2 
                                border border-primary-300 rounded-md w-full
                                bg-surface-50 dark:bg-surface-800
                                focus:ring-10 focus:ring-primary-500 focus:outline-primary-500 !important
                                focus:border-primary-500 
                                hover:scale-[1.02]
                                transition  duration-200
                                text-sm sm:text-lg" 
                    type="text" bind:value={service.service} name="serviceName"/>
                    <textarea class=" mt-3 p-2
                                border border-primary-300 rounded-md w-full 
                                bg-surface-50 dark:bg-surface-800
                                focus:ring-10 focus:ring-primary-500 focus:outline-primary-500 !important
                                focus:border-primary-500 
                                 hover:scale-[1.02]
                                transition duration-200
                                text-sm sm:text-lg" 
                                name="description" bind:value={service.description}>  </textarea>
                </div>
            </div>
<!--
   
-->
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter} justify-evenly text-sm">
            <button class="border-2 border-red-500 
                            hover:bg-red-500 p-2 rounded-lg
                            transition duration-300 "
                    onclick={() => ondeleteService(service._id)}>Delete Service</button>
			<button class="border-2 border-primary-500 
                            hover:bg-primary-500 p-2 rounded-lg
                            transition duration-300}" 
                    onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            {#if ml_update}
                <MinorLoader />
            {:else}
			    <button class="border-2 border-success-700 dark:border-success-500 
                            hover:bg-success-700 dark:hover:bg-success-500 p-2 rounded-lg
                            hover:text-primary-200
                            transition duration-300" 
                        onclick={onFormSubmit}> Update Service</button>
            {/if}
		</footer>
	</div>
{/if}

<style>
    input:focus, textarea:focus {
        -webkit-appearance: none;
        appearance: none;
        
        outline: yellow !important;
        
    }
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


