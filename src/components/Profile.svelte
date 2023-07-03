<!-- this is where the user will go to customize their account -->

 <!-- choose pfp -->
 <!-- choose username -->

 <!-- choose username: 123 cheese. photo fades in on polaroid -->

 <!-- jun 27 todo -->
 <!-- add hover message to the buttons in the profile modal -->

<script>
    import autoAnimate from '@formkit/auto-animate';
    import { auth } from '$lib/firebase.js';
    import { userStore } from 'sveltefire';
    import { writable } from "svelte/store";
    import { fade, fly, slide } from "svelte/transition";
    import { onMount } from 'svelte';
    import { cubicInOut } from 'svelte/easing';
    import { tasksCompleted } from '../stores/tasks.js';
    import { gsap } from 'gsap';


    // handle mouse move
    let x = 0;
    let y = 0;

    const obj = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
        gsap.to(obj, {
            duration: 0.5, // animation duration in seconds
            x: event.pageX,
            y: event.pageY,
            onUpdate: () => {
                x = obj.x;
                y = obj.y;
            },
            ease: "power1.out" // easing function for a more organic feel
        });
    };

    let editNameMsg = false;



    // when hovering over the button nav in profile modal i want text to appear in a div neatly placed below
    let msgBack = false;
    let msgSettings = false;
    let msgPfp = false;
    let msgSignout = false;

    let authInstance;
    const user = userStore(auth);
    let showProfile = writable(false);
    let name = 'anon';
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

    

    function toggleSettings() {
        showSettings = !showSettings;
    }

    function toggleBack() {
        msgBack = !msgBack;
    }
    function togglePfpMsg() {
        msgPfp = !msgPfp;
    }
    function toggleSettingsMsg() {
        msgSettings = !msgSettings;
    }
    function toggleSignout() {
        msgSignout = !msgSignout;
    }

    export let signOut;
</script>

<svelte:window on:mousemove={handleMouseMove} />



