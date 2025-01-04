<script>
    let { service, onupdateService, ondeleteService} = $props();

  
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedService = {
            ...service,
            service: formData.get('serviceName'),
            description: formData.get('description'),
            isApproved: formData.get('isApproved') === 'on',
            
        };
        onupdateService(updatedService)
      
    }
  
</script>

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
        <button class="image-button">Change Image</button>

        <div class="image-container">
            {#if service.image}
                <img src={service.image} alt={service.service} />
            {:else}
                <div class="placeholder-image">Image</div>
            {/if}
        </div>

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

    .image-button {
        background-color: var(--color-primary);
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: var(--spacing-sm);
        letter-spacing: 0.025em;
        box-shadow: var(--shadow-primary);
        color: var(--color-white);
        border: none;
        transition: var(--transition-base);
    }

    .image-button:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
        box-shadow: var(--shadow-primary-hover);
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