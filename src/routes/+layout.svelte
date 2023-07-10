<!-- design for different screen sizes -->
<!-- fireship firebase??????????? yessssss -->



<script>
  import { fade } from 'svelte/transition';
  import "../app.css"
  import Todo from '../components/Todo.svelte';
  import Login from '../components/Login.svelte';
  import Profile from '../components/Profile.svelte';
  import { userStore } from 'sveltefire';
  import { auth } from '$lib/firebase.js';

  let hover = false;
  let hoverCount = 0;
  const hoverPositions = [100, 50, 30, 0];
  let remi = [6198, 4153, 4981];
  let selectedRemi = remi[Math.floor(Math.random() * remi.length)];

  const user = userStore(auth);
    let isLoading = true;
  
    user.subscribe(($user) => {
      isLoading = false; // Set loading to false when the user state updates
    });
  
    async function signOut() {
      isLoading = true; // Start loading
      try {
        await auth.signOut();
        console.log('User signed out successfully.');
      } catch (error) {
        console.error(error);
      } finally {
        isLoading = false; // End loading
      }
    }

</script>

<!-- nav -->
<div class="fixed z-10 font-p22 text-white top-3 right-3 lg:right-[2rem] lg:space-x-[4rem] flex flex-row space-x-[1.5rem]">
  <a href="/" class="">Home</a>
  <a href="/todo" class="">Todo</a>
  <a href="/chatGPT" class="">ChatGPT</a>
  <a href="/shop" data-sveltekit-prefetch class="">Shop</a>
  <a href="/playground" class="">playground</a>
</div>
<!-- nav -->

<!-- admin reveal -->
<div 
  class="z-50 min-w-full fixed bottom-0 -left-28 transition-transform duration-300"
  style={`transform: translateY(${hover ? hoverPositions[hoverCount] : 100}%)`}
  >
  {#if hover}
    <img 
      src="images/{selectedRemi}assisstant.png" 
      alt="Redacted Remilio Baby" 
      class="max-w-full"
      in:fade={{duration: 100}}
      out:fade={{duration: 300}}
    />
  {/if}
</div>
<!-- admin reveal -->

<!-- made by swimming, oink oink -->
<div class="z-50 fixed bottom-3 left-1/2 -translate-x-1/2 w-[18rem] h-[3rem] notes-bg filter grayscale hover:grayscale-0 bg-opacity-50 hover:opacity-100 transform transition-all duration-1000 ease-in-out border-white border-[0.1rem] text-lime-500 text-[0.823rem] font-input tracking-tighter">
<h3 class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
    by 
    <a href="https://twitter.com/swimmingpigluvr" target="_blank" rel="noopener noreferrer">
      <span 
        on:mouseover={() => {
          hover = true
          if (hoverCount < hoverPositions.length - 1) hoverCount++;
        }}

        on:mouseout={() => hover = false}
        on:focus={() => hover = true}
        on:blur={() => hover = false}
        class="hover:text-black"
      >
        swimming🐷💖
      </span>
    </a>
  </h3>
</div>
<!-- made by swimming, oink oink -->

<!-- Profile / Login -->
<div>
  {#if isLoading}
    <p>🌎</p>
    <p>🌍</p>
    <p>🌏</p>
  {:else if $user}
    <Profile {signOut} />
  {:else}
    <Login />
  {/if}
</div>
<!-- Profile / Login -->



<slot />
