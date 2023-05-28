 <!-- handle login/register -->
 <!-- login/register as a toggle -->




<script>
    import { auth } from '$lib/firebase.js';
    import { userStore } from 'sveltefire';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';


    const user = userStore(auth);
    let authInstance;
    let email = "";
    let password = "";
    let mode = "login"; // login is default toggle state
    let showLoginForm = writable(false);
    let errorMessage = "oopsie";

    function switchMode() {
        mode = mode === "login" ? "register" : "login";
    }

    const closeLogin = (event) => {
        if (event.target.classList.contains('login-overlay')) {
            showLoginForm.set(false);
        }
    }

    onMount(async () => {
        authInstance = auth;
    });

    async function handleLogin() {
    if (!authInstance) {
      console.error("Auth is not initialized");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;
      // User is signed in
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in: ", errorCode, errorMessage);
    }
  }

  async function handleRegister() {
    if (!authInstance) {
        console.error("Auth is not initialized");
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
        const user = userCredential.user;
        // user is registered
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("error registering: ", errorCode, errorMessage);
    }
  }

  async function handleSubmit() {
    if (mode === "login") {
      await handleLogin();
    } else {
      await handleRegister();
    }
  }
    

</script>

<!-- todo -->
<!-- login button shows remilia face logo before hover -->

<body>
    <div class="w-5 hover:w-20 transition-all text-rose-600 duration-500 ease-in-out hover:text-white fixed top-3 right-3">
        {#if $user}
            <p class="font-input tracking-tighter text-xl px-6 py-3">Hello {$user?.id}</p>
        {:else}
            <button 
                on:click={() => showLoginForm = !showLoginForm}
                class="bg-rose-600 rounded-full text-lg px-8 py-4 font-input">
                {#if showLoginForm}
                    ❌
                {:else}
                    login 
                {/if}
            </button>
        {/if}

        
    </div>
    {#if showLoginForm}
        <div class="login-overlay fixed font-input tracking-tighter text-black inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <div class="sunset-bg border-2 p-8 rounded-md">
            <div class="text-black text-2xl flex space-x-6 mb-4">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h2 class="hover:translate-y-0.5 cursor-pointer hover:text-white {mode === 'login' ? 'active' : ''}" on:click={switchMode} >Log in</h2>
                <h2 class="">/</h2>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h2 class="hover:translate-y-0.5 cursor-pointer hover:text-white {mode === 'register' ? 'active' : ''}" on:click={switchMode}>Register</h2>
            </div>


            <!-- todo -->
             <!-- if mode = login vs mode = register -->
            <form on:submit|preventDefault={handleLogin}>
                <div class="mb-4">
                <input id="email" bind:value={email} placeholder="email" class="w-full px-3 bg-black text-white py-2 border rounded-md" type="email" required>
                </div>
        
                <div class="mb-4">
                <input id="password" bind:value={password} placeholder="password" class="w-full px-3 py-2 bg-black text-white border rounded-md" type="password" required>
                </div>
        
                <button type="submit" class="hover:bg-sky-500 transform transition-colors duration-200 ease-in-out right mt-4 px-4 py-2 bg-black text-white rounded-md">Login</button>

                {#if errorMessage}
                <p class="mt-10 text-rose-500">{errorMessage}</p>
                {/if}
        
            </form>
            </div>
        </div>
    {/if}

    <div class="fixed bottom-0 m-auto w-1/2">
        <p class="font-input tracking-tighter font-white text-xl px-6 py-3">Hello {$user?.id}</p>
    </div>
</body>

<style>
    .active {
        color: white;
    }
</style>