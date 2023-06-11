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
    todoList.update(active => {
      const completedItem = active.splice(index, 1)[0];
      completedList.update(completed => [...completed, completedItem]);
      countCompleted();
      return active;
    });
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
<div class="parent relative">
<div class="add-task-button absolute right-3 -top-14 md:right-6 lg:top-0">
  <form on:submit={addTodoItem} class="w-full m-auto">
    <div class="">
      <button type="submit" 
        class="w-[10vw] h-[10vw] lg:h-[3vw] lg:w-[8vw] bg-black text-white text-[2vw] font-input tracking-tighter hover:bg-rose-300 
        hover:text-black transform transition-all ease-in-out duration-250">
        +
      </button>
    </div>
  </form>
</div>
<!-- main container -->
<div class="max-h-[85vh] mx-3 my-20 lg:my-6 md:mx-6 lg:mx-48 flex flex-col p-2 md:p-8 bg-white border-[3vw] md:border-[2vw] lg:border-[1vw] yayo-border-blue overflow-y-auto">
  

<div class="messages text-6xl md:text-6xl lg:text-8xl">
  
  {#if $showWarning}
    <p class="font-input tracking-tighter font-bold text-lime-300">PLEASE FILL OUT FIRST TASK BEFORE CREATING NEW ONE</p>
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
      use:autoAnimate={{duration: 150}}
      class="flex justify-between  flex-wrap overflow-y-auto m-2">
      {#each $todoList as todo, index (todo.id)}
        <li
          class="w-full md:w-1/2 items-start border-b-white border-r-white border-[2vw] bg-sky-600">
            <div class="todo-buttons pt-2 flex space-x-1 justify-start">
            <button 
              on:mouseover={() => isHoveringButton[index] = true} 
              on:mouseout={() => isHoveringButton[index] = false} 
              on:focus={() => isHoveringButton[index] = true} 
              on:blur={() => isHoveringButton[index] = false} 
              tabindex="0"
              on:click={() => {completeTodoItem(index); countCompleted}} 
              class="ml-2 text-[3vw] align-top">
                {#if isHoveringButton[index]}
                  <span>💖</span>
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
              class="mr-1 text-[3vw]">
                {#if isHoveringDelete[index]}
                  <span>❌</span>
                {:else}
                  <span>🚮</span>
                {/if}
            </button>
          </div>
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <div class="flex flex-col space-y-2 p-2 w-full">
            <!-- title -->
            <input type="text"
              bind:this={titleInput}
              placeholder="Title"
              value={todo.title} 
              on:input={(event) => editTodoItem(index, 'title', event)} 
              class="placeholder:text-white text-[2vw] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-50 rounded-md outline-none hover:bg-sky-200 focus:bg-lime-300 transition-all duration-200">
            <!-- details -->
            <textarea
              placeholder="details"
              bind:value={todo.details} 
              on:input={(event) => editTodoItem(index, 'details', event)} 
                class="placeholder:text-white text-[1vw] w-full py-2 px-4 font-input font-bold text-black bg-white bg-opacity-40 rounded-md outline-none hover:bg-sky-300 focus:bg-lime-400 transition-all duration-200"></textarea>
            <!-- date -->
            <input type="date"
              placeholder="date"
              value={todo.date} 
              on:input={(event) => editTodoItem(index, 'date', event)} 
                class="text-[1vw] w-full py-2 px-4 font-input font-bold text-white bg-white bg-opacity-30 rounded-md outline-none hover:bg-sky-400 focus:bg-lime-500 transition-all duration-200">
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
