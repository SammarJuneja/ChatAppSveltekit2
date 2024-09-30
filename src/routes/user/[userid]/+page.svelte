<script>
    export let data;
</script>

<div class="bg-app-bg min-h-screen">
    <div class="grid justify-center p-10 h-full">
        <img width="150px" class="rounded-full" src={data.user.userGet.avatar} alt="Profile">
        <h2 class="text-center text-white text-xl mt-2">{data.user.userGet.username}</h2>
    </div>
    <div class="text-white bg-black mx-5 rounded-md">
        <p class="p-2 border-b border-neutral-700">{data.user.userGet.status || "No Status"}</p>
        <p class="p-2 border-b border-neutral-700">{data.user.userGet.bio || "No Bio"}</p>
    </div>
    <div class="border-neutral-800 grid justify-center mt-5 text-center text-white">
        <h2>Friend list</h2>
        <p>No Friends</p>
    </div>
</div>