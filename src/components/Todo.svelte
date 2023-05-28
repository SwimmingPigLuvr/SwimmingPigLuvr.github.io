<script lang="ts">
  import "../app.css";
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { flip } from 'svelte/animate';



  // task id
  let idCounter = 0;

  // shuffle bg
  let bgs: string[] = ['/images/notes.png', '/images/vroom.png', '/images/artGangMoney.jpeg', '/images/shelby.webp'];



  let currentBgIndex: number = 0;

  function updateBackground(): void {
    document.body.style.backgroundImage = `url(${bgs[currentBgIndex]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }

  

  onMount(() => {
    
    updateBackground(); // update the background immediately on mount
    const interval = setInterval(() => {
      currentBgIndex = (currentBgIndex + 1) % bgs.length;
      updateBackground();
    }, 30000); 

    //  clean function to clear the interval when the component is destroyed
    return () => {
      clearInterval(interval);
    };
  });

  // button hover
  let isHoveringButton: boolean[] = [];
  // completed item hover
  let isHoveringCompleted: boolean[] = [];

  // Create a writable store to hold the list of todo items
  const completedList = writable<ListItem[]>([]);

  interface ListItem {
    id: number
    text: string
    completed: boolean
    isHovering: boolean
  }
  
  export const todoList = writable<ListItem[]>([]);

  let items: ListItem[] = [];

  $: items = $todoList;

  // Function to handle adding a new todo item
  function addTodoItem(event: Event) {
    event.preventDefault();
    const todoInput = event.target as HTMLFormElement;
    const newTodo = todoInput.todo.value.trim();
    if (newTodo !== '') {
      todoList.update(items => [...items, { id: idCounter++, text: newTodo, completed: false, isHovering: false }]);
      todoInput.reset();
    }
  }

  // function to complete a todo item
  function completeTodoItem(index: number) {
    todoList.update(active => {
      const completedItem = active.splice(index, 1)[0];
      completedList.update(completed => [...completed, completedItem]);
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
  function editTodoItem(index: number, event: Event) {
    const newText = (event.target as HTMLInputElement).value;
    todoList.update(items => {
      const updatedItems = [...items];
      updatedItems[index].text = newText;
      return updatedItems;
    });
  }


  
</script>

<body>
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
  <h1 class="glow bg-black mt-20 font-input text-white text-5xl tracking-tighter font-bold text-center mb-4">important tasks</h1>
</div>
  

<!-- main container -->
<div class="container flex flex-col max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-4 bg-white rounded-md">

<!-- input task -->
<div class="mb-4">
  <form on:submit={addTodoItem}>
    <div class="flex flex-row">
      <input type="text" name="todo" placeholder="enter an important task" class="placeholder-blue-400 bg-slate-100 hover:bg-slate-200 transition-all duration-300 text-slate-800 flex-1 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-orange-500">
      <button type="submit" class="flex-2 ml-2 px-4 py-2 font-input bg-blue-900 text-white hover:bg-sky-200 hover:text-blue-900 transition-all duration-200 text-3xl rounded-md">+</button>
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
    <ul class="space-y-2">
      {#each $todoList as todo, index (todo.id)}
        <li
          animate:flip={{duration: 250}}
          on:mouseover={() => todoList.update(items => {
            const updatedItems = [...items];
            updatedItems[index].isHovering = true;
            return updatedItems;
          })}
          on:mouseout={() => todoList.update(items => {
            const updatedItems = [...items];
            updatedItems[index].isHovering = false;
            return updatedItems;
          })}
          on:focus={() => todoList.update(items => {
            const updatedItems = [...items];
            updatedItems[index].isHovering = true;
            return updatedItems;
          })}
          on:blur={() => todoList.update(items => {
            const updatedItems = [...items];
            updatedItems[index].isHovering = false;
            return updatedItems;
          })}
          class="flex flex-row bg-sky-600 hover:bg-sky-400 rounded-lg">

<!-- complete task button -->
          
            <button 
              on:mouseover={() => isHoveringButton[index] = true} 
              on:mouseout={() => isHoveringButton[index] = false} 
              on:focus={() => isHoveringButton[index] = true} 
              on:blur={() => isHoveringButton[index] = false} 
              tabindex="0"
              on:click={() => completeTodoItem(index)} 
              class="ml-2 text-2xl">
                {#if isHoveringButton[index]}
                  <span>💖</span>
                {:else}
                  <span>🔘</span>
                {/if}
            </button>
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
         
          <input type="text" 
            value={todo.text} 
            on:input={(event) => editTodoItem(index, event)} 
              class="font-bold font-input text-white w-full px-4 py-2 rounded-md bg-sky-500 bg-opacity-0 focus:outline-none">
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
          animate:flip={{duration: 150}}
    class="flex flex-row2 bg-emerald-800 hover:bg-lime-500 bg-opacity-50 shadow-md rounded-md">
  <p class="font-p22 line-through text-blue-100 w-full px-4 py-2 rounded-md">
    {item.text}
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
    background: url(${bgs[currentBgIndex]});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .glow {
    transition: text-shadow 0.2s ease-in;
    text-shadow: 0 0 10px rgb(0, 0, 0), /* horizontal offset, vertical offset, blur radius, color */
                 0 0 20px rgb(0, 0, 0),
                 0 0 30px #000000,
                 0 0 40px #000000;
  }

  .glow:hover {
    text-shadow: 0 0 10px rgb(85, 255, 0), /* horizontal offset, vertical offset, blur radius, color */
                 0 0 20px #79ff51,
                 0 0 30px rgb(81, 255, 0),
                 0 0 50px rgb(255, 255, 255);

  }
</style>
