<script>
    import { gsap } from 'gsap';
  import { cubicInOut, cubicOut, cubicIn } from 'svelte/easing';
  import { fade, fly, slide } from 'svelte/transition';

    let nameHover = '';

    // handle mouse move
    let x = 0;
    let y = 0;

    const obj = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
        gsap.to(obj, {
            duration: 1, // animation duration in seconds
            x: event.pageX,
            y: event.pageY,
            onUpdate: () => {
                x = obj.x;
                y = obj.y;
            },
            ease: "power1.out" // easing function for a more organic feel
        });
    };
</script>

<svelte:window on:mousemove={handleMouseMove} />


<div class="h-screen bg-black flex flex-col justify-center">
    <div class="w-full flex flex-col border-white border-2 font-extrabold my-[18%] text-[3rem] text-white  -tracking-widest">

        <!-- iman -->
        <div 
            on:mouseenter={() => nameHover = 'Iman'}
            on:mouseleave={() => nameHover = ''}
            id="iman"
            class="relative hover:text-black hover:bg-white p-8 transform transition-all duration-1000 ease-in-out">
            iman
            {#if nameHover === 'Iman'}
            <div class="flex flex-col">
                <img 
                    in:fade={{ y: 100, duration: 1500, easing: cubicInOut}}
                    out:slide={{duration: 1000, easing: cubicIn}}
                    src="/pfps/pixeladyAK.png" alt="pixeladyAK" 
                    class="h-[27rem] w-auto absolute yayo-border-blue border-[1rem]"
                    style="top: {-3*y/8}px; right: {x-100}px">
            </div>
            {/if}
        </div>
        <!-- dylan -->
        <div 
            on:mouseenter={() => nameHover = 'Dylan'}
            on:mouseleave={() => nameHover = ''}
            id="dylan"
            class="relative hover:text-black hover:bg-white p-8 transform transition-all duration-1000 ease-in-out">
            dylan
            {#if nameHover === 'Dylan'}
            <div class="flex flex-col">
                <img 
                    in:fly={{ x: -100, duration: 1000, easing: cubicInOut}}
                    out:slide={{duration: 1000, easing: cubicIn}}
                    src="/pfps/remilioCig.png" alt="remilioCig" 
                    class="h-[27rem] w-auto absolute yayo-border-blue border-[1rem]"
                    style="top: {-3*y/8}px; right: {x}px">
            </div>
            {/if}
        </div>
        <!-- tony -->
        <div 
            on:mouseenter={() => nameHover = 'Tony'}
            on:mouseleave={() => nameHover = ''}
            id="tony"
            class="relative hover:text-black hover:bg-white p-8 transform transition-all duration-1000 ease-in-out">
            tony
            {#if nameHover === 'Tony'}
            <div class="flex flex-col">
                <img 
                    in:fly={{ x: 100, duration: 1000, easing: cubicInOut}}
                    out:slide={{duration: 1000, easing: cubicIn}}
                    src="/pfps/kawamii.jpeg" alt="kawamii" 
                    class="h-[27rem] w-auto absolute yayo-border-blue border-[1rem]"
                    style="top: {-3*y/8}px; right: {x}px">
            </div>
            {/if}
        </div>
        <!-- gerald -->
        <div 
            on:mouseenter={() => nameHover = 'Gerald'}
            on:mouseleave={() => nameHover = ''}
            id="gerald"
            class="relative hover:text-black hover:bg-white p-8 transform transition-all duration-1000 ease-in-out">
            gerald
            {#if nameHover === 'Gerald'}
            <div class="flex flex-col">
                <img 
                    in:fly={{ y: -100, duration: 1000, easing: cubicInOut}}
                    out:slide={{duration: 1000, easing: cubicIn}}
                    src="/pfps/milady.png" alt="milady" 
                    class="h-[27rem] w-auto absolute yayo-border-blue border-[1rem]"
                    style="top: {-3*y/8}px; right: {x}px">
            </div>
            {/if}
        </div>
    </div>
</div>