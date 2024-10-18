<script>
  import { goto } from "$app/navigation";
  import Icon from "../../ui/Icon.svelte";
  
  let email = "";
  let password = "";
  let loginButton;
  let pass;
  let errorMessage = "";
  let passIcon = "eye close";
  const apiUrl = "http://localhost:4000/api";

  function showPass() {
    let isPass = document.getElementById("password");
    if (isPass.type === "password") {
      passIcon = "eye open";
      isPass.type = "text";
    } else if (isPass.type === "text") {
      passIcon = "eye close";
      isPass.type = "password";
    }
  }

  async function login() {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        errorMessage = "There was an error while logging in";
        console.log(errorData)
        throw new Error(errorData.message || "There was an error while logging in");
      } else {
        const data = await response.json();
        goto("/home");
        localStorage.setItem("token", data.refreshToken);
        return data;
      }
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  }
</script>

<div class="bg-app-bg min-h-screen grid items-center justify-center">
  <div>
    <div class="bg-log-tab grid items-center justify-center p-10 rounded-lg w-60">
      <input on:keypress={(event) => { if (event.key === "Enter") { pass.focus(); } }} bind:value={email} class="bg-login-button rounded-lg text-white outline-none p-3 hover:border-2 hover:border-slate-400 hover:transition-all" placeholder="Email" type="text" required />
      <span class="bg-login-button flex rounded-lg p-3 hover:border-2 hover:border-slate-400 hover:transition-all mt-5">
        <input on:keypress={(event) => { if (event.key === "Enter") { loginButton.click(); } }} bind:this={pass} bind:value={password} class="text-white outline-none bg-login-button" placeholder="Password" id="password" type="password" required />
        <button on:click={showPass}>
          <Icon icon={passIcon} size="20px" />
        </button>
      </span>
    </div>
    <div class="grid mt-10 justify-center">
      <button bind:this={loginButton} on:click={login} class="p-2 w-40 bg-login-button text-white rounded-lg hover:bg-signup-button">
        Login
      </button>
      <button class="text-sm text-white hover:text-blue-200">
        Forgot password?
      </button>
    </div>
  </div>
</div>
