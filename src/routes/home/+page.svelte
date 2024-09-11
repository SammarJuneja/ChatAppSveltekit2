<script>
  import { onMount } from "svelte";
  import Header from "../../lib/components/+Header.svelte";

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

  let loggedUser;
  let chats = { participants: [] };
  let user;
  const apiUrl = "http://localhost:4000/api/v1";
  // const logo = "https://media.discordapp.net/attachments/916361716965707836/1277165337825251338/OpenChat.png?ex=66cc2c69&is=66cadae9&hm=7e62f9d41dbfb54c7857ee8826c900759630569fb5953adca4762a9480b90712&";

  async function getUser(id) {
    const response = await fetch(`${apiUrl}/user/get/${id}`);
    const data = await response.json();
    return data;
  }

  async function getUserChats(id) {
    const response = await fetch(`${apiUrl}/chat/get/${id}`);
    const data = await response.json();
    return data;
  }

  onMount(async() => {
    if (typeof window !== "undefined") {
      try {
          loggedUser = await getUser("66d4401f7c39811a0e3ad0c5");
          chats = await getUserChats("66d4401f7c39811a0e3ad0c5");
          console.log(chats)
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
        {/if}
    </div>
  </div>