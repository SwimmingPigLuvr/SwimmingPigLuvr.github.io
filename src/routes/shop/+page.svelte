<script>
    export let data
    const { products, users } = data
</script>

<body class="bg-[url('/images/sunset.png')] fixed bg-cover bg-center w-screen h-screen">


    <div class="p-10 overflow-auto w-[80%] m-auto h-screen">
    <ul class="flex flex-wrap">
    {#each users as user}
        <div class="flex flex-row justify-start space-x-3 items-center rounded-tr-full ">
            <img src="{user.image}" alt="{user.firstName} {user.lastName}" class="w-[4rem] filter grayscale hover:grayscale-0">
            <div class="font-input text-white flex flex-col">
        <h1 class="">{user.firstName} {user.lastName}</h1>
        <h2>{user.height}in {user.weight}lbs</h2>
        </div>
        </div>
    {/each}
    <ul>
    

    
    <ul>
    {#each products as product}
        <h1 class="font-input text-[3rem]">{product.title}</h1>
        <h2>{product.description}</h2>
    {/each}
    <ul>
    </div>

    
</body>



