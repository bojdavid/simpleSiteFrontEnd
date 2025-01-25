<script>
  import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
  import "../../styles/app.css"
  import "../../styles/layout1.css";
  import { initializeStores, Modal } from '@skeletonlabs/skeleton';
  import ExpandedServiceCard from '$lib/components/services/ExpandedServiceCard.svelte';
  import ExpandedReviewItem from '$lib/components/reviews/ExpandedReviewItem.svelte';
    import CreateServiceCard from '$lib/components/services/CreateServiceCard.svelte';

  initializeStores();
  const modalRegistry = {
	// Set a unique modal ID, then pass the component reference
	ExpandedServiceCard: { ref: ExpandedServiceCard },
  ExpandedReviewItem: {ref: ExpandedReviewItem},
  CreateServiceCard:{ref: CreateServiceCard}
	// ...
};

 
  let { children } = $props();
  let isMenuOpen = $state(false);

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  let currentTile= $state(0);
</script>

<Modal  components={modalRegistry}/>
<div class="layout">
  <!-- Mobile menu button -->

  



  <div class="sidebar" class:open={isMenuOpen}>
    <h2>Sidebar</h2>
    <!--
      <ul>
        <li><a href="/dashboard">Home</a></li>
        <li><a href="/dashboard/bio">About</a></li>
        <li><a href="/dashboard/services">Services</a></li>
        <li><a href="/dashboard/review">Review</a></li>
        <li>
          <form method="POST">
            <button type="submit" class="logout-button">Log Out</button>
          </form>
        </li>
      </ul>
    -->
    <AppRail>
      <svelte:fragment slot="lead">
        <AppRailAnchor href="/dashboard" >(icon)</AppRailAnchor>
      </svelte:fragment>
      <!-- --- -->
      <AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
        <a href="/dashboard">Home</a>
      </AppRailTile>
    
      <AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
        <a href="/dashboard/bio">About</a>
      </AppRailTile>
        
      <AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
        <a href="/dashboard/services">Services</a>
      </AppRailTile>
    
      <AppRailTile bind:group={currentTile} name="tile-4" value={3} title="tile-4">
        <a href="/dashboard/review">Review</a>
      </AppRailTile>
      <!-- --- -->
      <svelte:fragment slot="trail">
        <AppRailAnchor href="/" title="Account">
          <form method="POST">
            <button type="submit" class="logout-button">Log Out</button>
          </form>
        </AppRailAnchor>
      </svelte:fragment>
    </AppRail>
  </div>

  <main class="content">
      {@render children()}
    </main>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }


  .layout {
    position: relative;
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  .sidebar {
    background: #ffffff;
    padding: 2rem;
    width: 280px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.06);
  }

  .sidebar h2 {
    color: #2d3748;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
/*
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    margin-bottom: 0.75rem;
  }
*/
  .sidebar a {
    color: #4a5568;
    text-decoration: none;
    display: block;
    padding: 0.75rem 1rem;
    transition: all 0.2s ease;
  }

  .content {
    margin-left: 280px;
    padding: 2rem;
  }

  @media (max-width: 800px) {

    .sidebar {
      position: fixed;
      left: -280px;
      top: 0;
      height: 100vh;
      width: 280px;
      background: white;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999;
    }

    .sidebar.open {
      transform: translateX(280px);
    }

    .content {
      margin-left: 0;
      padding: 4rem 1.5rem 1.5rem 1.5rem;
    }
  }

  .logout-button {
    border: none;
    color: #e53e3e;
    cursor: pointer;
    font: inherit;
    padding: 0.75rem 1rem;
    text-align: left;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
</style>
