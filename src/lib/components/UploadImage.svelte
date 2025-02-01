<script>
    import { FileButton } from '@skeletonlabs/skeleton';

    let { profile = $bindable() } = $props();

    let files = $state(null)
    let src = $state("");
    let a = $state("")
    a =  "/favicon.png"; 
    
    function onChangeHandler(e) {
        const file = files[0]
        
        if (file) { // Check if a file was selected
        const reader = new FileReader();

        reader.onload = (e) => {
            src = e.target.result; // Set the image source to the data URL
            profile = src
        }
        reader.onerror = (error) => {
            console.error("error reading file", error)
        }

        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
            src = "#"; // Clear the preview if no file is selected
            
        }
       
    }
</script>

<div class="flex flex-col ">
    <div class="rounded-full w-40 h-40 bg-gray-200 border-black border-dashed border-2 mb-4 m-auto overflow-hidden flex items-center justify-center">
        <img src={profile} alt="No profile" class="object-cover w-full h-full" />
      </div>

        <FileButton name="files" 
                    button="btn"
                    bind:files={files}
                    onchange={onChangeHandler}
                    class="m-auto 
                        rounded-lg
                        overflow-hidden
                        border border-surface-500 dark:border-surface-300
                        text-primary-900 dark:text-primary-500
                        hover:bg-surface-500 hover:text-primary-300 dark:hover:bg-surface-200 dark:hover:text-primary-900
                        transition duration-200
                        "
                    >
                    
                Upload
        </FileButton>
</div>