<script>
    let {name, pending, total} = $props();
    
    let approv_val = total - pending; 
    let approval_bg = "bg-primary-500 text-secondary-600 "
    
    let length = (approv_val/total) * 50;

    
</script>
<div class="bg-primary-500 py-8 w-[300px] px-3 mb-5 shadow-lg">
    <div class="text-center text-3xl font-bold">
        {name}
    </div>
    <hr class="border-tertiary-500 border-2 my-4 "/>

    <!-- Gauge Component -->
    <div class="relative size-40 m-auto">
      <svg class="size-full rotate-180" viewBox="0 0 36 36">
        <!-- Background Circle (Gauge) -->
        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-surface-100 dark:text-surface-800 " stroke-width="3" stroke-dasharray="50 100" stroke-linecap="round"></circle>
    
        <!-- Gauge Progress -->
        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current {approval_bg} " stroke-width="1" stroke-dasharray="{length} 100" stroke-linecap="round"></circle>
      </svg>
    
      <!-- Value Text -->
      <div class="absolute top-9 start-1/2 transform -translate-x-1/2 text-center">
        <span class="text-2xl font-bold text-secondary-900">{total}</span>
        <span class="text-xs block">Total</span>
      </div>
    
      <div class="absolute top-12 left-[-5px] mt-[50px] flex flex-col justify-center text-center">
          <span class="text-xs mt-[-10px]">Aprvd.</span>
        </div>
    </div>
    <!-- End Gauge Component -->

    <!-- INDICATORS -->
     <div>
        <div class="flex items-center">
            <span class="w-4 h-1 bg-secondary-500 inline-block mr-3 {approval_bg}"></span>  Approved <span class="font-bold ml-1">{approv_val}</span>
        </div>
        <div class="flex items-center">
            <span class="w-4 h-1 border border-surface-900 inline-block mr-3"></span> Pending <span class="font-bold ml-1">{pending}</span>
        </div>
     </div>

    
</div>
