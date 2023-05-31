 <!-- handle login/register -->
 <!-- login/register as a toggle -->




<script>
    import { auth } from '$lib/firebase.js';
    import { userStore } from 'sveltefire';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';

    const user = userStore(auth);
    let authInstance;
    let email = '';
    let password = '';
    let confirmPassword = '';
    let mode = "login"; // login / register toggle
    let showLoginForm = writable(false);
    let errorMessage = '';

    // toggle login/register
    function switchMode() {
        mode = mode === "login" ? "register" : "login";
        errorMessage = '';
    }

    // close login modal
    const closeLogin = (event) => {
        if (event.target.classList.contains('login-overlay') && errorMessage !== '') {
            showLoginForm.set(false);
        }
    }


    onMount(async () => {
        authInstance = auth;
    });

    // Login
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
        errorMessage = getErrorMessage(error.code);
    }
  }

  // Register
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
        errorMessage = getErrorMessage(error.code);
        console.error('Error signing out:', error);
    }
  }

  // Submit
  async function handleSubmit() {
    if (mode === "login") {
      await handleLogin();
    } else {
      await handleRegister();
    }
  }

  // Sign Out
  async function signOutUser() {
    try {
            await signOut(authInstance);
            console.log('User signed out successfully.');
            // Additional code or redirection logic after sign-out
        } catch (error) {
            errorMessage = getErrorMessage(error.code);
            console.error('Error signing out:', error);
        }
    }

    // Show errors
    function getErrorMessage(errorCode) {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'please enter a valid email';
            case 'auth/user-not-found': {
                if (mode === 'login') {switchMode();}
                return 'user not found. please register';
            }
            case 'auth/weak-password':
                return 'password must be at least 6 characters';
            case 'auth/email-already-in-use':
                return 'this email is already in use. please login or create new a account with different email';
            default:
                return 'error. please try again';
            
        }
    }


    

</script>

<!-- todo -->

<body>

    <!-- wait this should be the user's pfp -->
    <div class="text-black fixed top-3 right-3">
        {#if $user}
            <p class="font-input tracking-tighter text-xl px-6 py-3">Hello {$user.id}</p>
            <button on:click={signOutUser}>lougout</button>
        {:else}
            <button 
                on:click={() => showLoginForm.set(!$showLoginForm)}
                class="bg-lime-400 hover:bg-opacity-100 bg-opacity-50 border-4 border-transparent hover:border-black transform transition-all ease-in duration-100 rounded-full text-sm px-8 py-4 font-input">
            
                    <span class="">login </span>
                
            </button>
        {/if}

        
    </div>
    {#if $showLoginForm}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div 
            on:click={closeLogin} transition:fade={{delay: 0, duration: 300}} 
            class="login-overlay fixed font-input tracking-tighter text-black inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <div class="forbidden-bg max-w-xl border-2 p-8 mt-10 rounded-md">
            <div class="text-white text-opacity-50 text-2xl flex space-x-6 mb-4">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h2 class="hover:translate-y-0.5 cursor-pointer hover:text-white {mode === 'login' ? 'active' : ''}" on:click={switchMode} >Log in</h2>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h2>/</h2>
                <h2 class="hover:translate-y-0.5 cursor-pointer hover:text-white {mode === 'register' ? 'active' : ''}" on:click={switchMode}>Register</h2>
            </div>


            <!-- todo -->
             <!-- if mode = login vs mode = register -->
            <form on:submit|preventDefault={handleLogin}>
                <div class="mb-4">
                <input id="email" bind:value={email} placeholder="email" class="boder-2 border-transparent hover:border-white w-full px-3 bg-black text-white py-2 border rounded-md" type="email" required>
                </div>
        
                <div class="mb-4">
                <input id="password" bind:value={password} placeholder="password" class="boder-2 border-transparent hover:border-white w-full px-3 py-2 bg-black text-white border rounded-md" type="password" required>
                </div>

                {#if mode==="register"}
                <div transition:fade class="mb-4">
                    <input id="confirmPassword" bind:value={confirmPassword} placeholder="confirm password" class="boder-2 border-transparent hover:border-white w-full px-3 py-2 bg-black text-white border rounded-md" type="password" required>
                </div>
                {/if}
        
                <button 
                    on:click={handleSubmit}
                    type="submit" 
                    class="login-overlay boder-2 border-transparent hover:border-white hover:bg-sky-500 transform transition-colors duration-200 ease-in-out border-2 right mt-4 px-4 py-2 bg-black text-white rounded-md">
                        {#if $user}
                            Login Successful
                            {() => closeLogin()}
                        {:else}
                            {mode}
                        {/if}
                </button>

                {#if errorMessage}
                <div class="px-2 bg-black max-w-full">
                    <p class="mt-10 text-rose-500">{errorMessage}</p>
                </div>
                {/if}
        
            </form>
            </div>
        </div>
    {/if}

</body>

<style>
    .active {
        color: rgb(162, 224, 16);
    }
</style>