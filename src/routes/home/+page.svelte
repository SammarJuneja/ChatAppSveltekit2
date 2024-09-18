<script>
  import { onMount } from "svelte";
  import Header from "../../lib/components/+Header.svelte";
  import { jwtDecode } from "jwt-decode";

const dummy = {
  "userGet": {
    "_id": "66d8532af0d715ac997c3ad6",
    "participants": [
      "66d4401f7c39811a0e3ad0c5",
      "66d43f9209d72b954fe1221b"
    ],
    "lastMessageDate": "2024-09-04T12:31:38.600Z",
    "__v": 0
  }
}

// {
//   "newChat": {
//     "participants": [
//       "66d43f9209d72b954fe1221b",
//       "66e6ca6b97d7ece37665ea41"
//     ],
//     "_id": "66e6d3aa97d7ece37665ea67",
//     "lastMessageDate": "2024-09-15T12:31:38.234Z",
//     "__v": 0
//   }
// }

  let chats = { "chat": [] } ;
  let token;
  const logo = "https://cdn.discordapp.com/attachments/860434275832954880/1285657186869051514/OpenChat.png?ex=66eb110f&is=66e9bf8f&hm=c8050788c092b12f915385b629cdd13ee1a9f80cb3d3fa38b07bb6190b02bb36&"
  const apiUrl = "http://localhost:4000/api";
  let usernames = {};

  async function getUserChats(id) {
    const response = await fetch(`${apiUrl}/chat/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  async function getUser(id) {
        const response = await fetch(`${apiUrl}/user/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data.userGet.username;
  }
  // avbcsywS@34


  onMount(async() => {
    if (typeof window !== "undefined") {
      try {
        token = localStorage.getItem("token");
        if (token !== null && token !== "undefined") {
          const decodedToken = jwtDecode(token);
          chats = await getUserChats(decodedToken.userId);
          console.log(chats.chat, decodedToken.userId);

          for (const id of chats.chat) {
            try {
              const username = await getUser(id);
              usernames[id] = username;
            } catch (error) {
              console.error(`Failed to fetch username for ID ${id}:`, error);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
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
              <img src={logo} class="rounded-full" width="45px" alt="Open Chat">
            </div>
            <div class="grid items-center">
              <p class="text-white">{usernames[participant] || "Loading..."}</p>
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
  </div>