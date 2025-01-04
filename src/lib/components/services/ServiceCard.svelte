<script>
    import ExpandedServiceCard from './expandedServiceCard.svelte';

    let { service, onupdateService, ondeleteService } = $props();
    let expanded = $state();

    function handlePopoverClick(event) {
    event.stopPropagation();
  }

</script>


<div>
    {#if expanded}
    <div class="overlay" on:click={() => expanded = false}>
        <div class="popover" on:click|stopPropagation>
            <ExpandedServiceCard service={service} {onupdateService} {ondeleteService}/>
        </div>
    </div>
    {/if}
</div>

<div class="service-card" on:click={() => expanded = !expanded} role="button" tabindex="0">
    <div class="card-content">
        <div class="service-info">
            <p class="service-name">{service.service}</p>
            <div class="service-meta">
                <div class="image-container">
                    <span>📷</span>
                </div>
                <div class="approval-status" class:approved={service.isApproved}>
                    {#if service.isApproved}
                        <p>✓ Approved</p>
                    {:else}
                        <p>⏳ Pending</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .service-card {
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 1.75rem;
        border-radius: 16px;
        width: 700px;
        margin: 1rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(229, 231, 235, 0.5);
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .service-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .service-card:active {
        transform: translateY(0);
    }

    .card-content {
        display: flex;
        align-items: center;
    }

    .service-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .service-name {
        background-color: #f8fafc;
        padding: 1rem 1.5rem;
        margin: 0;
        font-size: 1.5rem;
        border-radius: 12px;
        color: #1f2937;
        font-weight: 500;
        flex-grow: 1;
        transition: all 0.2s ease;
    }

    .service-meta {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .image-container {
        background-color: #f8fafc;
        padding: 1rem 1.25rem;
        border-radius: 12px;
        text-align: center;
        min-width: 60px;
        font-size: 1.25rem;
        transition: all 0.2s ease;
    }

    .image-container:hover {
        background-color: #f1f5f9;
    }

    .approval-status {
        background: #f3f4f6;
        padding: 0.75rem 1.25rem;
        border-radius: 24px;
        font-size: 0.95rem;
        font-weight: 500;
        color: #6b7280;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
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

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
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
        animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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