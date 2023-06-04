<!-- this is where the user will go to customize their account -->

 <!-- choose pfp -->
 <!-- choose username -->

<script>
    import autoAnimate from '@formkit/auto-animate';
    import { auth } from '$lib/firebase.js';
    import { userStore } from 'sveltefire';
    import { writable } from "svelte/store";
    import { fade, slide } from "svelte/transition";
    import { onMount } from 'svelte';
    import { cubicInOut } from 'svelte/easing';

    let authInstance;
    const user = userStore(auth);
    let showProfile = writable(false);
    let name = 'anon';
    let showNameForm = false;
    let showPfps = false;

    let pfps = [
        { src: '/pfps/cfangKawamii.jpeg', alt: 'default'},
        { src: '/pfps/kawamii.jpeg', alt: 'kawamii'},
        { src: '/pfps/milady.png', alt: 'milady'},
        { src: '/pfps/miladyDubaiHat.png', alt: 'miladyDubaiHat'},
        { src: '/pfps/remilioCig.png', alt: 'remilioCig'},
        { src: '/pfps/remilioYayo.png', alt: 'remilioYayo'},
        { src: '/pfps/pixeladyAK.png', alt: 'pixeladyAK'},
        { src: '/pfps/pixeladyMiso.png', alt: 'pixeladyMiso'},
        { src: '/pfps/yayoRolex.png', alt: 'yayoRolex'},
        { src: '/pfps/yayoPontiac.png', alt: 'yayoPontiac'},
    ];
    
    let userPfp = pfps[0];

    function changePfp(pfp) {
        userPfp = pfp;
    }

    function togglePfps() {
        showPfps = !showPfps;
    }

    onMount(async () => {
        authInstance = auth;
    });

    const closeProfile = (event) => {
        if (event.target.classList.contains('profile-overlay')) {
            showProfile.set(false);
        }
    }

    function setName(input) {
        name = input;
    }

    function toggleNameForm() {
        showNameForm = !showNameForm;
    }

    export let signOut;
</script>


<!-- profile button -->
<div class="fixed top-3 right-6">
    
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    
    <!-- <button
        on:click={() => showProfile.set(!$showProfile)}
        class="">
        <img 
            src={userPfp.src} 
            alt={userPfp.alt} 
            class="opacity-100 w-12 md:w-20 border-[0.25rem] border-b-[1.1rem] hover:border-cyan-400 transition-all ease-in-out duration-300 ">
    </button> -->
    <button
    on:click={() => showProfile.set(!$showProfile)}
    class="relative overflow-hidden">
    <div 
        class="absolute inset-0 bg-black opacity-100 hover:opacity-0 transition-opacity duration-300 ease-in-out">
    </div>
    <img 
        src={userPfp.src} 
        alt={userPfp.alt} 
        class="relative w-12 md:w-20 border-[0.25rem] border-b-[1.1rem] border-cyan-400 transition-all ease-in-out duration-300 ">
</button>
    
    
</div>

{#if $showProfile}
 <!-- svelte-ignore a11y-click-events-have-key-events -->
 <div
    on:click={closeProfile} transition:slide={{duration: 1000, easing: cubicInOut}}
    class="profile-overlay fixed font-input tracking-tighter text-black inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
    
    <!-- profile modal -->
    <div class="fixed inset-5 md:inset-1/4 p-5 md:p-10 bg-black transform border-2 rounded-md">

        <!-- header -->
        <div class="flex flex-row justify-between mb-20">
            <div>
                <img src={userPfp.src} alt={userPfp.alt} class="h-[100px] w-auto">
                <h2 class="text-white font-input tracking-tighter text-2xl">{name}</h2>
            </div>
            <button on:click={signOut} class="font-input tracking-tighter text-white hover:text-lime-500">logout</button>
        </div>
        
        <button class="text-white font-input cursor-pointer tracking-tighter text-2xl" on:click={toggleNameForm}>change name</button>
        <div class="name-form {showNameForm ? '' : 'hidden'}">
            <input use:autoAnimate type="text" id="nameForm" bind:value={name} on:blur={() => setName(name)} class="">
        </div>
        <!-- this menu should only open after the user chooses to change their pfp -->

        <button class="text-white font-input cursor-pointer tracking-tighter text-2xl" on:click={togglePfps}>choose pfp</button>
        <!-- pfp options -->
        <div class="pfp-selector {showPfps ? '' : 'hidden'}">
            <div class="pfp-options flex">
                {#each pfps as pfp, i}
                    <img 
                        src={pfp.src} 
                        alt={pfp.alt} 
                        on:click={() => changePfp(pfp)}
                        transition:fade={{delay: i * 100, duration: 250, easing: cubicInOut}} 
                        class="opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in"> 
                {/each}
            </div>
        </div>
        <!-- when selecting pfp it can show up really big -->
        
    </div>
   
</div>
{/if}


<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .pfp-options::-webkit-scrollbar {
        display: none;
    }

    .pfp-options {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        
        /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .pfp-options img {
        width: auto;
        height: 400px;
        margin-right: 10px;
        margin-bottom: 10px;
    }



</style>