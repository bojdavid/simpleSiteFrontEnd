<script>
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';


    let {items, bottom_el, close_sidebar} = $props();
  
</script>




<div class="min-h-screen flex flex-row border-r-2 border-primary-500"  >
    <div class="flex flex-col flex-grow overflow-hidden 
                w-64
                bg-surface-50 dark:bg-surface-900
                rounded-r-3xl">
          <div class="flex items-center justify-center 
                        h-20 
                        shadow-md dark:shadow-surface-400">
            <h1 class="text-3xl uppercase ">Logo</h1>
          </div>
          
          <!-- NAVIGATIONS -->
           <button onclick={close_sidebar}>
             <ul class="flex flex-col py-4" >
               <span class="p-3 m-auto">
                 <LightSwitch />
               </span>
                 
               {#each items as item}
               <li>
                 <a href={item.link} class="   {item.link === $page.url.pathname ? 'bg-primary-500' : ''}
                                               flex flex-row items-center 
                                               h-12 transform rounded-lg mx-3
                                               text-sm
                                               hover:bg-opacity-50 hover:text-[16px] hover:bg-primary-400
                                               transition-bg ease-in duration-200 "
                                               >
                   <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
                   <span class=" font-medium">{item.text}</span>
                 </a>
               </li>
               {/each}
           </ul>
           </button>

        <!--  Bottom Element -->
     
         
            <a href={bottom_el.link} class="
                                        flex flex-row items-center 
                                        h-12 transform rounded-lg mx-3
                                        text-sm
                                        bg-primary-300 dark:bg-primary-900
                                        hover:bg-opacity-50 hover:text-[16px] hover:bg-primary-400
                                        transition-bg ease-in duration-200 
                                        mt-auto mb-4"
            >
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
            <span class=" font-medium">logout</span>
          </a>
         
      
    </div>
</div>  
