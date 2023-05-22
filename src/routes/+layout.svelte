<script lang="ts">
  import { fade } from 'svelte/transition';
  import "../app.css"
  let hover = false;
  let hoverCount = 0;
  const hoverPositions = [100, 50, 30, 0];
  let remi = [6198, 4153, 4981];
  let selectedRemi = remi[Math.floor(Math.random() * remi.length)];

  let socialHover: string = 'connect';
</script>



<div 
  class="min-w-full fixed bottom-0 -left-28 transition-transform duration-300"
  style={`transform: translateY(${hover ? hoverPositions[hoverCount] : 100}%)`}
  >
  {#if hover}
    <img 
      src="images/{selectedRemi}assisstant.png" 
      alt="Remilio 6198" 
      class="max-w-full"
      in:fade={{duration: 100}}
      out:fade={{duration: 300}}
    />
  {/if}
</div>
<div class="flex -space-y-1 rounded-tl-lg flex-col fixed bottom-36 right-0 py-2 px-4 bg-black bg-opacity-30">
<h3 class="text-white font-input">
    made by 
    <a href="https://twitter.com/swimmingpigluvr" target="_blank" rel="noopener noreferrer">
      <span 
        on:mouseover={() => {
          hover = true
          if (hoverCount < hoverPositions.length - 1) hoverCount++;
        }}

        on:mouseout={() => hover = false}
        on:focus={() => hover = true}
        on:blur={() => hover = false}
        class="hover:text-lime-200"
      >
        swimming🐷💖
      </span>
    </a>
  </h3>
</div>


<!-- links -->
<!-- <container class="flex fixed bottom-0 space-x-1">
  
  <a href="https://github.com/swimmingpigluvr" target="_blank" rel="noopener noreferrer">
    

<div class="git bg-white w-10 h-5"
  on:mouseover={() => {
    socialHover = 'github'
    if (hoverCount < hoverPositions.length - 1) hoverCount++;
  }}

  on:mouseout={() => socialHover = socialHover}
  on:focus={() => socialHover = 'github'}
  on:blur={() => socialHover = 'socialHover'}
  ></div></a>
  
  <a href="https://twitter.com/swimmingpigluvr" target="_blank" rel="noopener noreferrer">
    <div class="twit bg-sky-300 w-5 h-5"
  on:mouseover={() => {
    socialHover = 'twitter'
    if (hoverCount < hoverPositions.length - 1) hoverCount++;
  }}

  on:mouseout={() => socialHover = socialHover}
  on:focus={() => socialHover = 'twitter'}
  on:blur={() => socialHover = socialHover}
  ></div></a>

  

  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
    
<div class="yt bg-red-300 w-10 h-5"
  on:mouseover={() => {
    socialHover = 'youtube'
    if (hoverCount < hoverPositions.length - 1) hoverCount++;
  }}

  on:mouseout={() => socialHover = socialHover}
  on:focus={() => socialHover = 'youtube'}
  on:blur={() => socialHover = socialHover}
  ></div></a>
<div class="flex-1 text-right text-5xl font-extrabold font-input tracking-tighter hover:text-sky-300">{socialHover}</div> 
</container> -->
<!-- end links -->


<slot />
