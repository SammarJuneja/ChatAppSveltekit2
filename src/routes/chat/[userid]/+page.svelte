<script context="module">
    export async function load({ params }) {
        // const { userid } = params;
        const us = params.userid

        console.log('Params:', params); // This will help you see what is being passed
        if (!userid) {
            console.error('userid is undefined');
        }
        
        return { us };
    }
</script>

<script>
    import { onMount } from "svelte";

    import Icon from "../../../ui/Icon.svelte";
    const logo = "https://media.discordapp.net/attachments/916361716965707836/1277165337825251338/OpenChat.png?ex=66cc2c69&is=66cadae9&hm=7e62f9d41dbfb54c7857ee8826c900759630569fb5953adca4762a9480b90712&";
    let user;
    export let us;
    console.log(us, "hhhhsuuauua")
    let message = "";
    let firstUser  = "";
    let secondUser = "";
    const apiUrl = "http://localhost:4000/api";
    let token;

    async function getUser(id) {
        const response = await fetch(`${apiUrl}/user/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            return {
                status: response.status,
                error: new Error("User not found"),
            };
        }
        return data.userGet;
        // console.log(data)
        // let smt = data.userGet;
    }

    onMount(async() => {
        if (window !== "undefined") {
            alert(userid)
            token = localStorage.getItem("token");
            user = await getUser(userid);
            console.log(user, "h");
        }
    })
</script>

<div class="bg-app-bg min-h-screen">
    <div>
        <!-- header -->
        <header class="bg-black gap-2 flex items-center text-white text-lg p-3">
            <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
            <h2>{user || "Unknown user"}</h2>
        </header>

        <!-- main chat -->
        <div class="grid justify-start">
            <div class="w-auto max-w-40 px-2 m-5 bg-signup-button text-white p-1 rounded-lg break-all">
                <h2>Hello</h2>
            </div>
        </div>
        <div class="grid justify-end">
            <div class="w-auto max-w-40 px-2 mx-5 bg-login-button text-white p-1 rounded-lg break-all">
                <h2>Hey</h2>
            </div>
        </div>
        
        <!--  bottom bar -->
        <nav class="fixed bottom-0 border-t w-full">
            <div class="flex gap-2 m-3 w-full">
                <input bind:value={message} class="rounded-full w-full text-white pl-3 outline-none bg-login-button" type="text" placeholder="Type your message here...">
                <button class="p-1.5 bg-signup-button rounded-full">
                    <Icon icon="attachment" size="20px" color="white"/>
                </button>
                <button class="p-1.5 mr-5 bg-signup-button rounded-full">
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
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                    <img src={logo} class="rounded-full border" width="35px" alt="Open Chat">
                </div>
                <button class="p-1 bg-signup-button rounded-full">
                    <Icon icon="setting" size="20px" color="white"/>
                </button>
            </div>
        </nav>
    </div>
</div>