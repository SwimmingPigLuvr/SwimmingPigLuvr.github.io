<!-- this is where the user will go to customize their account -->

 <!-- choose pfp -->
 <!-- choose username -->

<script>
    import { auth } from '$lib/firebase.js'
    import { userStore } from 'sveltefire'
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";
    import { onMount } from 'svelte';

    let authInstance;
    const user = userStore(auth);
    let showProfile = writable(false);

    onMount(async () => {
        authInstance = auth;
    });

    const closeProfile = (event) => {
        if (event.target.classList.contains('profile-overlay')) {
            showProfile.set(false);
        }
    }
</script>


<!-- profile button -->
<div class="fixed top-3 left-3">
    <button
        on:click={() => showProfile.set(!$showProfile)}
        class="bg-rose-400 hover:bg-opacity-100 bg-opacity-50 border-4 border-transparent hover:border-black transform transition-all ease-in duration-100 rounded-full text-sm px-8 py-4 font-input"
    >Profile</button>
</div>

{#if $showProfile}
 <!-- svelte-ignore a11y-click-events-have-key-events -->
 <div
    on:click={closeProfile} transition:fade={{duration: 300}}
    class="profile-overlay fixed font-input tracking-tighter text-black inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
    
    <!-- profile modal -->
    <div class="bg-black max-w-full transform border-2 p-8 mt-10 rounded-md">
        <!-- header -->
        {#if $user}
        <h2 class="text-white font-input tracking-tighter text-2xl">Hello {$user}</h2>
        {:else}
        <h2 class="text-white font-input tracking-tighter text-2xl">choose pfp</h2>
        {/if}
        
        <!-- pfp options -->

        <!-- when selecting pfp it can show up really big -->
        <div class="pfp-options flex">
            <img src="/pfps/pfp7.png" alt="pfp7" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
            <img src="/pfps/pfp8.png" alt="pfp8" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
            <img src="/pfps/pfp1.png" alt="pfp1" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
            <img src="/pfps/pfp2.png" alt="pfp2" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
            <img src="/pfps/pfp5.png" alt="pfp5" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
            <img src="/pfps/pfp6.png" alt="pfp6" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
            <img src="/pfps/pfp3.png" alt="pfp3" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
            <img src="/pfps/pfp4.png" alt="pfp4" class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in">
        </div>
    </div>
    <!-- options -->
    <div class="flex flex-col">
        <div></div>
    </div>
    <!-- change pfp -->
    <div>
        <h2>choose pfp</h2>
    </div>
    
    <!-- change name -->
</div>
{/if}


<style>
    .pfp-options {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .pfp-options img {
        width: auto;
        height: 200px;
        margin-right: 10px;
        margin-bottom: 10px;
    }



</style>