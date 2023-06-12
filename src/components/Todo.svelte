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
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import autoAnimate from '@formkit/auto-animate';
  import { cubicInOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  import { afterUpdate } from "svelte";


  // Create a writable store to hold the list of todo items
  const completedList = writable<ListItem[]>([]);

  interface ListItem {
    id: number
    title: string
    details: string
    date: Date | null 
    completed: boolean
  }

  interface TodoList {
    category: string
    tasks: ListItem[]
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

  let lastTodoItemTitle = '';

  // Subscribe to the store
  todoList.subscribe(currentTodoList => {
      // Update the value of the last item title
      if(currentTodoList.length > 0) {
          lastTodoItemTitle = currentTodoList[currentTodoList.length - 1].title;
      }
      if(lastTodoItemTitle) {

      }
  });

  // todo if todolist.length < 1 => showWarning = false
 // Function to handle adding a new todo item
 function addTodoItem(event: Event) {
    console.log(lastTodoItemTitle);
    // Check if there's at least one item and if the first item's title isn't empty
    if ($todoList.length > 0 && lastTodoItemTitle === '') {
      showWarning.set(true); // Show the warning message
    } else {
      todoList.update(todoList => [...todoList, { id: (todoList.length + 1), title: '', details: '', date: null, completed: false }]);
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
    todoList.update(items => {
      const updatedItems = [...items];
      updatedItems[index][field] = newText;
      return updatedItems;
    });
  }


  // task id
  let idCounter = 0;

  

  onMount(() => {
    
  });

  // button hovers
  let todoHover: boolean[] = [];
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
    tasksCompleted.update(n => n + 1);
    console.log("task completed!");
    console.log($tasksCompleted + "total tasks completed");
  }

  // function to complete a todo item
  function completeTodoItem(index: number) {
    if ($todoList[index].title === "") {
      showCannotComplete.set(true);
    } else {
    todoList.update(active => {
      const completedItem = active.splice(index, 1)[0];
      completedList.update(completed => [...completed, completedItem]);
      countCompleted();
      return active;
    });
    }
  }

  // delete todo
  function removeTodoItem(index: number) {
    todoList.update(items => items.filter((_, i) => i !== index));
  }

  // delete completed item
  function removeCompletedItem(index: number) {
    completedList.update(items => items.filter((_, i) => i !== index));
  }

export default TodoList;
  
</script>

<body class="bg-lime-400">
  <!-- navlinks -->
<!-- <div class="flex flex-col  left-0">
  <div class="flex-1 bg-black py-2 px-4 bg-opacity-50">
    <h3 class="text-white font-input">HOME</h3>
  </div>
  <div class="flex-2 bg-black py-2 px-4 bg-opacity-50">
    <h3 class="text-white font-input">HOME</h3>
  </div>
  <div class="flex-3 bg-black py-2 px-4 bg-opacity-50">
    <h3 class="text-white font-input">HOME</h3>
  </div>
</div> -->
<!-- navlinks -->

<!-- title -->
  <!-- <div class="w-[40vw] fixed top-3 left-1/2 -translate-x-1/2">
    <h1 class="text-[5vw] py-[2.5vw] glow bg-black font-input text-white tracking-tighter font-bold text-center">important tasks</h1>
  </div> -->
  
<!-- container wrapper -->
<!-- add task -->
<div class="parent relative z-0">
<div class="add-task-button absolute right-3 -top-14 md:right-6 lg:top-0">
  <form on:submit={addTodoItem} class="w-full m-auto">
      <button type="submit" 
        on:mouseenter={() => addHover = true}
        on:mouseleave={() => addHover = false}
        on:focus={() => addHover = true}
        on:blur={() => addHover = false}
        class="p-1 leading-tight w-[10vw] h-[10vw] lg:h-[3vw] lg:w-[8vw] bg-black text-white text-[2vw] font-input-compressed tracking-tighter
        yayo-border-pink border-r-[1vw] border-l-[1vw] border-b-[3vw] border-t-[1vw] 
        hover:border-r-[2vw] hover:border-l-[2vw] hover:border-t-[2vw] hover:border-b-[4vw]
        transform transition-all ease-in-out duration-100">
        {#if addHover === false}
        add
        {:else}
        +
        {/if}
      </button>
  </form>
</div>
<!-- main container -->
<div class="max-h-[85vh] mx-3 my-20 lg:my-6 md:mx-6 lg:mx-48 flex flex-col p-2 md:p-8 bg-white border-[3vw] md:border-[2vw] lg:border-[1vw] yayo-border-blue overflow-y-auto">
  

<!-- messages -->
<div class="messages text-6xl md:text-6xl lg:text-8xl">
  
  {#if $showWarning}
    <p class="font-input tracking-tighter font-bold text-lime-300">PLEASE FILL OUT FIRST TASK BEFORE CREATING NEW ONE</p>
  {/if}
  {#if $showCannotComplete}
    <p class="font-input tracking-tighter font-bold text-rose-300">TASK MUST BE TITLED BEFORE COMPLETING</p>
  {/if}
  {#if $todoList.length < 1 && $completedList.length > 0}
  <p class="font-input tracking-tighter font-bold text-sky-300">All tasks complete. Good Job</p>
{:else if $todoList.length < 1 && $completedList.length < 1}
  <p class="font-input text-center tracking-tighter font-bold text-[4vw] py-8 text-black">No important tasks.</p>
  {/if}
</div>

<!-- important tasks container -->
<div class="">


  <!-- tasks list -->
  <div class="">
  {#if $todoList.length > 0}
    <ul 
      use:autoAnimate={{duration: 300}}
      class="flex justify-between flex-wrap overflow-y-auto m-2">
      {#each $todoList as todo, index (todo.id)}
        <li
          use:autoAnimate={{duration: 100}}
          on:mouseenter={() => todoHover[index] = true}
          on:mouseleave={() => todoHover[index] = false}
          on:focus={() => todoHover[index] = true}
          on:blur={() => todoHover[index] = false}
          class="w-full md:w-1/2 items-start border-b-white border-r-white border-[2vw] bg-sky-500">
            {#if todoHover[index]}
            <div 
              class="todo-buttons absolute top-0 right-3 items-center space-x-2 text-[5vw] flex justify-end">
            <button 
              on:mouseover={() => isHoveringButton[index] = true} 
              on:mouseout={() => isHoveringButton[index] = false} 
              on:focus={() => isHoveringButton[index] = true} 
              on:blur={() => isHoveringButton[index] = false} 
              tabindex="0"
              on:click={() => {completeTodoItem(index); countCompleted}} 
            >
                {#if isHoveringButton[index]}
                  <span>✅</span>
                {:else}
                  <span>🔘</span>
                {/if}
            </button>
            <button 
              on:mouseover={() => isHoveringDelete[index] = true}
              on:mouseout={() => isHoveringDelete[index] = false}
              on:focus={() => isHoveringDelete[index] = true}
              on:blur={() => isHoveringDelete[index] = false}
              tabindex="0"
              on:click={() => removeTodoItem(index)}
              class="">
                {#if isHoveringDelete[index]}
                  <span>❌</span>
                {:else}
                  <span>🚮</span>
                {/if}
            </button>
          </div>
          {/if}
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <div class="flex flex-col space-y-2 px-4 py-3 font-input tracking-tighter text-white  w-full">
            <!-- title -->
            <label for="todoTitle-{index}">Title</label>
            <input 
              id="todoTitle-{index}"
              type="text"
              bind:this={titleInput}
              value={todo.title} 
              on:input={(event) => editTodoItem(index, 'title', event)} 
              class="text-[2vw] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-50 outline-none hover:bg-sky-200 focus:bg-lime-300 transition-all duration-200">
            <!-- details -->
            <label for="todoDetails-{index}">Details</label>
            <textarea
              id="todoDetails-{index}"
              bind:value={todo.details} 
              on:input={(event) => editTodoItem(index, 'details', event)} 
                class="placeholder:text-white text-[1.5vw] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-40 outline-none hover:bg-sky-300 focus:bg-lime-400 transition-all duration-200"></textarea>
            <!-- date -->
            <label for="todoDate-{index}">Date</label>
            <input type="date"
              id="todoDate-{index}"
              value={todo.date} 
              on:input={(event) => editTodoItem(index, 'date', event)} 
                class="text-[2vw] w-full py-2 px-4 font-input font-bold text-white bg-white bg-opacity-30 outline-none hover:bg-sky-400 focus:bg-lime-500 transition-all duration-200">
          </div>
            
        </li>
      {/each}
    </ul>
  {/if}



          <!-- completed tasks -->
          <div class="flex-2 flex-grow flex-shrink">
            {#if $completedList.length > 0}
              <h2 class="mt-4 font-input text-black font-bold tracking-tighter text-3xl">completed tasks</h2>
                {/if}
                  <ul class=" space-y-2">
                  {#each $completedList as item, index (item.id)}
                    <li 
                    class="flex flex-row2 bg-emerald-800 hover:bg-lime-500 bg-opacity-50 shadow-md rounded-md">
                  <p class="font-p22 line-through text-blue-100 w-full px-4 py-2 rounded-md">
                    {item.title}
                  </p>
                  <button 
                  on:mouseover={() => isHoveringDeleteCompleted[index] = true} 
                  on:mouseout={() => isHoveringDeleteCompleted[index] = false} 
                  on:focus={() => isHoveringDeleteCompleted[index] = true} 
                  on:blur={() => isHoveringDeleteCompleted[index] = false} 
                  tabindex="0"
                  on:click={() => removeCompletedItem(index)} 
                  class="mr-1 text-[3vw]">
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
</body>

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
