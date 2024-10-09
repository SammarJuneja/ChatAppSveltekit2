<script>
  import { writable } from "svelte/store";

//   import { oldSearch } from "../../stores/store.js";
  import Icon from "../../ui/Icon.svelte";
//   export let form;


function oldSearchResults() {
    const { subscribe, update } = writable([]);

    return {
        subscribe,
        add: (item) => {
            update((array) => {
                const newArray = [item, ...array];
                return newArray.length > 10 ? newArray.slice(-10) : newArray;
            });
        },
    };
}

export const oldSearch = oldSearchResults();

    let searchQuery = '';

    function search() {
        oldSearch.add(searchQuery);
        searchQuery = "";
    }
</script>

<div class="bg-app-bg min-h-screen">
    <div class="bg-black p-5 gap-2 flex items-center justify-center">
        <input bind:value={searchQuery} type="text" placeholder="Search here" class="rounded-md outline-none p-1 text-white bg-app-bg">
        <button on:click={search} class="bg-app-bg p-1.5 rounded-full">
            <Icon icon="search" size="22px"/>
        </button>
    </div>
    <div>
    {#each $oldSearch as item}
        <div class="border-y pl-3 text-white border-neutral-800 p-2">
            <h2>{item}</h2>
        </div>
    {/each}
    </div>
</div>