<script>
    import { onDestroy, onMount } from "svelte";
    import Icon from "../../../ui/Icon.svelte";
    import { io } from "../../../lib/sockets/socketClient.js";
    import OpenChat from "../../../ui/OpenChat.png"

    export let data;
    let message = "";
    let messages = [];
    let typingUser = null;
    let typingTimeout;
    let username =  data.author.userGet.username;

    // Email: a1@gamil.com
    // Password: meowmeow1

    function send() {
        if (!message.trim()) return;
        const newMessage = {
            chatId: data.chatId.chat[0]._id,
            message: message.trim(),
            sender: data.author.userGet._id,
        };
        io.emit("message", newMessage);
        messages = [...messages, newMessage];
        message = "";
        clearTypingNotification();
    }

    function clearTypingNotification() {
        typingUser = null;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    }

    function handleInput() {
        const newData = {
            chatId: data.chatId.chat[0]._id,
            username: username
        }
        io.emit("typing", newData);
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(clearTypingNotification, 2000);
    }

    onMount(async() => {
        io.emit("joinChat", { chatId: data.chatId.chat[0]._id, username: data.author.userGet.username });
        io.on("fetchMessage", (msg) => {
            messages = msg;
        });
        io.on("typing", (data) => {
            const { username } = data;
            typingUser = username;
        });
        io.on("newMessage", (msg) => {
            messages = [...messages, msg];
        });
    });

    onDestroy(() => {
        io.off("fetchMessage");
        io.off("newMessage");
        io.off("typing");
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
        {#if typingUser}
            <div class="text-gray-500 italic">{typingUser} is typing...</div>
        {/if}

        <!--  bottom bar -->
        <nav class="bottom-0 overflow-auto border-t w-full bg-app-bg">
            <div class="flex gap-2 m-3 w-full">
                <input bind:value={message} on:input={handleInput} class="rounded-full w-full text-white pl-3 outline-none bg-login-button" type="text" placeholder="Type your message here...">
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
