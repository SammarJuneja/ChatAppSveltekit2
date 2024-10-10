<script>
  import Icon from "../../ui/Icon.svelte";
  import { search } from "../../lib/functions.js";
  import { onMount } from "svelte";
  import OpenChat from "../../ui/OpenChat.png"

    let searchQuery = "";
    let result = { "message": [] }
    let token;

    async function searchUser() {
        result = await search(searchQuery, token);
        console.log(result.message)
        searchQuery = "";
    }

    onMount(() => {
        token = localStorage.getItem("token");
    });
</script>

<div class="bg-app-bg min-h-screen">
    <div class="bg-black p-5 gap-2 flex items-center justify-center">
        <input bind:value={searchQuery} type="text" placeholder="Search here" class="rounded-md outline-none p-1 text-white bg-app-bg">
        <button on:click={searchUser} class="bg-app-bg p-1.5 rounded-full">
            <Icon icon="search" size="22px"/>
        </button>
    </div>
    <div>
    {#each result.message as user}
        <div class="border-y pl-3 flex items-center gap-2 text-white border-neutral-800 p-2">
            <img src={OpenChat} class="rounded-full" width="45px" alt="Open Chat">
            <h2>{user.username}</h2>
        </div>
    {/each}
    </div>
</div>