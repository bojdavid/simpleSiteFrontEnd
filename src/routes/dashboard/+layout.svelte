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
    import { draw } from "svelte/transition";

  

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

//Function to toggle the sidebar
let sidebarOpen = $state(false);

const toggleSidebar2 = () =>{
  console.log("This should be falae ",sidebarOpen)
  
  if(sidebarOpen == false){
    drawerStore.open(sidebar) 
    //console.log(sidebarOpen)
    sidebarOpen = true

  }
  else{
    //drawerStore.close(sidebar)
    //console.log(sidebarOpen)
    sidebarOpen = false;
  }
  
  console.log(sidebarOpen)
  

}


  //For the sidebar
  const items = [
    {"link":"/dashboard", "text":"Home"}, 
    {"link":"/dashboard/bio", "text":"About"}, 
    {"link":"/dashboard/services", "text":"Services"},
    {"link":"/dashboard/review", "text":"Review"}, 
    {"link":"/", "text":"Root page"}
  ]
  const close_sidebar = () => { drawerStore.close(sidebar)}

  const logout = async () =>{
    console.log(" loggin  out")

    
  }

  const bottom_el = {"link":"/logout", "action":logout, "text":"Logout"}
</script>

<Modal  components={modalRegistry}/>
<Drawer onclick={drawerStore.close(sidebar)}>
  {#if $drawerStore.id == "sidebar-1"}
      <Sidebar {items} {bottom_el} {close_sidebar}/>
  {/if}
</Drawer>

<div class="layout flex flex-row">
  <!-- Mobile menu button -->
  <div class="lg:block hidden ">
    <Sidebar {items} {bottom_el} {close_sidebar}/>
  </div>

  <main class="content w-full">
    
      <button onclick={() => toggleSidebar2()} class=" absolute right-3 top-2 
                                                                lg:hidden 
                                                                transition-hidden duration-200
                                                                ">
           <Harmburger />
      </button>
    
      
      {@render children()}
    </main>
</div>

<style lang="postcss">
</style>
