<script>
  import Icon from "../../ui/Icon.svelte";
  export let userId;
</script>

<nav class="bg-black p-2 flex justify-center">
    <a href="/home" class="mx-auto bg-app-bg p-1.5 rounded-full">
        <Icon icon="chats" size="25px" />
    </a>
    <a href={`/user/${userId}`} class="mx-auto bg-app-bg p-1.5 rounded-full">
        <Icon icon="profile" size="25px" />
    </a>
</nav>