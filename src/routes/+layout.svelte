<script>
  import { fade } from 'svelte/transition';
  import "../app.css"
  let hover = false;
</script>

<div 
  class="min-w-full fixed bottom-0 -left-28 transition-transform duration-300"
  style={`transform: translateY(${hover ? 0 : 100}%)`}>
  {#if hover}
    <img 
      src="images/6198assisstant.png" 
      alt="Remilio 6198" 
      class="max-w-full"
      in:fade={{duration: 300}}
      out:fade={{duration: 300}}
    />
  {/if}
</div>

<div class="fixed bottom-10 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-black bg-opacity-30">
  <h3 class="text-white font-input">
    made by 
    <a href="https://twitter.com/swimmingpigluvr">
      <span 
        on:mouseover={() => hover = true}
        on:mouseout={() => hover = false}
        on:focus={() => hover = true}
        on:blur={() => hover = false}
        class="hover:text-lime-200"
      >
        swimming
      </span>
    </a>
  </h3>
</div>

{#if hover}
  <div class="fixed font-input text-white bottom-10 left-1/2 transform translate-x-20 py-2 px-4">
    pig luvr
  </div>
{/if}

<slot />
