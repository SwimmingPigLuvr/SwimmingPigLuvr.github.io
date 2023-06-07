<script lang="ts">
  import "../app.css";
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import autoAnimate from '@formkit/auto-animate';
  import { cubicInOut } from "svelte/easing";


  export const tasksCompleted = writable(0);

  let group;



  // task id
  let idCounter = 0;

  

  onMount(() => {
    
  });

  // button hover
  let isHoveringButton: boolean[] = [];
  // completed item hover
  let isHoveringCompleted: boolean[] = [];



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

  // Function to handle adding a new todo item
  function addTodoItem(event: Event) {
    todoList.update(todoList => [...todoList, { id: (todoList.length + 1), title: '', details: '', date: null, completed: false }]);
  }
  
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

  

  // Function to handle removing a todo item
  function removeTodoItem(index: number) {
    todoList.update(items => items.filter((_, i) => i !== index));
  }

  // Function to handle removing a todo item
  function removeCompletedItem(index: number) {
    completedList.update(items => items.filter((_, i) => i !== index));
  }

  // Function to handle editing a todo item
  function editTodoItem(index: number, field: string, event: Event) {
    const newText = (event.target as HTMLInputElement).value;
    todoList.update(items => {
      const updatedItems = [...items];
      updatedItems[index][field] = newText;
      return updatedItems;
    });
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
  <div class="max-w-md m-auto">
  <h1 class="glow bg-black mt-24 font-input text-white text-5xl tracking-tighter font-bold text-center mb-4">important tasks</h1>
</div>
  

<!-- main container -->
<div class="container flex flex-col max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-4 bg-white yayo-border-blue">

<!-- input task -->
<div class="mb-4">
  <form on:submit={addTodoItem}>
    <div class="flex justify-start items-end space-x-3">
      <img src="/images/6198assisstant.png" alt="" class="h-[10vw]">
      <button type="submit" class="flex flex-row justify-center space-x-4 items-center px-8 py-4 font-input tracking-tighter bg-black text-white hover:bg-white hover:text-black transition-all duration-300 hover:shadow-xl ease-in-out text-[1vw]">
        Add Task
      </button>
    </div>
  </form>
  {#if $todoList.length < 1 && $completedList.length > 0}
  <p class="font-input tracking-tighter font-bold text-8xl mt-2a text-black">All tasks complete. Good Job 🐡</p>
{:else if $todoList.length < 1 && $completedList.length < 1}
  <p class="font-input tracking-tighter font-bold text-2xl mt-8 ml-4 text-black">No important tasks.</p>
  {/if}
</div>

<!-- important tasks container -->
<div class="flex flex-row space-x-4 flex-grow flex-shrink">


  <!-- tasks list -->
  <div class="flex-grow flex-shrink">
  {#if $todoList.length > 0}
    <ul 
      use:autoAnimate={{duration: 150}}
      class="space-y-2">
      {#each $todoList as todo, index (todo.id)}
        <li
          class="flex flex-row bg-sky-600 rounded-lg">
            <button 
              on:mouseover={() => isHoveringButton[index] = true} 
              on:mouseout={() => isHoveringButton[index] = false} 
              on:focus={() => isHoveringButton[index] = true} 
              on:blur={() => isHoveringButton[index] = false} 
              tabindex="0"
              on:click={() => {completeTodoItem(index); countCompleted}} 
              class="ml-2 text-2xl">
                {#if isHoveringButton[index]}
                  <span>💖</span>
                {:else}
                  <span>🔘</span>
                {/if}
            </button>
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <div class="flex flex-col space-y-2 p-2">
            <!-- title -->
            <input type="text"
              placeholder="Title"
              value={todo.title} 
              on:input={(event) => editTodoItem(index, event)} 
              class="todo-input">
            <!-- details -->
            <input type="text"
              placeholder="details"
              value={todo.details} 
              on:input={(event) => editTodoItem(index, event)} 
                class="todo-input">
            <!-- date -->
            <input type="date"
              placeholder="date"
              value={todo.date} 
              on:input={(event) => editTodoItem(index, event)} 
                class="todo-input">
          </div>
            <button 
              on:click={() => removeTodoItem(index)}
              class="hover:-translate-y-0.5 hover:shadow-white mr-2">
                🗑
            </button>
        </li>
      {/each}
    </ul>
  {/if}



  <!-- completed tasks -->
  <div class="flex-2 flex-grow flex-shrink">
  {#if $completedList.length > 0}
  <h2 class="mt-4 font-input text-black font-bold tracking-tighter text-3xl">completed tasks</h2>
  {/if}
  <ul class="space-y-2">
  {#each $completedList as item, index (item.id)}
    <li 
    class="flex flex-row2 bg-emerald-800 hover:bg-lime-500 bg-opacity-50 shadow-md rounded-md">
  <p class="font-p22 line-through text-blue-100 w-full px-4 py-2 rounded-md">
    {item.title}
  </p>
    <button 
    on:mouseover={() => isHoveringCompleted[index] = true} 
    on:mouseout={() => isHoveringCompleted[index] = false} 
    on:focus={() => isHoveringCompleted[index] = true} 
    on:blur={() => isHoveringCompleted[index] = false} 
    tabindex="0"
    on:click={() => removeCompletedItem(index)} 
    class="mr-1 text-2xl">
      {#if isHoveringCompleted[index]}
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

  .todo-input {
    font-weight: bold;
    font-family: 'input', sans-serif;
    color: black;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    background-color: white;
    background-opacity: 0;
    outline: none;
    transition: background-opacity 0.2s ease-in-out;
  }

  .todo-input:focus {
    background-opacity: 0.2;
  }

  
</style>
