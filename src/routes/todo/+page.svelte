<script>
    import Todo from "../../components/Todo.svelte";
    import Login from "../../components/Login.svelte";
    import Profile from "../../components/Profile.svelte";
    import { userStore } from "sveltefire";
    import { auth } from '$lib/firebase.js';
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    
  
    const user = userStore(auth);
    let isLoading = true;
    let showTodo = false;
  
    user.subscribe(($user) => {
      isLoading = false; // Set loading to false when the user state updates
    });

    onMount(() => {
      setTimeout(() => {
        showTodo = true;
      }, 1000);
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
  
  <body class="bg-lime-400">
    {#if showTodo}
      <div in:fly={{ y: -1000, duration: 3000, easing: cubicInOut}}>
        <Todo />
      </div>
    {/if}
  </body>
  