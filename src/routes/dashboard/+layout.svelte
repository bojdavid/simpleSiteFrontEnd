<script>
  import "../../styles/app.css"
  //import "../../styles/layout1.css";
  import { initializeStores, Modal,  Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
  import { LightSwitch } from '@skeletonlabs/skeleton';
  
  //Modals
  import ExpandedServiceCard from '$lib/components/services/ExpandedServiceCard.svelte';
  import ExpandedReviewItem from '$lib/components/reviews/ExpandedReviewItem.svelte';
  import CreateServiceCard from '$lib/components/services/CreateServiceCard.svelte';
	
  import Sidebar from "../../lib/components/Sidebar.svelte";
  import Harmburger from "$lib/components/Harmburger.svelte";

  

  initializeStores();

  // INITIALIZING MODALS
  const modalRegistry = {
	// Set a unique modal ID, then pass the component reference
	ExpandedServiceCard: { ref: ExpandedServiceCard },
  ExpandedReviewItem: {ref: ExpandedReviewItem},
  CreateServiceCard:{ref: CreateServiceCard}
	// ...
};

 
let { children } = $props();

const drawerStore = getDrawerStore();
  

const sidebar = { id: 'sidebar-1', width: 'w-[auto] ' };


  //For the sidebar
  const items = [
    {"link":"/dashboard", "text":"Home"}, 
    {"link":"/dashboard/bio", "text":"About"}, 
    {"link":"/dashboard/services", "text":"Services"},
    {"link":"/dashboard/review", "text":"Review"}, 
    {"link":"#", "text":"Extra"}
  ]
</script>

<Modal  components={modalRegistry}/>
<Drawer >
  {#if $drawerStore.id == "sidebar-1"}
      <Sidebar {items} />
  {/if}
</Drawer>

<div class="layout flex flex-row">
  <!-- Mobile menu button -->
  <div class="lg:block hidden ">
    <Sidebar {items}/>
  </div>

  <main class="content w-full">
    <button onclick={() => drawerStore.open(sidebar)} class=" absolute right-3 top-2 z-40
                                                              lg:hidden 
                                                              ">
      <Harmburger />
   </button>
      {@render children()}
    </main>
</div>

<style lang="postcss">
</style>
