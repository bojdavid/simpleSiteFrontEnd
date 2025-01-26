<script>
  import { onMount } from 'svelte';
  import  ReviewItem  from '../../../lib/components/reviews/ReviewItem.svelte';
  import Tabs_ from '../../../lib/components/Tabs_.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { enhance } from '$app/forms';
  import { PUBLIC_API_URL } from '$env/static/public';
  import { user } from '$lib/stores/stats';
 

//getting data
  let reviews = $state([]);
  let sortedReviews = $state([]);
  let loading = $state(true);
  let minor_load = $state(false)
  let error = $state(null);

  let userID;
  if(!$user.id ){
    userID = "6767b475e6a1728861903812"
  }else{
   // userID = user.id
   userID = "6767b475e6a1728861903812"
  }
//Gets data from the server while the page is loading
  onMount(async () => {
    try {
        
        await refreshReviews();
    } catch (err) {
        error = err;
        console.error("Error fetching data:", err);
    } finally {
        loading = false;
    }
  })
console.log($user.id)
// Reusable function to fetch and update reviews
const refreshReviews = async () => {
    //The $user.id store value refreshes and goes back to empty when the page refreshes so this throws an error
    const url = `${PUBLIC_API_URL}review/user/${userID}`; 
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    reviews = await res.json();
    sortedReviews = reviews.toSorted((a, b) => new Date(b.date) - new Date(a.date));
};

//Approves review and reloads the page to get fresh data
const handleApproval = async (reviewId, checked, ml) => {
    
    const formData = new FormData();
    formData.append('reviewId', reviewId);
    formData.append('checked', checked);
    
    try {
        minor_load = true
       // console.log("Minor_load ---------", ml)
        const response = await fetch('?/handleApproval', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        if (response.ok) {
            await refreshReviews();
        } else {
            throw new Error(result.error || 'Failed to update');
        }
    } catch (err) {
        console.error("Error:", err);
        error = err;
    } finally {
        minor_load = false;
        ml=false;
        return ml
    }
};

// Send a message to the client
function handleMessage(reviewId) {
    // Implement messaging logic
    console.log(`Sending message to review ${reviewId}`);
  }
  
// Delete the review
const deleteMessage = async (reviewId) => {
    minor_load = true;
    const formData = new FormData();
    formData.append('reviewId', reviewId);

    try {
        const response = await fetch('?/handleDelete', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            await refreshReviews();
        } else {
            throw new Error(result.error || 'Failed to delete');
        }
    } catch (err) {
        console.error("Error:", err);
        error = err;
    } finally {
        minor_load = false;
        return false
    }
};

//TABS
let items= ['All', 'Approved', 'Pending']
let activeTab = $state('All');

function handleTabChange(item) {
  activeTab = item;
}

// Add scroll handling
let isScrolled = $state(false);

function handleScroll() {
  isScrolled = window.scrollY > 0;
}
</script>

<svelte:window on:scroll={handleScroll}/>

<!-- HTML CONTENT -->
 <main>
    <header class:scrolled={isScrolled}>
        <h1>Client Reviews</h1>

        <Tabs_  {items} active={activeTab} ontabChange={handleTabChange} />
    </header>
    
    
      <div class="reviews-container">
        {#if loading}
          <div class="loader-container">
            <Loader />
          </div>
        
        {:else if error}
        <div class="loader-container">
            <h3>Error: {error.message}</h3>
        </div>    
        
            {:else}
          {#if activeTab === 'All'}
              {#each sortedReviews as review (review._id)}
                  <ReviewItem 
                  {review}
                  {minor_load}
                  onApprovalToggle={(id, checked) => handleApproval(id, checked)}
                  onMessage={() => handleMessage(review._id)}
                  onDeleteMessage={(id) => deleteMessage(id)}
                  />
              {/each}
              
          {:else if activeTab == "Approved" } 
              {#each sortedReviews.filter(review => review.approved) as review (review._id)}
                  <ReviewItem 
                  {review}
                  {minor_load}
                  onApprovalToggle={(id, checked) => handleApproval(id, checked)}
                  onMessage={() => handleMessage(review._id)}
                  />
              {/each}
          {:else if activeTab == "Pending" } 
              {#each sortedReviews.filter(review => !review.approved) as review (review._id)}
                  <ReviewItem 
                  {review}
                  {minor_load}
                  onApprovalToggle={(id, checked) => handleApproval(id, checked)}
                  onMessage={() => handleMessage(review._id)}
                  />
              {/each}
          {/if}    
        {/if}
      </div>
    
  
    
</main>


<!-- CSS CONTENT -->
<style>
    main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        
        position: sticky;
        top: 0;
        background-color: var(--background-color, white);
        width: 100%;
        padding: 1rem;
        z-index: 10;
        transition: box-shadow 0.3s ease;
    }

    header.scrolled {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .reviews-container{
      margin: 0 auto;
      width: 100%;
      align-items: center;
    }

    .loader-container {
        position: fixed;
        top: 0;
        left: 250px;
        width: calc(100% - 250px);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>
