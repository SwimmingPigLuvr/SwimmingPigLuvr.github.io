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
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import autoAnimate from "@formkit/auto-animate";
  import { cubicInOut } from "svelte/easing";
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





  
  export default TodoList;


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

  // create var to autofocus on title
  let titleInput;

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

  // todo if todolist.length < 1 => showWarning = false
  // Function to handle adding a new todo item
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
      showWarning.set(false); // Hide the warning message

      afterUpdate(() => {
        titleInput.focus();
        showWarning.set(false);
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
  // delete completed item hover
  let isHoveringDeleteCompleted: boolean[] = [];

  // keep track of the total task completed
  // goal: let user see how many items they have left: "5/8 tasks completed"
  function countCompleted() {
    tasksCompleted.update((n) => n + 1);
    console.log("task completed!");
    console.log($tasksCompleted + "total tasks completed");
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

<body class="bg-lime-400">
  

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
    class="category absolute font-input font-bold tracking-tighter text-xl w-[16rem] 
      h-[2.5rem] left-1/2 -translate-x-1/2 border-white hover:border-4 hover:border-b-0 border-2 border-b-0
      -top-[2.5rem] text-white flex flex-row items-center justify-center
      hover:cursor-pointer bg-black space-x-3 transform transition-all duration-3000 ease-in-out">
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
      <p 
        transition:fade={{duration: 200, easing: cubicInOut}} 
        class="fixed top-[0.8125rem] text-sm right-3"
        >
        ⬇️
      </p>
    {/if}
  </div>
  {#if showLists}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div 
    on:click={closeList} transition:fade={{duration: 300, easing: cubicInOut}}
    class="z-10 list-overlay fixed inset-0 bg-black 
    bg-opacity-60 flex flex-col ">
    
  <!-- lists modal -->
    <div transition:slide={{duration: 500}} 
      class="absolute left-1/2 top-20 -translate-x-1/2 w-[16rem] border-white  border-2 
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
    <div class="add-task-button absolute right-3 -bottom-[33px] md:right-6 lg:top-0 lg:right-28">
      <form on:submit={addTodoItem} class="w-full m-auto">
        <button
          type="submit"
          on:mouseenter={() => (addHover = true)}
          on:mouseleave={() => (addHover = false)}
          on:focus={() => (addHover = true)}
          on:blur={() => (addHover = false)}
          class="w-[144px] h-[33px] lg:h-[4vw] lg:w-[4vw] bg-white
          font-input font-bold text-black text-[0.88rem] lg:text-[1vw] leading-tight 
          tracking-tighter border-sunset
          hover:border-[0.33rem] lg:hover:border-[0.5vw] shadow-inner shadow-black
          transform transition-all ease-in-out duration-1000 flex items-center justify-center"
        >
            <span transition:fade class="text-left">ADD TASK</span>
          {#if addHover === true}
          <div class="text-[1.11rem] flex flex-row flex-wrap justify-between fixed w-full px-2 top-0">
            <span transition:fade class=" ">🌸</span>
            <span transition:fade class=" ">🌸</span>
          </div>
          {/if}
        </button>
      </form>
    </div>
    <!-- main container -->
    <div
      class="max-h-[85vh] mx-3 my-20 lg:my-6 md:mx-6 lg:mx-48 flex flex-col p-2 md:p-8 bg-white border-[3vw] md:border-[2vw] lg:border-[1vw] yayo-border-blue overflow-y-auto"
    >
      <!-- messages -->
      <div class="messages text-6xl md:text-6xl lg:text-8xl">
        {#if $showWarning}
          <p class="font-input tracking-tighter font-bold text-lime-300">
            PLEASE FILL OUT FIRST TASK BEFORE CREATING NEW ONE
          </p>
        {/if}
        {#if $showCannotComplete}
          <p class="font-input tracking-tighter font-bold text-rose-300">
            TASK MUST BE TITLED BEFORE COMPLETING
          </p>
        {/if}
        {#if $todoList.length < 1 && $completedList.length > 0}
          <p class="font-input tracking-tighter font-bold text-sky-300">
            ALL TASKS COMPLETE. GOOD JOB
          </p>
        {:else if $todoList.length < 1 && $completedList.length < 1}
          <p
            class="font-input tracking-tighter font-bold text-black"
          >
            NO {currentList?.toUpperCase()}
          </p>
        {/if}
      </div>

      <!-- tasks container -->
      <div class="">
        <!-- tasks list -->
        <div class="">
          {#if $todoList.length > 0}
            <ul
              use:autoAnimate={{ duration: 300 }}
              class="flex justify-between flex-wrap overflow-y-auto m-2"
            >
              {#each $todoList as todo, index (todo.id)}
                <li
                  on:mouseenter={() => (todoHover[index] = true)}
                  on:mouseleave={() => (todoHover[index] = false)}
                  on:focus={() => (todoHover[index] = true)}
                  on:blur={() => (todoHover[index] = false)}
                  class="w-full md:w-1/2 items-start border-b-white border-r-white border-[2vw] bg-sky-500"
                >
                <!-- task buttons: favorite, complete, delete, more? -->
                  {#if todoHover[index]}
                    <div
                      class="todo-buttons absolute top-4 right-8 items-center space-x-3 text-3xl flex justify-end"
                    >
                    <!-- favorite button -->
                      <button>
                        <img 
                        src="/pfps/remilia-1.png" 
                        alt="remilia corporation logo" 
                        class="w-[1.75rem] h-[1.75rem] filter sepia invert hover:invert-0 hover:sepia-0
                        transform transition-all duration-300 ease-in">
                      </button>
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
                      bind:this={titleInput}
                      value={todo.title}
                      on:input={(event) => editTodoItem(index, "title", event)}
                      class="text-[2vw] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-50 outline-none hover:bg-sky-200 focus:bg-lime-300 transition-all duration-200"
                    />
                    <!-- details -->
                    <label for="todoDetails-{index}" class="pt-2">Details</label>
                    <textarea
                      id="todoDetails-{index}"
                      bind:value={todo.details}
                      on:input={(event) =>
                        editTodoItem(index, "details", event)}
                      class="placeholder:text-white text-[1.5vw] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-40 outline-none hover:bg-sky-300 focus:bg-lime-400 transition-all duration-200"
                    />
                    <!-- date -->
                    <label for="todoDate-{index}" class="pt-2">Date</label>
                    <input
                      type="date"
                      id="todoDate-{index}"
                      value={todo.date}
                      on:input={(event) => editTodoItem(index, "date", event)}
                      class="text-[2vw] lg:text-[1vw] w-full py-2 px-4 font-input font-bold text-white bg-white bg-opacity-30 outline-none hover:bg-sky-400 focus:bg-lime-500 transition-all duration-200"
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
                  class="flex flex-row2 bg-emerald-800 hover:bg-lime-500 bg-opacity-50 shadow-md rounded-md"
                >
                  <p
                    class="font-p22 line-through text-blue-100 w-full px-4 py-2 rounded-md"
                  >
                    {item.title}
                  </p>
                  <button
                    on:mouseover={() =>
                      (isHoveringDeleteCompleted[index] = true)}
                    on:mouseout={() =>
                      (isHoveringDeleteCompleted[index] = false)}
                    on:focus={() => (isHoveringDeleteCompleted[index] = true)}
                    on:blur={() => (isHoveringDeleteCompleted[index] = false)}
                    tabindex="0"
                    on:click={() => removeCompletedItem(index)}
                    class="mr-2 text-[3vw]"
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
