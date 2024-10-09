<script>
  import { onMount } from "svelte";
  import Header from "../../lib/components/+Header.svelte";
  import { jwtDecode } from "jwt-decode";
  import { getChat, getUser, getUserChats } from "../../lib/functions.js";
  import NavBar from "../../lib/components/+NavBar.svelte";
  import OpenChat from "../../ui/OpenChat.png"

  let chats = { "chat": [] } ;
  let meow = { "chat": [] };
  let token;
  let user;
  let usernames = {};
  let lastMessage = {};

  onMount(async() => {
    try {
      token = localStorage.getItem("token");
      if (token !== null) {
        const decodedToken = jwtDecode(token);
        user = decodedToken.userId;
        console.log(user)
        chats = await getUserChats(decodedToken.userId, token);
        
        for (const userId of chats.chat) {
            meow = await getChat(userId, token);
            lastMessage[userId] = [];
          try {
            const user = await getUser(userId, token);
            usernames[userId] = user.userGet.username;
          } catch (error) {
            console.error(`Failed to fetch username for ID ${userId}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
</script>

<div class="min-h-screen bg-app-bg">
    <Header />
    <div>
      <!-- {#if !token}
        <div class="text-center">
          <h2 class="text-white text-lg mt-2">Unknown user</h2>
        </div>
      {:else} -->
      {#if chats}
        {#each chats.chat as participant}
          <a href={`/chat/${participant}`} class="flex w-full gap-2 border-b border-login-button p-2 py-3">
            <div class="flex items-center">
              <img src={OpenChat} class="rounded-full" width="45px" alt="Open Chat">
            </div>
            <div class="grid items-center">
              <p class="text-white">{usernames[participant] || "Loading..."}</p>
              {#if lastMessage[participant]}
                <p class="text-gray-500 text-sm">{lastMessage[participant]}</p>
              {/if}
            </div>
          </a>
        {/each}
      {:else}
        <div class="text-center">
          <h2 class="text-white text-lg mt-2">You don't have any chats</h2>
        </div>
      {/if}
      <!-- {/if} -->
    </div>
    <div class="h-96 grid w-full fixed bottom-0 items-end">
      <NavBar userId={user} />
    </div>
  </div>