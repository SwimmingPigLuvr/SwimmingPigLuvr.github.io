<script>
    import Todo from "../../components/Todo.svelte";
    import Login from "../../components/Login.svelte";
    import Profile from "../../components/Profile.svelte";
    import { userStore } from "sveltefire";
    import { auth } from '$lib/firebase.js';
    
  
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
  
  <body>
      <Todo />
  </body>
  