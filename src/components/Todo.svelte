<!-- login button cant be clicked in lg breakpoint -->

<!-- todo list -->
<!-- important links -->
<!-- fix task must be titled error:
        right now when i get that error it doesn't go away -->
<!-- fix add task button -->
<!-- get rid of scroll bar for todo list -->
<!-- add categories -->
<!-- style all break points -->
<!-- fix profile modal:
        right now the settings button opens the profile settings but it also closes the modal -->

<script lang="ts">
  import "../app.css";
  import { onMount, tick } from "svelte";
  import { writable } from "svelte/store";
  import { backIn, backInOut, backOut, cubicInOut, cubicOut } from "svelte/easing";
  import { fade, fly, slide } from "svelte/transition";
  import { afterUpdate } from "svelte";
  import { flip } from "svelte/animate";


  let lists = ['Favorites', 'Main Tasks', 'Side Quests'];
  let currentList = 'Main Tasks';
  let newList = '';
  let showLists = false;
  let showCreateList = false;

  function selectList(list) {
    currentList = list;
  }

  

  // list construction 🚧
  function addList(event) {
    event.preventDefault();
    console.log("add list attempt")

    if (newList.trim() !== '' && !lists.includes(newList.trim())) {
      lists.push(newList);
      console.log("success:" + lists);
      // lists = [...lists, newList];
      currentList = newList;
      newList = '';
      showCreateList = false;
    }
  }
  // list construction 🚧





  


  // Create a writable store to hold the list of todo items
  const completedList = writable<ListItem[]>([]);

  interface ListItem {
    id: number;
    title: string;
    details: string;
    date: Date | null;
    completed: boolean;
  }

  interface TodoList {
    category: string;
    tasks: ListItem[];
  }

  export const todoList = writable<ListItem[]>([]);

  let items: ListItem[] = [];

  $: items = $todoList;

  export const tasksCompleted = writable(0);
  export const showWarning = writable(false);
  export const showCannotComplete = writable(false);

  let group;
  let showSpeech = false;


  let lastTodoItemTitle = "";

  // Subscribe to the store
  todoList.subscribe((currentTodoList) => {
    // Update the value of the last item title
    if (currentTodoList.length > 0) {
      lastTodoItemTitle = currentTodoList[currentTodoList.length - 1].title;
    }
    if (lastTodoItemTitle) {
    }
  });
  
  // create var to autofocus on title
  let inputs = [];

  // reactive statement that runs after todoList is updated
  

function addTodoItem(event: Event) {
  console.log(lastTodoItemTitle);
  // Check if there's at least one item and if the first item's title isn't empty
  if ($todoList.length > 0 && lastTodoItemTitle === "") {
    showWarning.set(true); // Show the warning message
  } else {
    todoList.update((todoList) => [
      ...todoList,
      {
        id: todoList.length + 1,
        title: "",
        details: "",
        date: null,
        completed: false,
      },
    ]);
    tick().then(() => {
    inputs[inputs.length - 1].focus();
    showWarning.set(false); // Hide the warning message
  });
  }
}

  // Function to handle editing a todo item
  function editTodoItem(index: number, field: string, event: Event) {
    const newText = (event.target as HTMLTextAreaElement).value;
    todoList.update((items) => {
      const updatedItems = [...items];
      updatedItems[index][field] = newText;
      return updatedItems;
    });
  }

  // task id
  let idCounter = 0;

  onMount(() => {});

  // button hovers
  let todoHover: boolean[] = [];
  // listHover
  let listHover = false;
  // listCategoryHover
  let isHoveringList: boolean[] = [];
  // add task hover
  let addHover = false;
  // complete task
  let isHoveringButton: boolean[] = [];
  // delete item hover
  let isHoveringDelete: boolean[] = [];
  // favoritex item hover
  let isHoveringFavorite: boolean[] = [];
  // delete completed item hover
  let isHoveringDeleteCompleted: boolean[] = [];

  // keep track of the total task completed
  // goal: let user see how many items they have left: "5/8 tasks completed"
  function countCompleted() {
    tasksCompleted.update((n) => n + 1);
    console.log("task completed!");
    console.log($tasksCompleted + " total tasks completed");
  }

  // function to complete a todo item
  function completeTodoItem(index: number) {
    if ($todoList[index].title === "") {
      showCannotComplete.set(true);
    } else {
      todoList.update((active) => {
        const completedItem = active.splice(index, 1)[0];
        completedList.update((completed) => [...completed, completedItem]);
        countCompleted();
        return active;
      });
    }
  }

  // delete todo
  function removeTodoItem(index: number) {
    todoList.update((items) => items.filter((_, i) => i !== index));
  }

  // delete completed item
  function removeCompletedItem(index: number) {
    completedList.update((items) => items.filter((_, i) => i !== index));
  }

  const closeList = (event) => {
        if (event.target.classList.contains('list-overlay')) {
            showLists = !showLists;
        }
    }

  const closeCreateList = (event) => {
    event.stopPropagation();
    if (event.target.classList.contains('create-list-overlay')) {
      showCreateList = !showCreateList;
    }
  }

