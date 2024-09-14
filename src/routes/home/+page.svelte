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

  let chats = { participants: [] };
  let token;
  const apiUrl = "http://localhost:4000/api";


  onMount(async() => {
    if (typeof window !== "undefined") {
      try {
        token = localStorage.getItem("token");
        if (token !== null || token !== undefined) {
          console.log(token)
          const decodedToken = jwtDecode(token);
          console.log(token, decodedToken)
          async function getUserChats(id) {
            const response = await fetch(`${apiUrl}/chat/get/${id}`, {
              method: "GET",
              headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            });
            const data = await response.json();
            return data;
          }
          chats = await getUserChats(decodedToken.userId);
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
      {#if chats.chat && chats.chat.length > 0}
        {#each chats.chat as participant}
          <a href="/chat" class="flex w-full gap-2 border-b border-login-button p-2 py-3">
            <div class="flex items-center">
              <!-- <img src={logo} class="rounded-full" width="45px" alt="Open Chat"> -->
            </div>
            <div class="grid">
              <h2>{participant}</h2>
            </div>
          </a>
        {/each}
      {:else}
        <div class="text-center">
          <h2 class="text-white text-lg mt-2">You don't have any chats</h2>
        </div>
      {/if}
    </div>
  </div>