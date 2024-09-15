<script>
    import { onMount } from "svelte";
    import { io } from "socket.io-client";
    import { jwtDecode } from "jwt-decode";
    // import { io } from "../lib/sockets/socketClient";
    
    const socket = io("http://localhost:4000");
    const apiUrl = "http://localhost:4000/api";
    let token;
    let username = `User ${Math.floor(Math.random() * 100)}`;

    async function getUser(id) {
        const response = await fetch(`${apiUrl}/user/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    }
// Hello890@
    onMount(async() => {
        if (typeof window !== "undefined") {
            try {
                token = localStorage.getItem("token");
                if (token !== null && token !== "undefined") {
                    // const decodedToken = jwtDecode(token);
                    // const user = await getUser(decodedToken.userId);
                    // let ok = user.userGet.username;
                    // console.log(socket.connected)
                    socket.on("join", () => {
                        console.log(`${username} just opened the app`);
                        socket.emit("join", "hello");
                    });
                    // console.log(user.userGet.username, user, decodedToken);
                    // console.log(2)
                }
            } catch (error) {
                console.log(error)
            }
        }
    });
</script>

<div class="bg-app-bg min-h-screen grid justify-center items-center">
    <h1 class="text-white text-2xl">Welcome to the Open Chat</h1>
    <div class="mb-40 p-7 rounded-2xl bg-log-tab text-white text-lg mx-auto">
        <a href="/signup" class="bg-signup-button my-2 py-1 flex items-center justify-center w-40 rounded-2xl">
            <h3>Signup</h3>
        </a>
        <a href="/login" class="bg-login-button my-2 py-1 flex items-center justify-center w-40 rounded-2xl">
            <h3>Login</h3>
        </a>
        <a href="/home" class="bg-blue-900 my-2 py-1 flex items-center justify-center w-40 rounded-2xl">
            <h3>Bypass Login</h3>
        </a>
    </div>
</div>