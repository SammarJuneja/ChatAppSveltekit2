<script>
  import { goto } from "$app/navigation";
  import { jwtDecode } from "jwt-decode";
  const apiUrl = "http://localhost:3000/api/v1";
  let email = "";
  let password = "";
  let errorMessage = "";
  let token = "token";

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
        throw new Error(errorData.message || "There was an error while logging in");
      }
    
      const data = await response.json();
      goto("/home");
      const decodedToken = jwtDecode(data.refreshToken);
      localStorage.setItem("user", decodedToken.username);
      return data;
    } catch (error) {
      console.error("Login error:", error.message);
      return { error: error.message };
    }
}
</script>

<div class="bg-app-bg min-h-screen grid items-center justify-center">
  <div>
    <div class="bg-log-tab grid items-center justify-center p-10 rounded-lg w-60">
      <input bind:value={email} class="bg-login-button rounded-lg text-white outline-none p-3 hover:border-2 hover:border-slate-400 hover:transition-all" placeholder="Email" type="text" required />
      <input bind:value={password} class="bg-login-button rounded-lg text-white outline-none p-3 hover:border-2 hover:border-slate-400 hover:transition-all mt-5" placeholder="Password" type="password" required />
    </div>
    <div class="grid mt-10 justify-center">
      <button on:click={login} class="p-2 w-40 bg-login-button text-white rounded-lg hover:bg-signup-button">
        Login
      </button>
      <button class="text-sm text-white hover:text-blue-200">
        Forgot password?
      </button>
    </div>
  </div>
</div>
