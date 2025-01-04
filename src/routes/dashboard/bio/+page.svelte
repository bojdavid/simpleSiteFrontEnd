<script lang="ts">
    let formData = {
        name: '',
        phone: '',
        email: '',
        instagram: '',
        twitter: '',
        facebook: '',
        linkdn: '',
        tiktok: '',
        aboutMe: ''
    };

    function handleSubmit() {
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
    }
</script>

<div class="container">
    <h1>Bio</h1>
    
    <form on:submit|preventDefault={handleSubmit} class="bio-form">
        <input 
            type="text" 
            bind:value={formData.name} 
            placeholder="Name" 
            class="full-width"
        />
        
        <div class="socials">
            <input 
                type="tel" 
                bind:value={formData.phone} 
                placeholder="Phone"
            />
            <input 
                type="email" 
                bind:value={formData.email} 
                placeholder="Email"
            />
            
            <input 
                type="text" 
                bind:value={formData.instagram} 
                placeholder="Instagram"
            />
            <input 
                type="text" 
                bind:value={formData.twitter} 
                placeholder="Twitter"
            />
            
            <input 
                type="text" 
                bind:value={formData.facebook} 
                placeholder="Facebook"
            />
            <input 
                type="text" 
                bind:value={formData.linkdn} 
                placeholder="Linkdn"
            />
            <input 
                type="text" 
                bind:value={formData.tiktok} 
                placeholder="Tiktok" 
                class="full-width"
            />
        </div>

        
        <textarea 
            bind:value={formData.aboutMe} 
            placeholder="About Me" 
            rows="4" 
            class="full-width"
        ></textarea>
        
        <button type="submit">Update Bio</button>
    </form>
</div>

<style>
    :root {
        /* Colors */
        --color-primary: #4f46e5;
        --color-primary-dark: #4338ca;
        --color-white: #ffffff;
        --color-gray-50: #f8fafc;
        --color-gray-100: #f1f5f9;
        --color-gray-200: #e2e8f0;
        --color-gray-700: #334155;
        
        /* Shadows */
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
        
        /* Spacing */
        --spacing-sm: 0.75rem;
        --spacing-md: 1rem;
        --spacing-lg: 1.5rem;
        --spacing-xl: 2rem;
        
        /* Border Radius */
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--spacing-xl);
    }

    h1 {
        text-align: center;
        margin-bottom: var(--spacing-xl);
        color: var(--color-gray-700);
        font-size: 2rem;
        font-weight: 600;
    }

    .bio-form {
        background: var(--color-white);
        padding: var(--spacing-xl);
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        box-shadow: var(--shadow-md);
    }

    .socials {
        display: flex;
        gap: var(--spacing-md);
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        padding: var(--spacing-lg);
        background: var(--color-gray-50);
        border-radius: var(--radius-md);
    }

    input, textarea {
        padding: var(--spacing-sm);
        border: 2px solid var(--color-gray-200);
        border-radius: var(--radius-sm);
        background: var(--color-white);
        width: 100%;
        transition: all 0.2s ease;
        color: var(--color-gray-700);
        font-size: 0.95rem;
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .socials input {
        max-width: 300px;
    }

    .full-width {
        grid-column: 1 / -1;
    }

    textarea {
        resize: vertical;
        min-height: 120px;
    }

    button {
        width: fit-content;
        margin: 0 auto;
        padding: var(--spacing-sm) var(--spacing-xl);
        border: none;
        border-radius: var(--radius-md);
        background: var(--color-primary);
        color: var(--color-white);
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 600;
        font-size: 0.95rem;
        letter-spacing: 0.025em;
        box-shadow: var(--shadow-sm);
    }

    button:hover {
        background: var(--color-primary-dark);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    button:active {
        transform: scale(0.98);
    }

    /* Placeholder styling */
    input::placeholder, textarea::placeholder {
        color: #94a3b8;
    }

    /* Optional: Add a subtle hover effect to inputs */
    input:hover, textarea:hover {
        border-color: var(--color-primary);
    }

    @media (max-width: 640px) {
        .container {
            padding: var(--spacing-md);
        }
        
        .bio-form {
            padding: var(--spacing-lg);
        }
        
        .socials {
            padding: var(--spacing-md);
        }
    }
</style>
