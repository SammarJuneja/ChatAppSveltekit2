<script lang="ts">
  import Icon from "../../ui/Icon.svelte";
  import OpenChat from "../../ui/OpenChat.png";
</script>

<header class="p-3 bg-black w-full">
    <div class="flex items-center">
        <img class="border rounded-full mr-3" src={OpenChat} width="45px" alt="Open Chat">
        <h2 class="text-white text-xl">OpenChat</h2>
        <div class="flex justify-end w-full gap-3 mr-3">
            <a href="/search" class="bg-app-bg p-1.5 rounded-full">
                <Icon icon="search" size="22px"/>
            </a>
            <span class="bg-app-bg p-1.5 rounded-full">
                <Icon icon="notification" size="22px"/>
            </span>
        </div>
    </div>
</header>