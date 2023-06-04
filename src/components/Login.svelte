<!-- todo -->
<!-- create a user collection in firebase -->
<!-- collection includes username, pfp, and todolist -->




<script>
    import { auth, db } from '$lib/firebase.js';
    import { userStore } from 'sveltefire';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { addDoc, collection } from 'firebase/firestore';

    const user = userStore(auth);
    let authInstance;
    let email = '';
    let password = '';
    let confirmPassword = '';
    let mode = "login"; // login / register toggle
    let showLoginForm = writable(false);
    let errorMessage = '';

    export const userName = writable(null);

    // toggle login/register
    function switchMode() {
        mode = mode === "login" ? "register" : "login";
        errorMessage = '';
        console.log(mode + " is the current mode");
    }

    // close login modal
    const closeLogin = (event) => {
        if (event.target.classList.contains('login-overlay')) {
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

    if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
        const user = userCredential.user;

        

        

        console.log('User registered with username:');
    } catch (error) {
        const errorMessage = getErrorMessage(error.code);
        console.error(errorMessage);
        console.error(error);
    }
  }

  // Submit
  async function handleSubmit() {
    console.log("handling " + mode);
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
            console.error(error);
        }
    }

    // Show errors
    function getErrorMessage(errorCode) {
        switch (errorCode) {
            case password !== confirmPassword:
                return 'passwords do not match';
            case 'auth/invalid-email':
                return 'please enter a valid email';
            case 'auth/user-not-found': {
                if (mode === 'login') {switchMode();}
                return 'user not found. please register';
            }
            case 'auth/wrong-password':
                return 'wrong password';
            case 'auth/weak-password':
                return 'password must be at least 6 characters';
            case 'auth/email-already-in-use':
                return 'this email is already in use. please login or create new a account with different email';
            default:
                return 'error. please try again';
            
        }
    }

    async function createDb() {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    

</script>

<!-- todo -->

<body>

     <!-- login button -->
    <div class="text-black fixed top-3 right-6 flex flex-col justify-end">
        <button 
            on:click={() => showLoginForm.set(!$showLoginForm)}
            class="text-white hover:text-lime-400 transform transition-all ease-in duration-100 font-input">
                <span class="">login </span>
        </button>
        <!-- create db -->
        <button 
            on:click={createDb}
            class="text-white hover:text-lime-400 transform transition-all ease-in duration-100 font-input">
                <span class="">click to create db </span>
        </button>

        
    </div>
    {#if $showLoginForm}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div 
            on:click={closeLogin} transition:fade={{delay: 0, duration: 300}} 
            class="login-overlay fixed font-input tracking-tighter text-black inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">

            <!-- login modal -->
            <div class="forbidden-bg max-w-xl border-2 p-8 mt-10 rounded-md">
                <!-- login/register -->
            <div class="text-white text-opacity-50 text-2xl flex space-x-6 mb-4">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h2 class="cursor-pointer hover:text-white {mode === 'login' ? 'active' : ''}" on:click={switchMode} >Log in</h2>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h2>/</h2>
                <h2 class="cursor-pointer hover:text-white {mode === 'register' ? 'active' : ''}" on:click={switchMode}>Register</h2>
            </div>


            <!-- form -->
            <form on:submit|preventDefault={handleLogin} class="text-white py-2 px-3">
                <div class="mb-4 text-white" >
                    <label for="email">email</label>
                    <input 
                        id="email" 
                        bind:value={email} 
                        placeholder="swimming@remilia.org" 
                        autocomplete="email" 
                        class="boder-2 border-transparent hover:border-white w-full px-3 bg-black text-white py-2 border rounded-md" 
                        type="email" required>
                </div>
        
                <div class="mb-4">
                    <label for="password">password</label>
                    <input 
                        id="password" 
                        bind:value={password} 
                        placeholder="password" 
                        autocomplete="current-password" 
                        class="boder-2 border-transparent hover:border-white w-full px-3 py-2 bg-black text-white border rounded-md" 
                        type="password" required>
                </div>

                {#if mode==="register"}
                <div transition:fade class="mb-4">
                    <label for="confirmPassword">confirm Password</label>
                    <input 
                        id="confirmPassword" 
                        bind:value={confirmPassword} 
                        placeholder="confirm password" 
                        autocomplete="new-password" 
                        class="boder-2 border-transparent hover:border-white w-full px-3 py-2 bg-black text-white border rounded-md" 
                        type="password" required>
                </div>
                {/if}
        
                <button 
                    on:click={handleSubmit}
                    type="submit" 
                    class="border-transparent hover:border-white hover:bg-sky-500 transform transition-colors duration-200 ease-in-out border-2 right mt-4 px-4 py-2 bg-black text-white rounded-md">
                        {#if $user}
                            Login Successful
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