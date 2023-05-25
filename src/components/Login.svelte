<script>
    
    import { userStore } from "sveltefire";

    const user = userStore(auth);

</script>

<body>

    <div class="fixed top-3 right-6">
        {#if $user}
            <p class="font-input tracking-tighter font-white text-xl px-6 py-3">Hello {$user.id}</p>
        {:else}
            <button class="hover:bg-black hover:bg-opacity-50 text-white text-xl px-6 py-3 font-input-compressed">Log in</button>
        {/if}
    </div>
</body>