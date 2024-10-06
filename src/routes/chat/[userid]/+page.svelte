<script>
    import { onMount } from "svelte";
    import Icon from "../../../ui/Icon.svelte";
    import { io } from "../../../lib/sockets/socketClient.js";
    import OpenChat from "../../../ui/OpenChat.png"

    export let data;
    let message = "";
    let messages = [];

    // Password: avbcsywS@34
    // Email: mi2@gmail.com

    function send() {
        if (!message.trim()) return;
        const newMessage = {
            chatId: data.chatId.chat[0]._id,
            message: message.trim(),
            sender: data.author.userGet._id,
        };
        console.log(newMessage)
        io.emit("message", newMessage);
        messages = [...messages, newMessage];
        message = "";
    }

    onMount(async() => {
        console.log(data.chatId.chat)
        io.emit("joinChat", { chatId: data.chatId.chat[0]._id, username: data.author.userGet.username });
        io.on("fetchMessage", (msg) => {
            messages = msg;
            console.log(messages)
        });
    });
</script>

<div class="bg-app-bg min-h-screen">
    <div>
        <!-- header -->
        <header class="bg-black gap-2 flex items-center text-white text-lg p-3">
            <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
            <h2>{data.user.userGet.username || "Unknown user"}</h2>
        </header>

        <!-- main chat -->

        
                <!-- {#if data.messages && data.messages.messages.length > 0}
                    {#each data.messages.messages as chat}
                    <div  class={chat.sender._id === data.author.userGet._id ? "grid w-full justify-end text-right break-all pr-5" : "grid w-full justify-start text-left break-all pl-5"}>
                        <span>
                            <div class="my-2 ounded-md">
                                <button class="bg-signup-button px-2 py-1 w-full max-w-52 rounded-lg break-all text-white">{chat.message}</button>
                            </div>
                        </span>
                    </div>
                    {/each}
                {:else}
                    <p class="text-center text-white m-10">No messages to display.</p>
                {/if} -->
                <!-- class="w-auto max-w-40 px-2 m-5 text-white p-1 rounded-lg break-all" -->
                <!-- class={chat.sender._id === data.author.userGet._id ? "text-right" : "text-left"} -->
        
                <!-- {#if data.messages && data.messages.messages.length > 0} -->
                <main class="flex-1 overflow-y-auto">
                {#each messages as chat}
                <div class={chat.sender === data.author.userGet._id ? "grid w-full justify-end text-right break-all pr-5" : "grid w-full justify-start text-left break-all pl-5"}>
                    <span>
                        <div class="my-2 ounded-md">
                            <button class="bg-signup-button px-2 py-1 w-full max-w-52 rounded-lg break-all text-white">{chat.message}</button>
                        </div>
                    </span>
                </div>
                {/each}
                </main>

        <!--  bottom bar -->
        <nav class="bottom-0 fixed border-t w-full bg-app-bg">
            <div class="flex gap-2 m-3 w-full">
                <input bind:value={message} class="rounded-full w-full text-white pl-3 outline-none bg-login-button" type="text" placeholder="Type your message here...">
                <button class="p-1.5 bg-signup-button rounded-full">
                    <Icon icon="attachment" size="20px" color="white"/>
                </button>
                <button on:click={send} class="p-1.5 mr-5 bg-signup-button rounded-full">
                    <Icon icon="send" size="20px" color="white"/>
                </button>
            </div>
            <div class="gap-2 flex items-center p-2.5 w-full bg-gray-950">
                <button class="p-1 bg-signup-button rounded-full">
                    <Icon icon="search" size="20px" color="white"/>
                </button>
                <button class="p-1 bg-signup-button rounded-full">
                    <Icon icon="notification" size="20px" color="white"/>
                </button>
                <div class="bg-login-button flex gap-2 overflow-x-auto p-1 w-full rounded-t-md">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={OpenChat} class="rounded-full border" width="35px" alt="Open Chat">
                </div>
                <button class="p-1 bg-signup-button rounded-full">
                    <Icon icon="setting" size="20px" color="white"/>
                </button>
            </div>
        </nav>
    </div>
</div>