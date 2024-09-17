<script lang="ts">
  import Icon from "../../ui/Icon.svelte";

  const logo = "https://cdn.discordapp.com/attachments/860434275832954880/1285657186869051514/OpenChat.png?ex=66eb110f&is=66e9bf8f&hm=c8050788c092b12f915385b629cdd13ee1a9f80cb3d3fa38b07bb6190b02bb36&"
</script>

<header class="p-3 bg-black w-full">
    <div class="flex items-center">
        <img src={logo} width="45px" alt="Open Chat">
        <h2 class="text-white text-xl">OpenChat</h2>
        <div class="flex justify-end w-full gap-3 mr-3">
            <span class="bg-app-bg p-1.5 rounded-full">
                <Icon icon="search" size="22px"/>
            </span>
            <span class="bg-app-bg p-1.5 rounded-full">
                <Icon icon="notification" size="22px"/>
            </span>
        </div>
    </div>
</header>