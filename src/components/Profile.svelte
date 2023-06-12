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

    // when hovering over the button nav in profile modal i want text to appear in a div neatly placed below
    let msgBack = false;
    let msgSettings = false;
    let msgSignout = false;

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

    function toggleBack() {
        msgBack = !msgBack;
        console.log("msgBack = " + msgBack);
    }

    export let signOut;
</script>


<!-- profile button -->
<div 
    
    class="z-20 fixed top-5 left-3 lg:left-2 lg:top-20 flex align-top">
    
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    
    <button
        use:autoAnimate
        on:click={() => showProfile.set(!$showProfile)}
        on:mouseenter={() => pfpHover=true}
        on:mouseleave={() => pfpHover=false}
        class="w-[10vw] md:w-[2vw] lg:w-[10vw] transition-all ease-in-out duration-1000">
        <img 
            src={userPfp.src} 
            alt={userPfp.alt} 
            class="hover:cursor-">
    </button>
   
    
    
    
</div>

    <!-- on:click={closeProfile} transition:slide={{duration: 1000, easing: cubicInOut}} -->
{#if $showProfile}
 <!-- svelte-ignore a11y-click-events-have-key-events -->
 <div
    on:click={closeProfile} transition:fade={{duration: 500, easing: cubicInOut}}
    class="z-20 profile-overlay bg-sky-300 fixed font-input tracking-tighter text-black inset-0 flex flex-col items-center justify-center">
    
    <!-- profile modal -->
    <div class="z-30 fixed inset-0 lg:inset-x-[20vw] md:inset-[5vw] p-5 md:p-10 bg-black">

        

        <div class="">
            <!-- header -->
            <div class="flex flex-col space-y-6">
                <img src={userPfp.src} alt={userPfp.alt} class="-z-10 w-[50vw]  yayo-border-blue border-[3vw]">
                <h2 class="z-10 text-white font-input tracking-tighter text-[10vw]">{name}</h2>
            </div>
        </div>

        <!-- stats -->
        <!-- <div class="bg-white text-sky-400 w-1/3 rounded-xl p-6 font-input text-center">
            <p class="text-8xl ">{$tasksCompleted}</p>
            <p class="">TASKS COMPLETED</p>
        </div> -->
        
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
            <div class="pfp-options flex flex-wrap overflow-y-auto max-h-[50vh]">
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

    <!-- nav buttons (denoted by emojis) -->
    <!-- back arrow for mobile -->
    <div class="z-40 flex flex-row space-x-3 fixed top-3 right-3 text-stone-100 font-input font-bold tracking-tighter">
        <button 
            class="text-[4vw] hover:scale-150 transform transition-all duration-300 ease-in-out" 
            on:click={closeProfile}
            
            transition:slide={{duration: 500, easing: cubicInOut}}
        >
                <p class="profile-overlay">⬅️</p>
        </button>
  
        <button 
            on:click={toggleSettings} 
            
            class="text-[4vw] hover:scale-150 transform transition-all duration-300 ease-in-out"
            transition:slide={{duration: 500, easing: cubicInOut}}
        >
                <p>⚙️️</p>
        </button>

        <button 
            on:click={signOut} 
            
            transition:slide={{duration: 500, easing: cubicInOut}}
            class="text-[4vw] hover:scale-150 transform transition-all duration-300 ease-in-out">
            <p>🌸</p>
        </button> 

        <!-- hover button nav text -->
        <div class="z-50 text-white font-input tracking-tighter text-[20vw]">
            {#if showNameForm}
                <p class="text-white text-[10vw]">back</p>
            {/if}
            {#if msgSettings}
                <p>settings</p>
            {/if}
            {#if msgSignout}
                <p>signout</p>
            {/if}
        </div>
        </div>
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
        overflow-y: auto;
        white-space: nowrap;
        
        /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

 



</style>