</script>

<body class="">
  

  <!-- container wrapper -->
  <div class="parent relative z-0">

    <!-- list of lists -->

    <!-- on click menu drops down -->
    <!-- starred -->
    <!-- each block list of lists (list) -->
    <!-- create new list -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div 
    on:click={() => showLists = !showLists}
    on:mouseenter={() => (listHover = true)}
    on:mouseleave={() => (listHover = false)}
    on:focus={() => (listHover = true)}
    on:blur={() => (listHover = false)}
    class="category absolute font-input font-bold tracking-tighter text-xl px-[2rem] py-[0.3rem]
       right-1/2 translate-x-1/2 border-b-0 border-[0.75rem] border-t-white border-x-slate-400
       -top-[3rem] text-white flex flex-row items-center justify-center
      hover:cursor-pointer bg-black space-x-3 transform transition-all duration-3000 ease-[backIn]
      ">
      {#if currentList === 'Favorites'}
          <img 
          src="/pfps/remilia-1.png" 
          alt="remilia corporation logo" 
          class="w-[1.5rem] h-[1.5rem]">
          {/if}
    <h2 class="translate-y-0.5">{currentList}</h2>
    {#if currentList === 'Favorites'}
          <img 
          src="/pfps/remilia-1.png" 
          alt="remilia corporation logo" 
          class="w-[1.5rem] h-[1.5rem]">
          {/if}
    {#if listHover}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div 
  on:click={closeList} 
  class="z-10 list-overlay fixed inset-0 bg-black 
  bg-opacity-60 flex flex-col ">
  
<!-- lists modal -->
  <div 
    in:slide={{duration: 700, easing: backOut}} 
    out:slide={{duration: 300, easing: backIn}} 
    class="absolute left-1/2 top-[6rem] -translate-x-1/2 w-[16rem] border-white  border-2 
    bg-black flex flex-col p-4 space-y-4 items-center font-input 
    text-xl tracking-tighter text-white">
    
    <!-- lists -->
    <ul class="space-y-2">
      {#each lists as list (list)} 
      <div class="flex flex-row item-center justify-center space-x-2">
        {#if list != currentList}
        {#if list === 'Favorites'}
        <img 
        src="/pfps/remilia-1.png" 
        alt="remilia corporation logo" 
        class="w-[1.5rem] h-[1.5rem]">
        {/if}
        <option on:click={() => {selectList(list); closeList} } class="list-overlay glow-white" value="">{list}</option>
        {#if list === 'Favorites'}
        <img 
        src="/pfps/remilia-1.png" 
        alt="remilia corporation logo" 
        class="w-[1.5rem] h-[1.5rem]">
        {/if}
        {/if}
      </div>
      {/each}
    </ul>
    <!-- create list -->
      <button on:click={() => showCreateList = !showCreateList} class="glow-white">Create New List</button>
  </div>
<!-- lists modal -->

<!-- create new list modal -->
{#if showCreateList}
  <div
    on:click={closeCreateList} transition:fade={{duration: 300, easing: cubicInOut}}
    class="z-10 create-list-overlay fixed inset-0 bg-black bg-opacity-90
    flex flex-col"
  >
    <div
      transition:slide={{duration: 1000, easing: cubicInOut}}
      class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
      border-white border-2 bg-black flex flex-col p-6 space-y-8
       font-input text-xl tracking-tighter text-white w-[20rem]"
    >
      <form on:submit|preventDefault={addList} class="flex flex-col space-y-4">
        <label for="List">Create New List</label>
        <input 
          type="text" name="List" id="List" placeholder="Very Important Tasks"
          bind:value={newList}
          class="text-[1rem] p-2 bg-white bg-opacity-20"
          >
          <div class="flex flex-row justify-end space-x-6
            text-[0.81rem] pt-6">
            <!-- cancel -->
            <button on:click|preventDefault={closeCreateList} class="create-list-overlay">Cancel</button>
            <!-- done -->
            <button type="submit" class="text-lime-400">Done</button>
          </div>
          

      </form>
    </div>
    
  </div>
{/if}
<!-- create new list modal -->


</div>
    {/if}
  </div>
  {#if showLists}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div 
    on:click={closeList} 
    class="z-10 list-overlay fixed inset-0 bg-black 
    bg-opacity-60 flex flex-col ">
    
  <!-- lists modal -->
    <div 
      in:slide={{duration: 700, easing: backOut}} 
      out:slide={{duration: 300, easing: backIn}} 
      class="absolute left-1/2 top-[6rem] -translate-x-1/2 w-[16rem] border-white  border-2 
      bg-black flex flex-col p-4 space-y-4 items-center font-input 
      text-xl tracking-tighter text-white">
      
      <!-- lists -->
      <ul class="space-y-2">
        {#each lists as list (list)} 
        <div class="flex flex-row item-center justify-center space-x-2">
          {#if list != currentList}
          {#if list === 'Favorites'}
          <img 
          src="/pfps/remilia-1.png" 
          alt="remilia corporation logo" 
          class="w-[1.5rem] h-[1.5rem]">
          {/if}
          <option on:click={() => {selectList(list); closeList} } class="list-overlay glow-white" value="">{list}</option>
          {#if list === 'Favorites'}
          <img 
          src="/pfps/remilia-1.png" 
          alt="remilia corporation logo" 
          class="w-[1.5rem] h-[1.5rem]">
          {/if}
          {/if}
        </div>
        {/each}
      </ul>
      <!-- create list -->
        <button on:click={() => showCreateList = !showCreateList} class="glow-white">Create New List</button>
    </div>
  <!-- lists modal -->

  <!-- create new list modal -->
  {#if showCreateList}
    <div
      on:click={closeCreateList} transition:fade={{duration: 300, easing: cubicInOut}}
      class="z-10 create-list-overlay fixed inset-0 bg-black bg-opacity-90
      flex flex-col"
    >
      <div
        transition:slide={{duration: 1000, easing: cubicInOut}}
        class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
        border-white border-2 bg-black flex flex-col p-6 space-y-8
         font-input text-xl tracking-tighter text-white w-[20rem]"
      >
        <form on:submit|preventDefault={addList} class="flex flex-col space-y-4">
          <label for="List">Create New List</label>
          <input 
            type="text" name="List" id="List" placeholder="Very Important Tasks"
            bind:value={newList}
            class="text-[1rem] p-2 bg-white bg-opacity-20"
            >
            <div class="flex flex-row justify-end space-x-6
              text-[0.81rem] pt-6">
              <!-- cancel -->
              <button on:click|preventDefault={closeCreateList} class="create-list-overlay">Cancel</button>
              <!-- done -->
              <button type="submit" class="text-lime-400">Done</button>
            </div>
            

        </form>
      </div>
      
    </div>
  {/if}
  <!-- create new list modal -->


  </div>
  {/if}
   <!-- list of lists -->

  <!-- add task -->
    <div 
   
    class="add-task-button absolute right-3 md:right-[15%] -bottom-[30%]  ">
      
      <form on:submit={addTodoItem} class="w-full m-auto">
        <button
          type="submit"
          class="px-8 h-[3rem] 
          font-input text-[1rem]
          font-bold
          -tracking-widest bg-black 
           shadow-inner shadow-black text-white hover:text-sky-300 
          transform transition-all ease-[backInOut] duration-500 flex items-center justify-center"
        >
            <p>ADD TASK</p>
          
        </button>
      </form>
    </div>






    <!-- main container -->
    <div
      class="main-container relative max-h-[80vh] mx-3 md:mx-auto my-[6rem] md:max-w-[70%] flex flex-col bg-white border-[0.75rem] md:border-[1rem] md:p-4 
      yayo-border-blue overflow-y-auto z-0
      "
    >
      <!-- messages -->

      <!-- 🚧 rewrite this whole Selection. 
        they should all have the same classes, except for the font color,
      just one div with the same transitions, -->
      
      <div 
          class="messages text-6xl md:text-6xl lg:text-8xl">
          {#if $showWarning}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <p 
                in:slide={{ duration: 1000, easing: backOut}}
                out:slide={{ duration: 700, easing: backIn}}
                  on:click={() => showWarning.set(false) }
                  class="font-input hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:text-lime-600 tracking-tighter font-bold text-lime-300">
                  PLEASE FILL OUT MOST RECENT TASK BEFORE CREATING NEW ONE 
              </p>
          {/if}
          {#if $showCannotComplete}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <p 
                in:slide={{ duration: 1000, easing: backOut}}
                out:slide={{ duration: 700, easing: backIn}}
                  on:click={() => showCannotComplete.set(false) }
                  class="font-input hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:text-rose-600 tracking-tighter font-bold text-rose-300">
                  TASK MUST BE TITLED BEFORE COMPLETING
              </p>
          {/if}
          {#if $todoList.length < 1 && $completedList.length > 0}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <p 
                in:slide={{ duration: 1000, easing: backOut}}
                out:slide={{ duration: 700, easing: backIn}}
                  class="font-input hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:text-sky-600 tracking-tighter font-bold text-sky-300">
                  ALL TASKS COMPLETE. GOOD JOB
              </p>
          {:else if $todoList.length < 1 && $completedList.length < 1}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <p 
                in:slide={{ duration: 1000, easing: backOut}}
                out:slide={{ duration: 700, easing: backIn}}
                  class="font-input tracking-tighter font-bold text-black">
                  NO {currentList?.toUpperCase()}
              </p>
          {/if}
    </div>
  <!-- messages -->
  

      <!-- messages -->

              <!-- use:autoAnimate={{ duration: 1000 }} -->
      <!-- tasks container -->
      <div class="">
        <!-- tasks list -->
        <div class="list">
          {#if $todoList.length > 0}
            <ul
              in:slide={{ duration: 1000, easing: backInOut}}
              out:slide={{ duration: 1000, easing: backInOut}}


              class="flex justify-start flex-wrap overflow-y-auto py-[0.6rem] transition-all transform duration-1000 ease-in-out"
            >
              {#each $todoList as todo, index (todo.id)}
                <li
                  in:fly={{ y: -100, duration: 500, easing: backOut }}
                  out:fly={{ y: 100, duration: 500, easing: backIn }}
                  animate:flip={{ duration: 1000, easing: backInOut }}
                  on:mouseenter={() => {
                    console.log("mouse enter index: ", index, "todo ID: ", todo.id);
                    todoHover[index] = true;
                  }}
                  on:mouseleave={() => {
                    console.log("mouse leave index: ", index, "todo ID: ", todo.id);
                    todoHover[index] = false;
                  }}
                  on:focus={() => (todoHover[index] = true)}
                  on:blur={() => (todoHover[index] = false)}
                  class="relative w-full filter grayscale hover:grayscale-0 transform transition-all duration-500 ease-[backIn]  md:w-1/2 lg:w-1/3 items-start border-t-white border-r-white border-[2rem] 
                  bg-sky-800"
                  >
                <!-- task buttons: favorite, complete, delete, more? -->
                  {#if todoHover[index]}
                    <div
                      in:slide={{duration: 500, easing: backOut}}
                      out:slide={{duration: 500, easing: backIn}}
                      class="todo-buttons absolute top-3 right-6 items-center space-x-3 text-3xl flex justify-end"
                    >
                    <!-- favorite button -->
                      <button>
                        <img 
                        on:mouseenter={() => isHoveringFavorite[index] = true}
                        on:mouseleave={() => isHoveringFavorite[index] = false}
                        on:focus={() => isHoveringFavorite[index] = true}
                        on:blur={() => isHoveringFavorite[index] = false}
                        src="/pfps/remilia-1.png" 
                        alt="remilia corporation logo" 
                        class="relative w-[1.75rem] h-[1.75rem] filter sepia invert hover:invert-0 hover:sepia-0
                        transform transition-all duration-300 ease-in">
                      </button>
                      {#if isHoveringFavorite[index]}
                        <div 
                        in:slide={{duration: 500, easing: backInOut}}
                        out:slide={{duration: 1000, easing: backInOut}}
                        class="font-input text-[1rem] text-center -tracking-widest absolute bottom-[3rem] -right-[1.5rem] px-2 w-[10rem] bg-yellow-300 border-black border-2">Add to Favorites</div>
                      {/if}
                    <!-- complete button -->
                      <button
                        on:mouseover={() => (isHoveringButton[index] = true)}
                        on:mouseout={() => (isHoveringButton[index] = false)}
                        on:focus={() => (isHoveringButton[index] = true)}
                        on:blur={() => (isHoveringButton[index] = false)}
                        tabindex="0"
                        on:click={() => {
                          completeTodoItem(index);
                          countCompleted;
                        }}
                      >
                        {#if isHoveringButton[index]}
                          ✅
                        {:else}
                          🔘
                        {/if}
                      </button>
                      {#if isHoveringButton[index]}
                        <div 
                        in:slide={{duration: 500, easing: backInOut}}
                        out:slide={{duration: 1000, easing: backInOut}}
                        class="font-input text-[1rem] text-center -tracking-widest absolute w-[10rem] bottom-[3rem] -right-[1.5rem] px-2 bg-green-500 border-black border-2">Complete Task</div>
                      {/if}
                      
                      
                      <!-- delete button -->
                      <button
                        on:mouseover={() => (isHoveringDelete[index] = true)}
                        on:mouseout={() => (isHoveringDelete[index] = false)}
                        on:focus={() => (isHoveringDelete[index] = true)}
                        on:blur={() => (isHoveringDelete[index] = false)}
                        tabindex="0"
                        on:click={() => removeTodoItem(index)}
                        class=""
                      >
                        {#if isHoveringDelete[index]}
                          <span>❌</span>
                        {:else}
                          <span>🚮</span>
                        {/if}
                      </button>
                      {#if isHoveringDelete[index]}
                        <div 
                        in:slide={{duration: 500, easing: backInOut}}
                        out:slide={{duration: 1000, easing: backInOut}}
                        class="font-input text-[1rem] text-center -tracking-widest absolute bottom-[3rem] w-[10rem] -right-[1.5rem] px-2 bg-red-500 border-black border-2">Delete Task</div>
                      {/if}
                    </div>
                  {/if}
                  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                  <div
                    class="flex flex-col space-y-2 px-4 py-3 font-input tracking-tighter text-white w-full"
                  >
                    <!-- title -->
                    <label for="todoTitle-{index}" class="pt-2">Title</label>
                    <input
                      id="todoTitle-{index}"
                      type="text"
                      bind:this={inputs[index]}
                      value={todo.title}
                      on:input={(event) => editTodoItem(index, "title", event)}
                      class="text-[1.43rem] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-50 outline-none hover:bg-sky-200 focus:bg-lime-300 transition-all duration-200"
                    />
                    <!-- details -->
                    <label for="todoDetails-{index}" class="pt-2">Details</label>
                    <textarea
                      id="todoDetails-{index}"
                      bind:value={todo.details}
                      on:input={(event) =>
                        editTodoItem(index, "details", event)}
                      class="placeholder:text-white text-[0.888rem] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-40 outline-none hover:bg-sky-300 focus:bg-lime-400 transition-all duration-200"
                    />
                    <!-- date -->
                    <label for="todoDate-{index}" class="pt-2">Date</label>
                    <input
                      type="date"
                      id="todoDate-{index}"
                      value={todo.date}
                      on:input={(event) => editTodoItem(index, "date", event)}
                      class="text-[1rem] w-full py-2 px-4 font-input font-bold text-white bg-white bg-opacity-30 outline-none hover:bg-sky-400 focus:bg-lime-500 transition-all duration-200"
                    />
                  </div>
                </li>
              {/each}
            </ul>
          {/if}

          <!-- completed tasks -->
          <div class="flex-2 flex-grow flex-shrink">
            {#if $completedList.length > 0}
              <h2
                class="mt-4 font-input text-black font-bold tracking-tighter text-3xl"
              >
                completed tasks
              </h2>
            {/if}
            <ul class=" space-y-2">
              {#each $completedList as item, index (item.id)}
             
                <li
                  class="flex flex-row border-[1rem] text-lime-400 border-x-slate-400 border-b-slate-800 justify-between bg-slate-600 shadow-md rounded-md"
                > 
                <div class="item-info  font-input-compressed -tracking-widest font-bold  w-full px-8 py-2 rounded-md">
                  <p class="title text-[3rem]">
                    {item.title}
                  </p>
                  <p class="details line-through text-[1rem]">{item.details}</p>
                  
                  </div>
                  <button
                    on:mouseover={() =>
                      (isHoveringDeleteCompleted[index] = true)}
                    on:mouseout={() =>
                      (isHoveringDeleteCompleted[index] = false)}
                    on:focus={() => (isHoveringDeleteCompleted[index] = true)}
                    on:blur={() => (isHoveringDeleteCompleted[index] = false)}
                    tabindex="0"
                    on:click={() => removeCompletedItem(index)}
                    class="mr-8 text-[3vw]"
                  >
                    {#if isHoveringDeleteCompleted[index]}
                      <span>🚮</span>
                    {:else}
                      <span>🔘</span>
                    {/if}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div></body
>

<style>
  body {
    height: 100vh;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
  }
</style>
