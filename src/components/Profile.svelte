<!-- this is where the user will go to customize their account -->

 <!-- choose pfp -->
 <!-- choose username -->

 <!-- choose username: 123 cheese. photo fades in on polaroid -->

<script>
    import autoAnimate from '@formkit/auto-animate';
    import { auth } from '$lib/firebase.js';
    import { userStore } from 'sveltefire';
    import { writable } from "svelte/store";
    import { fade, fly, slide } from "svelte/transition";
    import { onMount } from 'svelte';
    import { cubicInOut } from 'svelte/easing';
    import { tasksCompleted } from '../stores/tasks.js';

    let authInstance;
    const user = userStore(auth);
    let showProfile = writable(false);
    let name = 'anon';
    let showNameForm = false;
    let showPfps = false;
    let pfpHover = false;
    let showSettings = false;

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
        { src: '/pfps/remilia-1.png', alt: 'remilio Logo'},
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

    function toggleSettings() {
        showSettings = !showSettings;
    }

    export let signOut;
</script>


<!-- profile button -->
<div 
    
    class="fixed top-3 left-6 flex align-top">
    
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    
    <button
        use:autoAnimate
        on:click={() => showProfile.set(!$showProfile)}
        on:mouseenter={() => pfpHover=true}
        on:mouseleave={() => pfpHover=false}
        class="w-12 border-white border-8 border-solid yayo-border-blue lg:w-28 md:w-20 transition-all ease-in-out duration-500">
        <img 
            src={userPfp.src} 
            alt={userPfp.alt} 
            class=" transform transition-all duration-1000 ease-in-out">
    </button>
   
    
    
    
</div>

    <!-- on:click={closeProfile} transition:slide={{duration: 1000, easing: cubicInOut}} -->
{#if $showProfile}
 <!-- svelte-ignore a11y-click-events-have-key-events -->
 <div
    on:click={closeProfile} transition:fade={{duration: 500, easing: cubicInOut}}
    class="profile-overlay hover:notes-bg fixed font-input tracking-tighter text-black inset-0 flex flex-col items-center justify-center">
    
    <!-- profile modal -->
    <div class="fixed inset-[5vw] p-5 md:p-10 bg-black">

        <!-- back arrow for mobile -->
        <div class="fixed bg-white text-[5vw] top-6 right-6">
            <button class="profile-overlay p-3" on:click={closeProfile} transition:slide={{duration: 500, easing: cubicInOut}}>
                🔙
            </button>
        </div>

        <!-- header -->
        <div class="">
            <div class="">
                <img src={userPfp.src} alt={userPfp.alt} class="h-[10vw]">
                <h2 class="text-white font-input tracking-tighter text-xl">{name}</h2>
            </div>
        </div>

        <!-- info -->
        <div class="bg-white w-1/3 rounded-xl text-black font-input pb-5 py-20 text-center">
            <p class="text-8xl">{$tasksCompleted}</p>
            <p>TASKS COMPLETED</p>
        </div>
        
        <button on:click={toggleSettings}>⚙️</button>

        {#if showSettings}
        <div class="settings">
        <button class="text-white font-input cursor-pointer tracking-tighter text-2xl" on:click={toggleNameForm}>change name</button>
        <div class="name-form {showNameForm ? '' : 'hidden'}">
            <input use:autoAnimate type="text" id="nameForm" bind:value={name} on:blur={() => setName(name)} class="">
        </div>
        <!-- this menu should only open after the user chooses to change their pfp -->

        <button class="text-white font-input cursor-pointer tracking-tighter text-2xl" on:click={togglePfps}>choose pfp</button>
        <!-- pfp options -->
        <div class="pfp-selector {showPfps ? '' : 'hidden'}">
            <div class="pfp-options flex flex-wrap">
                {#each pfps as pfp, i}
                    <img 
                        src={pfp.src} 
                        alt={pfp.alt} 
                        on:click={() => changePfp(pfp)}
                        class="w-full h-[23vw] opacity-30 hover:opacity-100 transform transition-all duration-150 ease-in"> 
                {/each}
            </div>
        </div>
        <!-- when selecting pfp it can show up really big -->
        
    </div>
    {/if}
            <button on:click={signOut} class="fixed bottom-11 right-11 lg:bottom-24 lg:right-28 font-input tracking-tighter text-white hover:text-lime-500">logout</button>
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

 



</style>