<!-- profile button -->
<div 
    
    class="z-50 fixed top-2 left-4">

    
    
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    
    <button
        use:autoAnimate
        on:mouseenter={() => pfpHover = true}
        on:mouseleave={() => pfpHover = false}
        on:click={() => showProfile.set(!$showProfile)}
        class="">
        <img 
            src={userPfp.src} alt={userPfp.alt}
            class="h-[6rem] w-[auto]
             rounded-[100%] border-transparent
            border-[0.3rem] hover:border-white
            
             transform transition-all 
            duration-[1s] ease-in-out"
        >
    </button> 
    
    {#if pfpHover}
        <div profile 
            in:fade={{ duration: 500, easing: cubicInOut }}
            out:slide={{ x: 100 }}

            class="absolute px-8 py-2 text-center text-[0.88rem] tracking-tighter 
            bg-sky-400 bg-opacity-90 font-input text-white
            border-black border-[0.1rem]"
            style="top: {y-10}px; left: {x+30}px;"
        >
        {#if $showProfile}
        <p 
        class="">return ⮐</p> 

        {:else}
        <p>{name}</p> 
        {/if}
    </div>
    {/if}
   
    
    
    
</div>

{#if $showProfile}
 <!-- svelte-ignore a11y-click-events-have-key-events -->
 <div
    on:click={closeProfile} transition:fade={{duration: 500, easing: cubicInOut}}
    class="z-20 profile-overlay bg-sky-300 fixed font-input tracking-tighter text-black inset-0 flex flex-col items-center justify-center">
    
    <!-- profile modal -->
    <div class="z-30 fixed inset-0 p-5 md:p-10 bg-black">

        

        <div class="">
            <!-- header -->
            <div class="flex flex-col space-y-6">
                <input use:autoAnimate 
                       type="text" 
                       id="nameForm" 
                       bind:value={name} 
                       placeholder="choose name" 
                       on:mouseenter={() => editNameMsg = true}
                       on:mouseleave={() => editNameMsg = false}
                       on:blur={() => setName(name)} 
                       class="relative z-10 text-white bg-black focus:border-lime-400 border-transparent border-2 mx-10 text-center font-input tracking-tighter text-[2rem] md:text-[5rem]">
            {#if editNameMsg}
                <div 
                    in:fade={{ duration: 500, easing: cubicInOut }}
                    out:slide={{ x: 100 }}
                    class="absolute px-8 z-50 py-2 text-center text-[0.88rem] tracking-tighter bg-sky-400 bg-opacity-90 font-input text-white border-black 
                    border-[0.1rem]"
                    style="top: {y+50}px; left: {x+50}px;">
                    <p class=""> edit name</p>
                </div>
            {/if}
        </div>
            
        </div>

        <!-- stats -->
        <!-- <div class="bg-white text-sky-400 w-1/3 rounded-xl p-6 font-input text-center">
            <p class="text-8xl ">{$tasksCompleted}</p>
            <p class="">TASKS COMPLETED</p>
        </div> -->
        
        <div class="settings">
        
        <!-- this menu should only open after the user chooses to change their pfp -->

        <!-- pfp options -->
        <div class="pfp-selector {showPfps ? '' : 'hidden'}">
            <div class="pfp-options flex flex-wrap overflow-y-auto max-h-[75vh] border-2 border-white">
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

    <!-- nav buttons (denoted by emojis) -->
    <!-- back arrow for mobile -->
    <div class="z-40 flex flex-col space-y-3 fixed top-3 right-3 text-stone-100 font-input font-bold tracking-tighter">

        <!-- go back -->
        <button 
            class="text-[2rem] hover:scale-[175%] transform transition-all duration-300 ease-in-out" 
            on:click={closeProfile}
            on:mouseover={toggleBack}
            on:mouseleave={toggleBack}
            on:focus={toggleBack}
            on:blur={toggleBack}
            transition:slide={{duration: 500, easing: cubicInOut}}>
                <p class="profile-overlay">⬅️</p>
                {#if msgBack}
                    <div
                        in:fade={{ duration: 500, easing: cubicInOut }}
                        out:slide={{ x: 100 }}
                        class="absolute px-8 py-2 text-center text-[0.88rem] tracking-tighter 
                        bg-rose-400 bg-opacity-90 font-input text-white
                        border-white border-[0.1rem]"
                        style="top: {y-30}px; right: {50}px;">
                        <p class="">back ⮐</p> 
                    </div>
                {/if}
        </button>
  <!-- settings -->
        <button 
            class="text-[2rem] hover:scale-[175%] text-white transform transition-all duration-300 ease-in-out"
            on:click={togglePfps} 
            on:mouseover={togglePfpMsg}
            on:mouseleave={togglePfpMsg}
            on:focus={togglePfpMsg}
            on:blur={togglePfpMsg}
            transition:slide={{duration: 500, easing: cubicInOut}}
        >
                <p>🖼</p>
                {#if msgPfp}
                    <div
                        in:fade={{ duration: 500, easing: cubicInOut }}
                        out:slide={{ x: 100 }}
                        class="absolute px-8 py-2 text-center text-[0.88rem] tracking-tighter 
                        bg-rose-400 bg-opacity-90 font-input text-white
                        border-white border-[0.1rem]"
                        style="top: {y-100}px; right: {50}px;">
                        <p class="">change pfp</p> 
                    </div>
                {/if}
        </button>
        <!-- change pfp -->
        <button 
            class="text-[2rem] hover:scale-[175%] text-white transform transition-all duration-300 ease-in-out"
            on:click={toggleSettings} 
            on:mouseover={toggleSettingsMsg}
            on:mouseleave={toggleSettingsMsg}
            on:focus={toggleSettingsMsg}
            on:blur={toggleSettingsMsg}
            transition:slide={{duration: 500, easing: cubicInOut}}
        >
                <p>⚙️️</p>
                {#if msgSettings}
                    <div
                        in:fade={{ duration: 500, easing: cubicInOut }}
                        out:slide={{ x: 100 }}
                        class="absolute px-8 py-2 text-center text-[0.88rem] tracking-tighter 
                        bg-rose-400 bg-opacity-90 font-input text-white
                        border-white border-[0.1rem]"
                        style="top: {y-100}px; right: {50}px;">
                        <p class="">settyingszz</p> 
                    </div>
                {/if}
        </button>
<!-- signout -->
        <button 
            on:click={signOut} 
            on:mouseover={toggleSignout}
            on:mouseleave={toggleSignout}
            on:focus={toggleSignout}
            on:blur={toggleSignout}
            transition:slide={{duration: 500, easing: cubicInOut}}
            class="text-[2rem] hover:scale-[175%] text-white transform transition-all duration-300 ease-in-out">
            <p>🌸</p>
            {#if msgSignout}
                    <div
                        in:fade={{ duration: 500, easing: cubicInOut }}
                        out:slide={{ x: 100 }}
                        class="absolute px-8 py-2 text-center text-[0.88rem] tracking-tighter 
                        bg-rose-400 bg-opacity-90 font-input text-white
                        border-white border-[0.1rem]"
                        style="top: {y-160}px; right: {3}rem;">
                        <p class="">signout</p> 
                    </div>
                {/if}
        </button> 
        
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