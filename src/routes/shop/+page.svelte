<script>
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
    export let data
    const { products, users } = data

    let hoverUserImage = 'images/4ever.png';
</script>

<body class="bg-[url('/images/sunset.png')] fixed bg-cover bg-center w-screen h-screen">


    <div class="overflow-auto flex flex-wrap w-screen m-auto h-screen">
    {#each users as user, i (user.id)}
        <div 
            on:mouseenter={() => hoverUserImage = user.image}
            in:fade={{delay: i * 200}}
            class="px-4 glow font-input flex flex-wrap hover:text-white justify-start space-x-3 items-center">
            
            <h1 class="">{user.firstName} {user.lastName}</h1>
            <h2 class="font-input-compressed">{user.height}in {user.weight}lbs</h2>
        </div>
    {/each}
    <img in:fade={{ delay: 500, duration: 1000, easing: cubicInOut}} 
    src="{hoverUserImage}" alt="" class="fixed top-1/3 left-[25rem] w-[10rem] h-auto">
    

    
    <ul class=" w-[20%] top-0 right-0">
    {#each products as product, i (product.id)}
        <h1 in:fade={{delay: i * 200}} class="font-input text-[3rem]">{product.title}</h1>
        <h2 in:fade={{delay: i * 300}}>{product.description}</h2>
    {/each}
    <ul>
    </div>

    
</body>



