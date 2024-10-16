<script>
    import { updateUserStatus, updateUserBio } from "../.../../../../lib/functions.js";
  import NavBar from "../../../lib/components/+NavBar.svelte";
    export let data;
    let bio = data.user.userGet.bio || "";
    let status = data.user.userGet.status || "";
</script>

<div class="bg-app-bg min-h-screen">
    <div class="grid justify-center p-10 h-full">
        <img width="150px" class="rounded-full" src={data.user.userGet.avatar} alt="Profile">
        <h2 class="text-center text-white text-xl mt-2">{data.user.userGet.username}</h2>
    </div>

    <div class="text-white grid bg-black mx-5 rounded-md">
        <input bind:value={status} class="p-2 border-b bg-black outline-none border-neutral-700"  placeholder="Status here" />
        <input bind:value={bio} class="p-2 border-b bg-black outline-none border-neutral-700" placeholder="Bio here" />
    </div>

    <span class="mt-5 text-white flex justify-center">
        <button on:click={async() => {
            try {
                let x = await updateUserBio(bio, data.token);
                let y = await updateUserStatus(status, data.token);
                console.log("success", y, x, bio, status)
            } catch (error) {
                console.log(error)
            }
        }} class="bg-signup-button py-1 px-3 rounded-md">Save</button>
    </span>

    <div class="border-neutral-800 grid justify-center mt-5 text-center text-white">
        <h2>Friend list</h2>
        <p>No Friends</p>
    </div>
    <div class="fixed bottom-0 w-full">
        <NavBar userId={data.user.userGet._id}/>
    </div>
</div>