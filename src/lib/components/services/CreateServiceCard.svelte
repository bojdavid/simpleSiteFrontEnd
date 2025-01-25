<script lang="ts">
    import UploadImage from '../UploadImage.svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
    
    // ----------- Setting the props
    let { parent} = $props();

    
    const onsubmitService =  $modalStore[0]["props"]["submitService"]
    
    
    // We've created a custom submit function to pass the response and close the modal.
/*
    function onFormSubmit() {
        // Form Data
	    const formData = {
            ...service,
            service: service['service'],
            description: service['description'],
            isApproved: service['isApproved'],
            image: service['image']
	    };
		if ($modalStore[0].response) $modalStore[0].response(formData);
        console.log(formData)
		modalStore.close();
	}
*/
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

    let isApproved = $state(true);
    let image = $state();
    let description = $state()
    let service_name =$state()
    </script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class="flex justify-between px-1{cHeader}">
            <div class="date"> data goes here </div>
            <div class="approval-status">
                <input type="checkbox" name="isApproved" id="isApproved" bind:checked={isApproved} />
            </div>
        </header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
            <div class="service-card">
                <div class="header">
                    <div class="metadata">
                        
                    </div>
                </div>
                
               
                <UploadImage bind:profile={image}/>
                
        
                <div class="">
                    <input class="mt-1 p-2 border border-gray-300 rounded-md w-full
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                sm:text-sm" type="text" bind:value={service_name} name="serviceName"/>
                    <textarea class="mt-1 p-2 border border-gray-300 rounded-md w-full
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                sm:text-sm " 
                                name="description" bind:value={description}>  </textarea>
                </div>
            </div>
<!--
   
-->
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter} justify-evenly">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" onclick={() => onsubmitService()}> Update Service</button>
		</footer>
	</div>
{/if}


<!--
<form onsubmit={handleSubmit} method="post">
    <div class="service-card">
        <div class="header">
            <div class="metadata">
                <div class="date">{service.updated_at}</div>
                <div class="approval-status">
                    <input type="checkbox" name="isApproved" id="isApproved" checked={service.isApproved} />
                </div>
            </div>
        </div>
        <label for="image-input" class="image-container">
            
                {#if service.image}
                    <img 
                        src={imagePreviewUrl}
                        alt="Profile preview" 
                        class="preview-image"
                    />
                {:else}
                    <div class="placeholder-image">Image</div>
                {/if}
            
        </label>
            <input 
                id="image-input"
                name="image"
                type="file"
                accept="image/*"
                onchange={handleImageChange}
                class="hidden"
            />

        <div class="content-container">
            <input class="title" type="text" value={service.service} name="serviceName"/>
            <textarea class="description" type="text" name="description"> {service.description} </textarea>
        </div>

        <div class="actions">
            <button class="update-btn" type="submit" >Update Service</button>
            <button class="delete-btn" type="button" onclick={() => ondeleteService(service._id)}>Delete Service</button>
        </div>
    </div>
</form>


<style>
    :root {
        /* Colors */
        --color-primary: #4f46e5;
        --color-primary-dark: #4338ca;
        --color-danger: #f43f5e;
        --color-danger-dark: #e11d48;
        --color-gray-50: #f8fafc;
        --color-gray-200: #e2e8f0;
        --color-gray-500: #64748b;
        --color-gray-800: #1f2937;
        --color-white: #ffffff;

        /* Spacing */
        --spacing-xs: 0.6rem;
        --spacing-sm: 0.875rem;
        --spacing-base: 1rem;
        --spacing-md: 1.25rem;
        --spacing-lg: 1.5rem;
        --spacing-xl: 2rem;
        --spacing-2xl: 2.5rem;

        /* Border Radius */
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 24px;

        /* Shadows */
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
        --shadow-base: 0 8px 32px rgba(0, 0, 0, 0.08);
        --shadow-primary: 0 2px 8px rgba(79, 70, 229, 0.2);
        --shadow-primary-hover: 0 4px 12px rgba(79, 70, 229, 0.3);
        --shadow-danger: 0 2px 8px rgba(244, 63, 94, 0.2);
        --shadow-danger-hover: 0 4px 12px rgba(244, 63, 94, 0.3);

        /* Transitions */
        --transition-base: all 0.3s ease;
        --transition-fast: all 0.2s ease;
    }

    .hidden {
        display: none;
    }
    .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .service-card {
        background-color: var(--color-white);
        padding: var(--spacing-2xl);
        border-radius: var(--radius-xl);
        color: var(--color-gray-800);
        width: 100%;
        max-width: 560px;
        min-width: 320px;
        box-shadow: var(--shadow-base);
        transition: var(--transition-base);
        max-height: 80vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-xl);
    }

    .date {
        background-color: var(--color-gray-50);
        padding: var(--spacing-xs) var(--spacing-base);
        border-radius: var(--radius-md);
        font-size: var(--spacing-sm);
        color: var(--color-gray-500);
        font-weight: 500;
    }

    .image-container {
        width: 100%;
        height: min(320px, 40vh);
        min-height: 200px;
        background-color: var(--color-gray-50);
        border-radius: var(--radius-lg);
        border: 2px dashed var(--color-gray-200);
        margin: var(--spacing-lg) 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition-fast);
    }

    .content-container {
        background-color: var(--color-gray-50);
        padding: var(--spacing-xl);
        border-radius: var(--radius-lg);
        gap: var(--spacing-lg);
        display: flex;
        flex-direction: column;
    }

    .title, .description {
        border-radius: var(--radius-md);
        border: 2px solid var(--color-gray-200);
        padding: var(--spacing-base) var(--spacing-md);
        font-size: var(--spacing-base);
        transition: var(--transition-fast);
        background-color: var(--color-white);
        width: 100%;
        box-sizing: border-box;
    }

    .title:focus, .description:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }

    .description {
        min-height: 120px;
        max-height: 300px;
        resize: vertical;
        overflow-y: auto;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: var(--spacing-2xl);
        gap: var(--spacing-md);
    }

    .update-btn, .delete-btn {
        padding: var(--spacing-sm) var(--spacing-xl);
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: var(--spacing-sm);
        letter-spacing: 0.025em;
        transition: var(--transition-base);
        border: none;
        color: var(--color-white);
    }

    .update-btn {
        background-color: var(--color-primary);
        box-shadow: var(--shadow-primary);
    }

    .update-btn:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
        box-shadow: var(--shadow-primary-hover);
    }

    .delete-btn {
        background-color: var(--color-danger);
        box-shadow: var(--shadow-danger);
    }

    .delete-btn:hover {
        background-color: var(--color-danger-dark);
        transform: translateY(-2px);
        box-shadow: var(--shadow-danger-hover);
    }

    button:active {
        transform: scale(0.97);
    }
</style>

-->
